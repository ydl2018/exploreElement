const htmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const path = require("path");


module.exports = {
    resolveLoader: {
        // 去哪个目录找loader
        modules: ['node_modules'],
        // 入口文件的后缀
        extensions: ['.js', '.json'],
        // 指明入口文件位置的字段
        mainFields: ['loader', 'main']
    },

    // 如果 entry 是一个 string 或 array，就只会生成一个 Chunk，这时 Chunk 的名称是 main；
    // 如果 entry 是一个 object，就可能会出现多个 Chunk，这时 Chunk 的名称是 object 键值对里键的名称
    entry: "./src/pages/index.js",
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader",
                include: path.resolve(__dirname, "src")
            },

            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: "babel-loader",
                    options: {
                        presets: [["@babel/env", {
                            "useBuiltIns": "usage",
                            "corejs": 3,
                            modules: false
                        }], "@vue/babel-preset-jsx"]
                    },
                }],
                include: path.resolve(__dirname, "src")
            },
            {
                // 对非文本文件采用 file-loader 加载
                test: /\.(gif|png|jpe?g|eot|woff|ttf|svg|pdf)$/,
                use: [{
                    // 转为base64文件，但是最好文件不要太大，否则一次加载缓慢
                    loader: "url-loader",
                    options: {
                        // 超过30k才使用file-loader
                        limit: 1024 * 30,
                        fallback: "file-loader",
                        name: "images/[name]_[hash:7].[ext]"
                    }
                }],
            }
        ]
    },
    plugins: [
        //删除dist目录
        new CleanWebpackPlugin(),
        // 创建html
        new htmlWebpackPlugin({
            filename: "index.html",
            title: "商企智能组网管理平台",
            template: "./src/pages/index.html",
            excludeChunks: ['portal'],
        }),
        new ProgressBarPlugin(),
        new VueLoaderPlugin()
    ],
    //resolve 配置webpack如何寻找文件
    resolve: {
        // 配置别名映射，不止模块，例如图片的路径也可以
        alias: {
            '@': path.resolve(__dirname, 'src')
        },
        // 只采用 main 字段作为入口文件描述字段，以减少搜索步骤
        mainFields: ['browser', 'module', 'main'],
        // 配置你想要匹配的文件后缀
        // 尽可能少的写下面的字段
        extensions: [".js", ".vue"],
        // 配置webpack去哪里寻找第三方模块
        modules: ["node_modules"],
        // 配置描述第三方模块的名称
        descriptionFiles: ["package.json"]
    }
}
