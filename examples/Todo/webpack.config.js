const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index_bundle.js'
	},
	module: {
		rules: [
			{ test: /\.(js)$/, use: 'babel-loader' },
			// { test: /\.(css)$/, use: [ 'style-loader', { loader: 'css-loader', options: { modules: true, javascriptEnabled: true }} ] },
			{
				test: /\.(less)$/,
				exclude: /node_modules/,
				use: [{
						loader: "style-loader" // creates style nodes from JS strings
				}, {
						loader: "css-loader", // translates CSS into CommonJS
						options: {
							modules: true,
							localIdentName: "[name]__[local]__[hash:base64:5]"
						}
				}, {
						loader: "less-loader", // compiles Less to CSS
						options: {
							javascriptEnabled: true
						}
				}]
			},
			{
				test: /\.(less)$/,
				exclude: /src/,
				use: [{
						loader: "style-loader" // creates style nodes from JS strings
				}, {
						loader: "css-loader", // translates CSS into CommonJS
				}, {
						loader: "less-loader", // compiles Less to CSS
						options: {
							javascriptEnabled: true
						}
				}]
			}
		]
	},
	mode: 'development',
	devServer: {
		hot: true,
		open: true,
		overlay: {
			warnings: true,
			errors: true
		}
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		new webpack.HotModuleReplacementPlugin()
	]
}