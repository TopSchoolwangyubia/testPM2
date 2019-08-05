const {
  getMaterialCount,
  getMaterialList,
  getMaterialTemporary,
  getMaterialPermanent
} = require("../../../api/wechat");

const {
  WechatMaterialImageModel,
  WechatMaterialCountModel,
  WechatMaterialNewsModel,
  WechatMaterialVideoModel,
  WechatMateriaVoiceModel
} = require("../../../bin/db/Models/wechatMaterial");

async function routeUpdateMaterialCount(ctx, next) {
  const access_token = ctx.wechatAccessToken;
  const token = access_token.token;
  await access_token.isExpired();
  const meterialCountResult = await getMaterialCount({
    access_token: token
  });

  if (meterialCountResult.status !== 200) {
    console.log("[warning]微信素材总数同步到数据库失败.");
    ctx.body = {
      message: "[warning]获取微信素材总数失败."
    };
  }

  const meterialCount = meterialCountResult.data;
  const meterialCountModel = await WechatMaterialCountModel.create(
    meterialCount
  );
  const modelSavedResult = await meterialCountModel.save();

  if (modelSavedResult.errors) {
    console.log("[warning]微信素材总数同步到数据库失败.");
    return (ctx.body = {
      message: "[warning]微信素材总数同步到数据库失败."
    });
  }
  console.log("[success]获得最新的微信素材总数.");
  ctx.body = {
    message: "[success]获得最新的微信素材总数.",
    data: modelSavedResult
  };
}

async function routeUpdateImageMaterial(ctx, next) {
  const access_token = ctx.wechatAccessToken;
  const token = access_token.token;
  await access_token.isExpired();
  const materialCount = await WechatMaterialCountModel.find({});
  const materialCountLatest = materialCount[materialCount.length-1];
  const imageCount = materialCountLatest["image_count"];
  if (imageCount === 0) {
    return (ctx.body = {
      message: "[warning]暂无图片素材，请先更新素材总数."
    });
  }
  const imageListResult = await getMaterialList({
    access_token: token,
    type: "image",
    offset: 0,
    count: imageCount
  });
  if (imageListResult.status !== 200) {
    return (ctx.body = {
      message: "[warning]未获取到图片素材列表."
    });
  }
  const image_list_item_count = imageListResult.data.item_count;
  if (image_list_item_count === 0) {
    return (ctx.body = {
      message: "[warning]获取到图片素材列表为空."
    });
  }
  const image_list_items = imageListResult.data.item;
  let updatedNumber = 0,
    savedNumber = 0;
  for (let idx = 0; idx < image_list_item_count; idx++) {
    const image_list_item = image_list_items[idx];
    const itemDocInDB = await WechatMaterialImageModel.findOne({
      media_id: image_list_item.media_id
    });
    if (itemDocInDB) {
      if (itemDocInDB.update_time === image_list_item.update_time) {
        continue;
      } else {
        const updateResult = await WechatMaterialImageModel.updateOne(
          { _id: itemDocInDB._id },
          image_list_item
        );
        if (updateResult) updatedNumber++;
        continue;
      }
    }
    const itemMaterialImageModel = await WechatMaterialImageModel.create(
      image_list_item
    );
    const saveResult = await itemMaterialImageModel.save();
    if (saveResult) savedNumber++;
  }
  ctx.body = {
    message: `[success]共获取${image_list_item_count}个素材.数据部同步更新${updatedNumber}个,添加${savedNumber}个.${image_list_item_count -
      updatedNumber -
      savedNumber}个数据未发生变更.`,
    data: {
      count: image_list_item_count,
      update: updatedNumber,
      save: savedNumber
    }
  };
}

async function routeUpdateNewsMaterial(ctx, next) {
  const access_token = ctx.wechatAccessToken;
  const token = access_token.token;
  await access_token.isExpired();
  const materialCount = await WechatMaterialCountModel.find({});
  const materialCountLatest = materialCount[materialCount.length - 1];
  const newsCount = materialCountLatest["news_count"];
  if (newsCount === 0) {
    return (ctx.body = {
      message: "[warning]暂无图文素材，请先更新素材总数."
    });
  }
  const newsListResult = await getMaterialList({
    access_token: token,
    type: "news",
    offset: 0,
    count: newsCount
  });

  if (newsListResult.status !== 200) {
    return (ctx.body = {
      message: "[warning]未获取到图文素材列表."
    });
  }
  const news_list_item_count = newsListResult.data.item_count;
  if (news_list_item_count === 0) {
    return (ctx.body = {
      message: "[warning]获取到图文素材列表为空."
    });
  }
  const news_list_items = newsListResult.data.item;
  let updatedNumber = 0,
    savedNumber = 0;
  for (let idx = 0; idx < news_list_item_count; idx++) {
    const news_list__item = news_list_items[idx];
    const itemDocInDB = await WechatMaterialNewsModel.findOne({
      media_id: news_list__item.media_id
    });
    if (itemDocInDB) {
      if (itemDocInDB.update_time === news_list__item.update_time) {
        continue;
      } else {
        const updateResult = await WechatMaterialNewsModel.updateOne(
          { _id: itemDocInDB._id },
          news_list__item
        );
        if (updateResult) updatedNumber++;
        continue;
      }
    }
    const itemMaterialNewsModel = await WechatMaterialNewsModel.create(
      news_list__item
    );
    const saveResult = await itemMaterialNewsModel.save();
    if (saveResult) savedNumber++;
  }
  ctx.body = {
    message: `[success]共获取${news_list_item_count}个素材.数据部同步更新${updatedNumber}个,添加${savedNumber}个.${news_list_item_count -
      updatedNumber -
      savedNumber}个数据未发生变更.`,
    data: {
      count: news_list_item_count,
      update: updatedNumber,
      save: savedNumber
    }
  };
}

