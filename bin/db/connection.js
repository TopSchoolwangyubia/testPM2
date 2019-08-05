"use strict";

const mongoose = require("mongoose");
const TestDBPwd = encodeURIComponent("7758521@test");

// 'useFindAndModify': true by default. Set to false to make findOneAndUpdate() and findOneAndRemove() use native findOneAndUpdate() rather than findAndModify().
mongoose.connect(
  "mongodb://test:" + TestDBPwd + "@47.93.194.56:27017/test?retryWrites=true",
  { useNewUrlParser: true, useFindAndModify: false }
);
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.once("open", () => {
  db.set("useFindAndModify", false);
  console.log("[success]连接数据库成功.");
});

db.on("error", function(error) {
  console.error("[error]Error in MongoDb connection: " + error);
  mongoose.disconnect();
});

db.on("close", function() {
  console.log("[warning]数据库断开，重新连接数据库");
  mongoose.connect(config.url, { server: { auto_reconnect: true } });
});

module.exports = db;
