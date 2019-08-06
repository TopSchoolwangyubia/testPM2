const pkg = require("./package");

module.exports = {
  mode: "universal",

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description }
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href:
          "https://official-web.oss-cn-beijing.aliyuncs.com/towords/article/T/story/icon_1.png"
      }
    ],
    script: [
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"
      }
    ]
  },
  css: ["~/assert/css/bootstrap-reboot.min.css", "~/assert/css/animation.css"],
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },

  /*
   ** Global CSS
   */
  // css: ["element-ui/lib/theme-chalk/index.css"],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {
      src: "~/plugins/resize.js",
      ssr: false
    },
    {
      src: "~/plugins/mint-ui.js",
      ssr: true
    },
    {
      src: "~/plugins/clientNavi.js",
      ssr: false
    },
    {
      src: "~/plugins/gatDayArr.js",
      ssr: false
    }
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    // "@nuxtjs/axios",
    // ["@nuxtjs/pwa", { icon: true }]
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
   ** Build configuration
   */
  build: {
    // transpile: [/^element-ui/],

    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // 配置sass
      // const vueLoader = config.module.rules.find((rule) => rule.loader === 'vue-loader');
      // vueLoader.options.loaders.sass = 'vue-style-loader!css-loader!sass-loader';
    }
  }
};
