const { join } = require("path")
const webpack = require("webpack")
const { serverCommon } = require("./common.config")
const serverConfig = Object.assign({}, serverCommon, {
	entry: join(__dirname, "..", "src/server/render.js"),
	output: Object.assign(serverCommon.output, {
		filename: "[name].js",
		libraryTarget: "commonjs2"
	}),
	plugins: [
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
