const path = require('path');
const webpack = require("webpack");
const merge = require("webpack-merge");
const webpackConfigBase = require('./webpack.base.config');
const webpackConfigDev = {
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: './js/[name].js',
        chunkFilename:'[name].hash.js'
    },
    devServer: {
        // cache: false,
        // 是否将错误打印到浏览器页面上
        contentBase: path.join(__dirname, 'dist'),
        overlay:{
            warnings:true,
            errors:true
        },
        index:"index.html",
        port:3000,
        // 热更新
        hot:true,
        // true表示这是单页引用
        historyApiFallback: {
            // 此处的相对路径是指contentBase里定义的路径
            rewrites:[
                {from:/^\/user/,to:'/a.html'},
                {from:/./,to:'/b.html'}
            ]
        },
        // 配置控制台打印的日志
        // clientLogLevel:"error",

        // 打开浏览器
        open:true,
        // 如果为false，这时它会通过 iframe 的方式去运行要开发的网页，当构建完变化后的代码时通过刷新 iframe 来实现实时预览。
        inline:true
    },

    module:{
      rules:  [ {
          test: /\.scss$/,
          use:[{
              "loader":"vue-style-loader"
          },{
              "loader": "css-loader",
              options:{

                  localIdentName: '[local]_[hash:base64:8]'
              }
          },{
              "loader": "sass-loader"
          }],
          exclude:[/node_modules/]
      },
          {
              test:/\.css$/,
              use:[{
                  "loader":"vue-style-loader"
              },{
                 "loader": "css-loader"
              }]
          }
      ]
    },
    plugins: [
        //热更新
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool: "cheap-module-eval-source-map",  // 开启调试模式
}
module.exports = merge(webpackConfigBase, webpackConfigDev);
