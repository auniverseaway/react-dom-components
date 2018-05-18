const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'dist');
const APP_DIR = path.resolve(__dirname, 'src');

const config = {
    resolve: {
        extensions: ['.js', '.jsx']
    },
    entry: APP_DIR + '/index.js',
    output: {
        path: BUILD_DIR,
        filename: 'index.js'
    },
    devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'cheap-module-eval-source-map',
    module : {
        loaders : [
            {
                test: /(\.jsx$|\.js$)/,
                exclude: /(node_modules)/,
                loader : 'babel-loader'
            }
        ]
    }
};

module.exports = config;