async function routeUpdateVideoMaterial(ctx, next) {
  const access_token = ctx.wechatAccessToken;
  const token = access_token.token;
  await access_token.isExpired();
  const materialCount = await WechatMaterialCountModel.find({});
  const materialCountLatest = materialCount[materialCount.length - 1];
  const videoCount = materialCountLatest["video_count"];
  if (videoCount === 0) {
    return (ctx.body = {
      message: "[warning]暂无视频素材，请先更新素材总数."
    });
  }
  const videoListResult = await getMaterialList({
    access_token: token,
    type: "video",
    offset: 0,
    count: videoCount
  });
  if (videoListResult.status !== 200) {
    return (ctx.body = {
      message: "[warning]未获取到视频素材列表."
    });
  }
  const video_list_item_count = videoListResult.data.item_count;
  if (video_list_item_count === 0) {
    return (ctx.body = {
      message: "[warning]获取到视频素材列表为空."
    });
  }
  const video_list_items = videoListResult.data.item;
  let updatedNumber = 0,
    savedNumber = 0;
  for (let idx = 0; idx < video_list_item_count; idx++) {
    const video_list__item = video_list_items[idx];
    const itemDocInDB = await WechatMaterialVideoModel.findOne({
      media_id: video_list__item.media_id
    });
    if (itemDocInDB) {
      if (itemDocInDB.update_time === video_list__item.update_time) {
        continue;
      } else {
        const updateResult = await WechatMaterialVideoModel.updateOne(
          { _id: itemDocInDB._id },
          video_list__item
        );
        if (updateResult) updatedNumber++;
        continue;
      }
    }
    const itemMaterialNewsModel = await WechatMaterialVideoModel.create(
      video_list__item
    );
    const saveResult = await itemMaterialNewsModel.save();
    if (saveResult) savedNumber++;
  }
  ctx.body = {
    message: `[success]共获取${video_list_item_count}个素材.数据部同步更新${updatedNumber}个,添加${savedNumber}个.${video_list_item_count -
      updatedNumber -
      savedNumber}个数据未发生变更.`,
    data: {
      count: video_list_item_count,
      update: updatedNumber,
      save: savedNumber
    }
  };
}

async function routeUpdateVioceMaterial(ctx, next) {
  const access_token = ctx.wechatAccessToken;
  const token = access_token.token;
  const materialCount = await WechatMaterialCountModel.find({});
  const materialCountLatest = materialCount[materialCount.length - 1];
  const VioceCount = materialCountLatest["voice_count"];
  if (VioceCount === 0) {
    return (ctx.body = {
      message: "[warning]暂无音频素材，请先更新素材总数."
    });
  }
  const VioceListResult = await getMaterialList({
    access_token: token,
    type: "voice",
    offset: 0,
    count: VioceCount
  });
  if (VioceListResult.status !== 200) {
    return (ctx.body = {
      message: "[warning]未获取到音频素材列表."
    });
  }
  const vioce_list_item_count = VioceListResult.data.item_count;
  if (vioce_list_item_count === 0) {
    return (ctx.body = {
      message: "[warning]获取到音频素材列表为空."
    });
  }
  const vioce_list_items = VioceListResult.data.item;
  let updatedNumber = 0,
    savedNumber = 0;
  for (let idx = 0; idx < vioce_list_item_count; idx++) {
    const vioce_list__item = vioce_list_items[idx];
    const itemDocInDB = await WechatMateriaVoiceModel.findOne({
      media_id: vioce_list__item.media_id
    });
    if (itemDocInDB) {
      if (itemDocInDB.update_time === vioce_list__item.update_time) {
        continue;
      } else {
        const updateResult = await WechatMateriaVoiceModel.updateOne(
          { _id: itemDocInDB._id },
          vioce_list__item
        );
        if (updateResult) updatedNumber++;
        continue;
      }
    }
    const itemMaterialVioceModel = await WechatMateriaVoiceModel.create(
      vioce_list__item
    );
    const saveResult = await itemMaterialVioceModel.save();
    if (saveResult) savedNumber++;
  }
  ctx.body = {
    message: `[success]共获取${vioce_list_item_count}个素材.数据部同步更新${updatedNumber}个,添加${savedNumber}个.${vioce_list_item_count -
      updatedNumber -
      savedNumber}个数据未发生变更.`,
    data: {
      count: vioce_list_item_count,
      update: updatedNumber,
      save: savedNumber
    }
  };
}

module.exports = {
  routeUpdateMaterialCount,
  routeUpdateImageMaterial,
  routeUpdateNewsMaterial,
  routeUpdateVideoMaterial,
  routeUpdateVioceMaterial
};
