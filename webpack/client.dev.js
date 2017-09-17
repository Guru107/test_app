const { clientCommon, PATHS } = require("./common.config")
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin")
const webpack = require("webpack")

const clientConfig = Object.assign({}, clientCommon, {
	entry: [
		"webpack-hot-middleware/client?name=client&path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false",
		PATHS.CLIENT
	],
	devServer: {
		contentBase: clientCommon.output.path,
		compress: true,
		port: 8081,
		color: true,
		disableHostCheck: true,
		host: "0.0.0.0",
		hot: true,
		noInfo: true,
		overlay: true
	},
	output: Object.assign({}, clientCommon.output, {
		filename: "[name].js",
		chunkFilename: "[name].js"
	}),
	plugins: clientCommon.plugins.concat([
		new webpack.HotModuleReplacementPlugin(),
		new ExtractCssChunks({ filename: "[name].css" }),
		new webpack.DefinePlugin({
			__DEV__: true,
			__PROD__: false,
			__SERVER__: false,
			__CLIENT__: true,
			"process.env.NODE_ENV": JSON.stringify("development")
		})
	])
})

module.exports = clientConfig
