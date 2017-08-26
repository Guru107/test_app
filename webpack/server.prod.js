const webpack = require("webpack")
const { serverCommon, PATHS } = require("./common.config")
const serverProdConfig = Object.assign({}, serverCommon, {
	entry: PATHS.SERVER,
	output: Object.assign(serverCommon.output, {
		filename: "[name].js",
		libraryTarget: "commonjs2"
	}),
	plugins: [
		new webpack.DefinePlugin({
			__DEV__: false,
			__PROD__: true,
			__SERVER__: true,
			__CLIENT__: false,
			"process.env.NODE_ENV": JSON.stringify("production")
		})
	]
})

module.exports = serverProdConfig
