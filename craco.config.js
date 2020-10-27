// // 引入node的path模块
// const path = require('path')
// // import pxtoviewport from 'postcss-px-to-viewport'
// const pxtoviewport = require('postcss-px-to-viewport')
// // 暴露一个对象
// module.exports = {
//   // webpack的配置
//   webpack: {
//     // 配置路径别名
//     alias: {
//       "@pages": path.resolve(__dirname, "./src/pages"),
//       "@redux": path.resolve(__dirname, "./src/redux"),
//       "@utils": path.resolve(__dirname, "./src/utils")
//     }
//   },
//   // 样式
//   style: {
//     postcss: {
//       // 插件
//       plugins: [
//         pxtoviewport({
//           viewportWidth: 375,
//         })
//       ]
//     }
//   }
// }


const path = require("path");
const pxtoviewport = require("postcss-px-to-viewport");

module.exports = {
  webpack: {
    // 配置路径别名：将来写路径可以简写
    alias: {
      "@redux": path.resolve(__dirname, "./src/redux"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@api": path.resolve(__dirname, "./src/api"),
    },
  },
  style: {
    postcss: {
      plugins: [
        pxtoviewport({
          viewportWidth: 375,
        }),
      ],
    },
  },
};

