/**
 *  todoList
 *   1. fixed element.css重复打包
 *   2. add  多入口动态导入
 *   3. 配置  terser-webpack-plugin
 *   4. 配置  postcss
 *   5. speed-measure-webpack-plugin 分析插件打包速度
 */

const path = require('path');
const merge = require("webpack-merge");
// plugin
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const webpackConfigBase = require('./webpack.base.config');

const webpackConfigProd = {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: './js/[name].[hash].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.less$/,
                use: [
                    {loader: MiniCssExtractPlugin.loader}, "css-loader", "less-loader",
                    {
                        loader: 'style-resources-loader',
                        options: {
                            patterns: [
                                path.resolve(__dirname, 'src/styles/variable.less'),
                                path.resolve(__dirname, 'src/styles/mixins.less'),
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [{loader: MiniCssExtractPlugin.loader}, "css-loader", "sass-loader"],
                exclude: [/node_modules/]
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendors: {
                    test: /vue/,
                    name: 'vendors'
                }
            }
        }
    },
    plugins: [
        // 从css中抽离出的css文件
        new MiniCssExtractPlugin({
            // 书写生产与开发的命名
            filename: './css/[name].css'
        }),
        //压缩css
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        }),
        // new UglifyJSPlugin({
        //     sourceMap: false,
        //     uglifyOptions: {
        //         warnings: false,
        //         compress: {
        //             drop_debugger: false,
        //             drop_console: false
        //         }
        //     }
        // })
    ]
}
module.exports = merge(webpackConfigBase, webpackConfigProd);
