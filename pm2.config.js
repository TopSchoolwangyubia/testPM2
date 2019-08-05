const path = require("path");
module.exports = {
  apps: [
    {
      name: "app",
      script: "./server/index.js",
      cwd: path.resolve(__dirname, "./"), // 当前工作路径
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      },
      max_memory_restart: "10000M",
      ignore_watch: [
        // 从监控目录中排除
        "node_modules",
        "logs",
        "static"
      ],
      watch: [path.resolve(__dirname, "./server/")],
      out_file: "./logs/out.log", // 普通日志路径
      error_file: "./logs/err.log", // 错误日志路径
      merge_logs: false,
      log_date_format: "YYYY-MM-DD HH:mm Z" // 设置日志的日期格式
    }
  ],
  deploy: {
    // "production" is the environment name
    production: {
      // 服务器端SSH key 地址, 默认 $HOME/.ssh
      key: "$HOME/.ssh",
      // SSH user 需配置
      user: "root",
      // SSH host 需配置
      host: ["47.93.157.56"],
      // SSH options with no command-line flag, see 'man ssh'
      // can be either a single string or an array of strings
      ssh_options: "StrictHostKeyChecking=no",
      // GIT remote/branch
      ref: "origin/master",
      // GIT ssh远程地址 需配置
      repo: "git@github.com:raoenhui/next-site-cn.git",
      // 放入服务器端地址 需配置
      path: "/ice/pm2",
      // Pre-setup command or path to a script on your local machine
      "pre-setup": "echo 'This is a pre-setup command'",
      // Post-setup commands or path to a script on the host machine
      // eg: placing configurations in the shared dir etc
      "post-setup": "ls -la",
      // pre-deploy action
      "pre-deploy-local": "echo 'This is a pre-deploy-local command'",
      // post-deploy action
      "post-deploy": "npm install && pm2 reload pm2.config.js --env production'"
    },
};
