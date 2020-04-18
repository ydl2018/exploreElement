const path = require('path');
const merge = require("webpack-merge");
// 清除目录等
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const webpackConfigBase = require('./webpack.base.config');

const webpackConfigProd = {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, './dist'),
        // 打包多出口文件
        filename: './js/[name].[hash].js'
    },
    optimization:{
        splitChunks:{
            chunks:"all"
        }
    },
    module:{
     rules: [
         {
             test:/\.css$/,
             use: [MiniCssExtractPlugin.loader,"css-loader"]
         },
         {
             test: /\.scss$/,
             use:[MiniCssExtractPlugin.loader,"css-loader","sass-loader"]
         },
         {
             test: /\.js$/,
             exclude:/node_modules/,
             use: [{
                 loader:"babel-loader",
                 options:{
                     presets:[["env",{
                         module:false,
                         "targets": {
                             "browsers": ["last 2 versions"]
                         }
                     }],'stage-0'],
                     plugins:['transform-runtime',[
                         "component",
                         {
                             "libraryName": "element-ui",
                             "styleLibraryName": "theme-chalk"
                         }
                     ]]
                 },
             }],
             include:path.resolve(__dirname,"src")
         }
     ]
    },
    plugins: [
        // 从css中抽离出的css文件
        new MiniCssExtractPlugin({
            // 书写生产与开发的命名
            filename: './css/[name].[hash].css'
        }),
        //压缩css
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        }),
        //上线压缩 去除console等信息webpack4.x之后去除了webpack.optimize.UglifyJsPlugin
        new UglifyJSPlugin({
            sourceMap: true,
            uglifyOptions: {
                warnings: false,
                compress: {
                    drop_debugger: false,
                    drop_console: true
                }
            }
        })
    ]
}
module.exports = merge(webpackConfigBase, webpackConfigProd);

