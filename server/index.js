const Koa = require("koa");
const app = new Koa();
const { wechatTokenModel } = require("../bin/db/Models/wechatMaterial");
const { wechatAccess, wechatAccessToken } = require("../bin/wechat/access");
const router = require("./controller/index");

wechatTokenModel.findOne({}).then(res => {});

app.use(wechatAccess);
app.use(async (ctx, next) => {
  ctx.wechatAccessToken = wechatAccessToken;
  console.log("[success]path:" + ctx.path);
  await next();
});
app.use(router.routes()).use(router.allowedMethods());
app.use(async ctx => {
  // ctx.body = wechatAccessToken.token;
  ctx.body = "test pm2 wan";
});

app.listen(3000);
