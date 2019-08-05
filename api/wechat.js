const sha1 = require("simple-sha1");
const axios = require("axios");

// 生成微信验证的Hash
// https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140183
function generateHash(token,echostr, timestamp, nonce){
    let sign = [token, timestamp, nonce];
    sign.sort();
    let signStr = "";
    sign.forEach(function(item, index) {
      signStr += item;
    });
    let hash = sha1.sync(signStr);
}

// 获取素材总数
// https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444738733
function getMaterialCount({access_token}){
    return axios.get(
        `https://api.weixin.qq.com/cgi-bin/material/get_materialcount?access_token=${
            access_token
        }`
    ).catch(err=>{
        console.log('从微信公众号服务器获取素材总数失败.');
    })
}

// 获取素材列表
// type: "image" | "video" | "voice" | "news"
// https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444738734
function getMaterialList({
    type, 
    offset,
    count,
    access_token
  }) {
    // 获取图文素材列表
    return axios.post(
      `https://api.weixin.qq.com/cgi-bin/material/batchget_material?access_token=${
        access_token
      }`,
      {
        type,
        offset,
        count
      }
    ).catch(err=>{
        console.log('获取type: '+ type +' 素材失败.');  
    })
}

// 获取临时素材
// https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444738727
function getMaterialTemporary({access_token, media_id}){
    return axios.post(
        `https://api.weixin.qq.com/cgi-bin/media/get?access_token=${
            access_token
        }&media_id=${media_id}`
    ).catch(err=>{
        console.log('从微信公众号服务器get临时素材失败.');
    })
}

// 获取永久素材
// https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444738730
function getMaterialPermanent({access_token, media_id}){
    return axios.post(
        `https://api.weixin.qq.com/cgi-bin/material/get_material?access_token=${
            access_token
        }&media_id=${media_id}`
    ).catch(err=>{
        console.log('从微信公众号服务器get临时素材失败.');
    })
}



module.exports =  {
    generateHash,
    getMaterialCount,
    getMaterialList,
    getMaterialTemporary,
    getMaterialPermanent
}