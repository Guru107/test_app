const webpack = require("webpack")
const WriteFilePlugin = require("write-file-webpack-plugin")
const { serverCommon, PATHS } = require("./common.config")
const serverConfig = Object.assign({}, serverCommon, {
	entry: PATHS.SERVER,
	output: Object.assign(serverCommon.output, {
		filename: "[name].js",
		libraryTarget: "commonjs2"
	}),
	plugins: [
		new WriteFilePlugin(),
		new webpack.DefinePlugin({
			__DEV__: true,
			__PROD__: false,
			__SERVER__: true,
			__CLIENT__: false,
			"process.env.NODE_ENV": JSON.stringify("development")
		})
	]
})

module.exports = serverConfig
