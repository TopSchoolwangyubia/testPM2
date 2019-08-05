const path = require("path");
const host = "47.93.194.56";
module.exports = {
  apps: [
    {
      name: "app",
      script: "./server/index.js",
      cwd: path.resolve(__dirname, "./"), // 当前工作路径
      max_memory_restart: "10000M",
      ignore_watch: [
        // 从监控目录中排除
        "node_modules",
        "logs",
        "static"
      ],
      watch: ["server"],
      out_file: "./logs/out.log", // 普通日志路径
      error_file: "./logs/err.log", // 错误日志路径
      merge_logs: false,
      log_date_format: "YYYY-MM-DD HH:mm Z" // 设置日志的日期格式
    }
  ],
  deploy: {
    // "production" is the environment name
    production: {
      // SSH user 需配置
      user: "root",
      // SSH host 需配置
      host: [ host ],
      // GIT remote/branch
      ref: "origin/master",
      // GIT ssh远程地址 需配置
      repo: "git@github.com/TopSchoolwangyubia/testPM2.git",
      // 放入服务器端地址 需配置
      path: "/usr/local/src/testPM2",
      // post-deploy action
      "post-deploy": "npm install && pm2 reload pm2.config.js",
    },
};
