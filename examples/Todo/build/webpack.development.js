const webpack = require('webpack')

module.exports = () => ({
  devtool: 'source-map',
  devServer: {
    hot: true,
    overlay: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})