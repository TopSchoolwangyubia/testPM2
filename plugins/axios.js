import * as axios from "axios";
// axios.defaults.withCredentials = true;
// axios.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded";
// axios.defaults.headers['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'

axios.defaults.timeout = 0;
let options = {};
options.baseURL =
  process.env.NODE_ENV === "production"
    ? "https://api.towords.com"
    : "http://preapi.towords.com";

const axiosIns = axios.create(options);

export const request = function(methods, url, params) {
  let strParams = "";
  if (params instanceof Object) {
    strParams = "?";
    for (let key in params) {
      strParams += key + "=" + params[key] + "&";
    }
    let last = strParams[strParams.length - 1];
    if (last === "?" || last === "&") {
      strParams = strParams.slice(0, -1);
    }
  }
  return axiosIns[methods](url + strParams)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      if (err) throw err;
    });
};
