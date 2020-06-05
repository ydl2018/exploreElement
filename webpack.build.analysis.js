const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpackProdConfig = require("./webpack.prod.config");
const merge = require("webpack-merge");
const webpackConfig = {
    plugins: [
        new BundleAnalyzerPlugin()
    ]
};
module.exports = merge(webpackProdConfig, webpackConfig);
