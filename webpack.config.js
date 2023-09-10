const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        gtap: [
            './lib/gtap.js',
        ],
    },

    mode: 'development',

    plugins: [
        new CleanWebpackPlugin(['dist']),
    ],

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        library: 'gtap',
        libraryTarget: 'umd',
    },

    // devtool: 'cheap-eval-source-map',
};
