const fs = require("fs");
const axios = require("axios");
const APPID = "wx1d5ceac7bebe1c42";
const APPSECRET = "01b870eaee88619ef042162484272c41";
const token = "wyb";
const { wechatTokenModel } = require("../db/Models/wechatMaterial");
const access_token_object_id_in_mongodb = "5d1c75e9cf3a6f2596330183";
const { generateHash } = require("../../api/wechat");

const access_token = {
  token: "",
  expires_in: 0,

  // 用刚从微信服务器上获取的access_token,更新 access_token,并更新过期时间后将数据同步到数据库
  updateFromWechat: function(token, expires_in) {
    this.token = token;
    this.expires_in = Math.floor(Number(new Date())) + expires_in * 1000;
    updateAccessTokenToDb(access_token.token, this.expires_in); // 同步到数据库
  },
  updateFromDb: function(token, expires_in) {
    this.token = token;
    this.expires_in = expires_in;
  },
  isExpired: async function() {
    if (Number(new Date()) >= this.expires_in) {
      console.log("微信acess_token已过期，正在从数据库拉取.");
      await getAccessTokenFromDB();
    }
    if (Number(new Date()) >= this.expires_in){
      console.log("[warning]数据库中的微信acess_token已过期，正在从微信服务器拉取.");
      await getAccessTokenFromWechatSubscriptionServer();
    }
  },
  init: async function() {
    await this.isExpired();
  }
};

access_token.init();

async function updateAccessTokenToDb(token, expires_in) {
  await wechatTokenModel
    .findOneAndUpdate(
      {
        _id: access_token_object_id_in_mongodb
      },
      {
        token: token,
        expires_in: expires_in
      }
    )
    .catch(err => {
      console.log("[error]access_token更新到数据库失败.");
      console.log(err);
    });
}

// 微信服务器 基本配置 验证
async function wechatAccess(ctx, next) {
  let params = ctx.query;
  let { signature, echostr, timestamp, nonce } = params;
  if (!signature || !echostr || !timestamp || !nonce) {
    return next();
  }
  let hash = generateHash(token, echostr, timestamp, nonce);
  if (signature === hash) {
    return (ctx.body = echostr);
  } else {
    next();
  }
}

// 从数据库获得accsess_token
async function getAccessTokenFromDB() {
  const accessTokenFromDb = await wechatTokenModel.findById(
    access_token_object_id_in_mongodb
  );
  if (accessTokenFromDb) {
    await access_token.updateFromDb(
      accessTokenFromDb.token,
      accessTokenFromDb.expires_in
    );
    console.log(
      "[success]从数据库获得的access_token,有效期至: " +
        new Date(accessTokenFromDb.expires_in)
    );
  } else {
    console.log("[warning]从数据库获得的access_token失败.");
  }
}

// 从微信服务器获得accsess_token
async function getAccessTokenFromWechatSubscriptionServer() {
  await axios
    .get(
      `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`
    )
    .then(({ data }) => {
      console.log(
        "[success]微信access_token获取成功,有效期至:" +
          new Date(Number(new Date()) + data.expires_in * 1000)
      );
      access_token.updateFromWechat(data.access_token, data.expires_in);
    })
    .catch(err => {
      console.log("[warning]微信access_token获取失败");
      console.log(err);
    });
}

module.exports = {
  wechatAccess,
  wechatAccessToken: access_token
};
