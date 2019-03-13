var path = require('path')

const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
	entry: './assets/js/main.js',
	
	output: {
		path: path.resolve(__dirname, './build'),
		//publicPath: '/dist/',
		publicPath: './build/',
		filename: 'build.js',
	},
	
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: "vue-loader",
			},
			{
				test: /\.css$/,
				use: [
					"vue-style-loader",
					"css-loader"
				]
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				}
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				use: [
					'file-loader',
					{
						loader: 'image-webpack-loader',
						options: {
							bypassOnDebug: true, // webpack@1.x
							disable: true, // webpack@2.x and newer
						},
					},
				],
			}
		]
	},
	
	plugins: [
		new VueLoaderPlugin(),
	],
	
	devtool: "source-map",
}