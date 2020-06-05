const path = require('path');
const merge = require("webpack-merge");
const webpackConfigBase = require('./webpack.base.config');
const webpackConfigDev = {
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: './js/[name].js'
    },
    devServer: {
        compress:true,
        overlay: {
            warnings: true,
            errors: true
        },
        host: 'localhost',
        port: 1000,
        //配置接口代理
        proxy:{

        },
        // 打开浏览器
        open: false,
        // 如果为false，这时它会通过 iframe 的方式去运行要开发的网页，当构建完变化后的代码时通过刷新 iframe 来实现实时预览。
        inline: true
    },

    module: {
        rules: [{
            test: /\.less$/,
            use: ["vue-style-loader", "css-loader", {
                loader:"less-loader",
                options: {
                    sourceMap: true
                }
            }, {
                loader: 'style-resources-loader',
                options: {
                    patterns: [
                        path.resolve(__dirname, 'src/styles/variable.less'),
                        path.resolve(__dirname, 'src/styles/mixins.less'),
                    ]
                }
            }],
            exclude: [/node_modules/]
        },{
            test: /\.scss$/,
            use: ["vue-style-loader", "css-loader", {
                loader: "sass-loader",
                options: {
                    sourceMap:true
                }
            }],
            exclude: [/node_modules/]
        },
            {
                test: /\.css$/,
                include: [path.resolve(__dirname, "./src")],
                use: ["vue-style-loader", "css-loader?sourceMap"]
            }
        ]
    },
    devtool: "eval-cheap-module-source-map",  // 开启调试模式
}

module.exports = merge(webpackConfigBase, webpackConfigDev);
