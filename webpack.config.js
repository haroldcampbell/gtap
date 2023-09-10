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
        new CleanWebpackPlugin(['www/assets/dist']),
    ],

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'www/assets/dist'),
        library: 'gtap',
        libraryTarget: 'umd',
    },

    // devtool: 'cheap-eval-source-map',
};
