const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    examples: [
      './www/examples/src/examples-arc.js',
      './www/examples/src/examples-bar.js',
      './www/examples/src/examples-prect.js',
      './www/examples/src/examples-ellipse.js',
      './www/examples/src/examples-segment.js',
      './www/examples/src/examples-chord.js',
      './www/examples/src/examples-polygon.js',
      './www/examples/src/examples-radial-lines.js',
      './www/examples/src/examples-advanced.js',
      './www/examples/src/examples-text.js',
      './www/examples/src/examples-table.js',
    ],
  },

  mode: 'development',

  plugins: [
    new CleanWebpackPlugin(['www/examples/dist']),
  ],

  output: {
    path: path.resolve(__dirname, 'www/examples/dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
  },

  devtool: 'cheap-eval-source-map',
};
