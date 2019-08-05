const OSS = require("ali-oss");
const request = require("request-promise");
const fs = require("fs");

let client = new OSS({
  region: "oss-cn-beijing",
  //云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，部署在服务端使用RAM子账号或STS，部署在客户端使用STS。
  accessKeyId: "LTAIdXYHTEj8pFy6",
  accessKeySecret: "TFfPiLNU1qSFkkbLjejJ3XbLnnqKKs",
  bucket: "wang-yu-biao"
});

async function updateWechatSubscriptImageMaterial(path, image) {
  let res = null;
  res = await client.put(path, image);
  return res;
}

async function requestWechatSubscriptImage2AliOss(src, ossPath) {
  let updated = false;
  let res = null;
  let imageBuffer = null;
  await request({
    uri: src
  }).on("data", function(chunk) {
    if (!imageBuffer) {
      imageBuffer = chunk;
    } else {
      imageBuffer = Buffer.concat([imageBuffer, chunk]);
    }
  });
  res = await updateWechatSubscriptImageMaterial(ossPath, imageBuffer);
  return res;
}

module.exports = {
  updateWechatSubscriptImageMaterial,
  requestWechatSubscriptImage2AliOss
};
