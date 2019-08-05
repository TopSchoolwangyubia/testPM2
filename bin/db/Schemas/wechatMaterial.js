const { Schema } = require("mongoose");

const WechatToken = new Schema({
  token: String,
  expires_in: Number
});

const WechatMaterialImage = new Schema({
  media_id: String,
  name: String,
  update_time: Number,
  url: String
});

const WechatMaterialCount = new Schema({
  image_count: Number,
  news_count: Number,
  video_count: Number,
  voice_count: Number
});

const WechatMaterialNews = new Schema({
  content: Object,
  media_id: String,
  update_time: Number
});

const WechatMaterialVideo = new Schema({
  media_id:String,
  name:String,
  update_time:Number
})

const WechatMateriaVoice = new Schema({
  media_id:String,
  name:String,
  update_time:Number
})

module.exports = {
  WechatToken,
  WechatMaterialCount,
  WechatMaterialImage,
  WechatMaterialNews,
  WechatMaterialVideo,
  WechatMateriaVoice
};
