const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'dist');
const APP_DIR = path.resolve(__dirname, 'src');

const config = {
    entry: APP_DIR + '/index.js',
    output: {
        path: BUILD_DIR,
        filename: 'index.js'
    },
    devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'cheap-module-eval-source-map',
    module : {
        loaders : [
            {
                test : /\.js?/,
                exclude: /node_modules\/(?!(react-dom-components)\/).*/,
                loader : 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-stage-0', '@babel/preset-react']
                }
            }
        ]
    }
};

module.exports = config;