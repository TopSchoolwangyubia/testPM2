const host = "47.93.194.56";
module.exports = {
  apps: [
    {
      name: "app",
      script: "./server/index.js"
    }
  ],
  deploy: {
    // "production" is the environment name
    production: {
      // SSH user 需配置
      user: "root",
      // SSH host 需配置
      host: [host],
      // GIT remote/branch
      ref: "origin/master",
      // GIT ssh远程地址 需配置
      repo: "git@github.com/TopSchoolwangyubia/testPM2.git",
      // 放入服务器端地址 需配置
      path: "/usr/local/src/testPM2",
      // post-deploy action
      "post-deploy": "npm install && pm2 reload ecosystem.config.js"
    }
  }
};
