const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = () => ({
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../'),
      verbose: true
    })
  ]
})