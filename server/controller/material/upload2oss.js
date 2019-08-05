const qs = require("querystring");

const {
  requestWechatSubscriptImage2AliOss
} = require("../../../bin/ali-oss/index");

const { MaterialImageModel } = require("../../../bin/db/Models/Material");

const {
  WechatMaterialImageModel,
  WechatMaterialNewsModel,
  WechatMaterialVideoModel,
  WechatMateriaVoiceModel
} = require("../../../bin/db/Models/wechatMaterial");

async function requestImageSrc2AliOss(url) {
  const wx_fmt_parsed = url.match(/(wx_fmt)=(jpeg|png)/);
  const wx_fmt = wx_fmt_parsed[2];
  return await requestWechatSubscriptImage2AliOss(
    wechatMaterialImage.url,
    `wechat_marterial_image/${materialImageResult._id}.${wx_fmt}`
  );
}

async function routeUpdateMaterialImage2Oss(ctx, next) {
  const WechatMaterialImageList = await WechatMaterialImageModel.find();
  if (!WechatMaterialImageList || WechatMaterialImageList.length === 0) {
    return {
      message: "[warning]获取微信图片素材的列表失败."
    };
  }
  let list_count = WechatMaterialImageList.length,
    update_count = 0,
    create_count = 0;
  for (let idx = 0; idx < list_count; idx++) {
    const wechatMaterialImage = WechatMaterialImageList[idx];
    const materialImageResult = await MaterialImageModel.findOne({
      media_id: wechatMaterialImage.media_id
    });
    // OSS中存在meida_id的素材数据
    if (materialImageResult) {
      console.log(
        "[warning]OSS中存在media_id:" +
          wechatMaterialImage.media_id +
          "的素材数据"
      );
      if (materialImageResult.update_time < wechatMaterialImage.update_time) {
        const wechatMaterialImageUrl = wechatMaterialImage.url;
        const aliOssReuslt = requestImageSrc2AliOss(wechatMaterialImageUrl);
        if (!aliOssReuslt || !aliOssReuslt.name || !aliOssReuslt.url) {
          return (ctx.body = {
            message: "[warning]图片素材上传OSS失败."
          });
        }
        materialImageResult.update_time = wechatMaterialImage.update_time;
        materialImageResult.oss_update_time = parseInt(
          Number(new Date()) / 1000
        );
        materialImageResult.oss_url = aliOssReuslt.url;
        const updatedResult = await materialImageResult.save();
        if (updatedResult) update_count++;
      }
      console.log("[success]OSS中media_id素材已为最新");
      // OSS中不存在meida_id的素材数据
    } else {
      const materialImage = await MaterialImageModel.create({
        media_id: wechatMaterialImage.media_id,
        name: wechatMaterialImage.name,
        update_time: wechatMaterialImage.update_time,
        url: wechatMaterialImage.url,
        oss_update_time: 0,
        oss_url: ""
      });
      const wechatMaterialImageUrl = wechatMaterialImage.url;
      const aliOssReuslt = requestImageSrc2AliOss(wechatMaterialImageUrl);
      if (!aliOssReuslt || !aliOssReuslt.name || !aliOssReuslt.url) {
        return (ctx.body = {
          message: "[warning]图片素材上传OSS失败."
        });
      }
      materialImage.oss_update_time = parseInt(Number(new Date()) / 1000);
      materialImage.oss_url = aliOssReuslt.url;
      const createResult = await materialImage.save();
      if (createResult) create_count++;
    }
    let message =
      "[success]微信图片素材总数:" +
      list_count +
      ",OSS新增素材总数:" +
      create_count +
      ",OSS更新素材总数:" +
      update_count +
      ".";
    console.log(message);
    ctx.body = {
      message,
      list_count,
      create_count,
      update_count
    };
  }
}

async function routeUpdateMaterialVideo2Oss(ctx, next) {}

module.exports = {
  routeUpdateMaterialImage2Oss,
  routeUpdateMaterialVideo2Oss
};
