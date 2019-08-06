const Router = require("koa-router");
const router = new Router();

const {
  routeUpdateMaterialCount,
  routeUpdateImageMaterial,
  routeUpdateNewsMaterial,
  routeUpdateVideoMaterial,
  routeUpdateVioceMaterial
} = require("./wechat/wecaht");

const { routeUpdateMaterialImage2Oss } = require("./material/upload2oss");

router.get("/api/wechat/updateMaterialCount", routeUpdateMaterialCount);
router.get("/api/wechat/updateImageMaterial", routeUpdateImageMaterial);
router.get("/api/wechat/updateNewsMaterial", routeUpdateNewsMaterial);
router.get("/api/wechat/updateVideoMaterial", routeUpdateVideoMaterial);
router.get("/api/wechat/updateVioceMaterial", routeUpdateVioceMaterial);

router.get(
  "/api/material/routeUpdateMaterialImage2Oss",
  routeUpdateMaterialImage2Oss
);

module.exports = router;
