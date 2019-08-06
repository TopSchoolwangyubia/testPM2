const Koa = require("koa");
const app = new Koa();
const { wechatTokenModel } = require("../bin/db/Models/wechatMaterial");
const { wechatAccess, wechatAccessToken } = require("../bin/wechat/access");
const router = require("./controller/index");
let config = require("../nuxt.config.js");

const { Nuxt, Builder } = require("nuxt");
const nuxt = new Nuxt(config);

wechatTokenModel.findOne({}).then(res => {});

console.log(process.env.NODE_ENV);

config.dev = !(process.env.NODE_ENV === "production");

async function start() {
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
    console.log("nuxt readyed");
  }

  app.use(wechatAccess);

  app.use(async (ctx, next) => {
    ctx.wechatAccessToken = wechatAccessToken;
    console.log("[success]path:" + ctx.path);
    await next();
  });

  app.use(router.routes()).use(router.allowedMethods());

  app.use(async ctx => {
    ctx.status = 200;
    ctx.respond = false; // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx; // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res);
  });

  app.use(async ctx => {
    // ctx.body = wechatAccessToken.token;
  });

  app.listen(process.env.PORT || 3003);
}

start();
