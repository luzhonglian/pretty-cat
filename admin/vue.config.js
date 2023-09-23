const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");
const Icons = require("unplugin-icons/webpack");
const IconsResolver = require("unplugin-icons/resolver");
const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      //配置webpack自动按需引入element-plus，
      require("unplugin-element-plus/webpack")({
        libs: [
          {
            libraryName: "element-plus",
            esModule: true,
            resolveStyle: (name) => {
              return `element-plus/theme-chalk/${name}.css`;
            },
          },
        ],
      }),
      AutoImport({
        imports: ["vue", "vue-router"],
        resolvers: [
          // 自动导入图标组件
          IconsResolver({
            prefix: "Icon",
          }),
          ElementPlusResolver(),
        ],
      }),
      Components({
        resolvers: [
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ["ep"],
          }),
          ElementPlusResolver(),
        ],
      }),
      Icons({
        autoInstall: true,
      }),
    ],
  },
  devServer: {
    proxy: {
      "/backstage-api": {
        target: "http://localhost:3000", //把默认的localhost:8080改为3000
        changeOrigin: true,
      },
    },
  },
});
