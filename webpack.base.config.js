const htmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const DefinePlugin = require("webpack/lib/DefinePlugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require("path");

module.exports = {
    context: process.cwd(),
    // 告诉webpack去哪里寻找loader
    resolveLoader: {
        // 去哪个目录找loader
        modules: ['node_modules'],
        // 入口文件的后缀
        extensions: ['.js','.vue','.json'],
        // 指明入口文件位置的字段
        mainFields: ['loader','main']
    },

    // 如果 entry 是一个 string 或 array，就只会生成一个 Chunk，这时 Chunk 的名称是 main；
    // 如果 entry 是一个 object，就可能会出现多个 Chunk，这时 Chunk 的名称是 object 键值对里键的名称
    entry: {
       index: "./src/pages/index.js"
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader",
                include:path.resolve(__dirname,"src")
            },

            // 由于 source-map-loader 在加载 Source Map 时计算量很大，
            // 因此要避免让该 Loader 处理过多的文件，不然会导致构建速度缓慢。 通常会采用 include 去命中只关心的文件。
            // {test:/\.js$/,
            // use:["source-map-loader"],
            //     enforce: "pre"
            // },
            {
                test: /\.js$/,
                exclude:/node_modules/,
                use: [{
                    loader:"babel-loader",
                    options:{
                        presets:[["@babel/env",{ "modules": false, "useBuiltIns":"usage",
                        "corejs":{
                            proposals:true,
                            version:3
                        }}],"@vue/babel-preset-jsx"]
                    },
                }],
                include:path.resolve(__dirname,"src")
            },
            {
                // 对非文本文件采用 file-loader 加载
                test: /\.(gif|png|jpe?g|eot|woff|ttf|svg|pdf)$/,
                use: [{
                    // 转为base64文件，但是最好文件不要太大，否则一次加载缓慢
                    loader: "url-loader",
                    options: {
                        // 超过30k才使用file-loader
                        limit:1024*30,
                        fallback:"file-loader",
                        name:"images/[name]_[hash:7].[ext]"
                    }
                }],
            },
        ]
    },
    plugins: [
        //删除dist目录
        new CleanWebpackPlugin(),
        // 创建html
        new htmlWebpackPlugin({
            filename: "index.html",
            template: "./src/pages/index.html"
        }),
        //  定义 NODE_ENV 环境变量为 production，以去除源码中只有开发时才需要的部分
        new  DefinePlugin({
            PRODUCTION: JSON.stringify(true),
            VERSION: JSON.stringify('5fa3b9'),
            BROWSER_SUPPORTS_HTML5: true,
            TWO: '1+1',
            'typeof window': JSON.stringify('object'),
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new VueLoaderPlugin()
    ],
    //resolve 配置webpack如何寻找文件
    resolve: {
        // 配置别名映射，不止模块，例如图片的路径也可以
        alias: {
            "vue$":"vue/dist/vue.esm.js",
            '@': path.resolve('src'),
        },
        // 只采用 main 字段作为入口文件描述字段，以减少搜索步骤
        mainFields: ['main'],
        // 配置你想要匹配的文件后缀
        // 尽可能少的写下面的字段
        extensions: [".js",".vue"],
        // 配置webpack去哪里寻找第三方模块
        modules: ["node_modules"],
        // 配置描述第三方模块的名称
        descriptionFiles: ["package.json"]
    }
}
