const mongoose = require("../connection");
const {
  WechatToken,
  WechatMaterialCount,
  WechatMaterialImage,
  WechatMaterialNews,
  WechatMaterialVideo,
  WechatMateriaVoice
} = require("../Schemas/wechatMaterial");

const wechatTokenModel = mongoose.model(
  "WechatToken",
  WechatToken,
  "WechatToken",
);

const WechatMaterialCountModel = mongoose.model(
  "WechatMaterialCount",
  WechatMaterialCount,
  "WechatMaterialCount",
);

const WechatMaterialImageModel = mongoose.model(
  "WechatMaterialImageList",
  WechatMaterialImage,
  "WechatMaterialImageList",
);

const WechatMaterialNewsModel = mongoose.model(
  "WechatMaterialNewsList",
  WechatMaterialNews,
  "WechatMaterialNewsList",
)

const WechatMaterialVideoModel = mongoose.model(
  "WechatMaterialVideoList",
  WechatMaterialVideo,
  "WechatMaterialVideoList",
);

const WechatMateriaVoiceModel = mongoose.model(
  "WechatMateriaVoiceList",
  WechatMateriaVoice,
  "WechatMateriaVoiceList",
);


module.exports = {
  wechatTokenModel,
  WechatMaterialCountModel,
  WechatMaterialImageModel,
  WechatMaterialNewsModel,
  WechatMaterialVideoModel,
  WechatMateriaVoiceModel
};
