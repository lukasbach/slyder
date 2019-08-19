const commonConfig = require('./webpack.common');
const webpack = require('webpack');
const path = require('path');

const config = {
    ...commonConfig,
    // plugins: [new webpack.HotModuleReplacementPlugin()],
    mode: 'development',
    devtool: 'inline-source-map',
    entry: [
        commonConfig.entry,
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080/',
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3000,
        hot: true,
        // hotOnly: true
    }
};

module.exports = config;