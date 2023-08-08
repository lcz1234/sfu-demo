const CracoLessPlugin = require('craco-less')
const path = require('path')

// const pathResolve = pathUrl => path.join(__dirname, pathUrl)
// const resolve = dir => path.resolve(__dirname, dir)

module.exports = {
  //配置代理解决跨域
  devServer: {
    port: 8000,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:18091',
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      },
    },
  },
  webpack: {
    // 更改build打包文件名称
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.output.path = path.resolve(__dirname, 'Hello')
      paths.appBuild = path.resolve(__dirname, 'Hello')
      return webpackConfig
    },
    // alias: {
    //   "@": path.resolve("src"),
    //   "components": path.resolve("src/components")
    // }
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        // 此处根据 less-loader 版本的不同会有不同的配置，详见 less-loader 官方文档
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {},
            javascriptEnabled: true
          }
        }
      }
    }
  ]
}