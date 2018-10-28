const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackMerge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const modeConfig = env => require(`./build/webpack.${env}`)(env)

module.exports = ({ mode, presets } = { mode: 'development', presets: [] }) => {
	return webpackMerge(
		{
			mode,
			entry: ['@babel/polyfill', './src/index.js'],
			output: {
				path: path.resolve(__dirname, 'dist'),
				filename: 'bundle.js'
			},
			module: {
				rules: [
					{
						test: /\.(js)$/,
						exclude: /node_modules/,
						use: {
							loader: 'babel-loader'
						}
					},
					{
						test: /\.(less)$/,
						exclude: /node_modules/,
						use: [{
								loader: mode === 'development' ? "style-loader" : MiniCssExtractPlugin.loader // creates style nodes from JS strings
						}, {
								loader: "css-loader", // translates CSS into CommonJS
								options: {
									sourceMap: true,
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
								loader: mode === 'development' ? "style-loader" : MiniCssExtractPlugin.loader // creates style nodes from JS strings
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
			plugins: [
				new HtmlWebpackPlugin({
					template: './src/index.html'
				}),
				new webpack.ProgressPlugin(),
				new MiniCssExtractPlugin()
			]
		},
		modeConfig(mode)
	)
}