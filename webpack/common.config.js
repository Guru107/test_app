const { join, sep } = require("path")
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin")
const fs = require("fs")
const babelConfig = require("../babelconfig")
const pathJoin = p => join(__dirname, "..", p)

const PATHS = {
	NODE_MODULES: pathJoin("node_modules"),
	SRC: pathJoin("src"),
	APP: pathJoin(`src${sep}app`),
	CLIENT: pathJoin(`src${sep}client`),
	SERVER: pathJoin(`src${sep}server`),
	WEBPACK: pathJoin("webpack"),
	PUBLIC: pathJoin("public"),
	BUILD: pathJoin("build")
}
const commonConfig = {
	context: PATHS.SRC,
	resolve: {
		extensions: [".js", ".css", ".less", ".jsx", ".json"],
		alias: {
			react: "preact-compat",
			"react-dom": "preact-compat"
		},
		modules: [PATHS.APP, PATHS.CLIENT, PATHS.SERVER, PATHS.NODE_MODULES]
	}
}

const clientCommon = Object.assign({}, commonConfig, {
	name: "client",
	target: "web",
	devtool: "eval", //https://webpack.js.org/configuration/devtool/#devtool
	output: {
		path: PATHS.PUBLIC,
		publicPath: "/assets/"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: Object.assign(babelConfig(true), {
						cacheDirectory: true
					})
				}
			},
			{
				test: /\.less$/,
				exclude: /node_modules/,
				use: ExtractCssChunks.extract({
					use: [
						{
							loader: "css-loader",
							options: {
								minimize: true,
								modules: true,
								localIdentName:
									"[name]__[local]--[hash:base64:5]"
							}
						},
						{
							loader: "less-loader",
							options: {
								strictMath: true,
								noIeCompat: true,
								lint: true,
								strictImports: true,
								strictUnits: true
							}
						}
					]
				})
			},
			{
				test: /\.css$/,
				use: ExtractCssChunks.extract({
					use: [
						{
							loader: "css-loader",
							options: {
								modules: true,
								localIdentName:
									"[name]__[local]--[hash:base64:5]"
							}
						}
					]
				})
			}
		]
	}
})
const externals = fs
	.readdirSync(PATHS.NODE_MODULES)
	.filter(
		x => !/\.bin|react-universal-component|webpack-flush-chunks/.test(x)
	)
	.reduce((externals, mod) => {
		externals[mod] = `commonjs ${mod}`
		return externals
	}, {})
const serverCommon = Object.assign({}, commonConfig, {
	context: commonConfig.context,
	target: "node",
	name: "server",
	externals,
	output: {
		path: PATHS.BUILD
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: Object.assign(babelConfig(false), {
						cacheDirectory: true
					})
				}
			},
			{
				test: /\.less$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "css-loader/locals",
						options: {
							modules: true,
							localIdentName: "[name]__[local]--[hash:base64:5]"
						}
					},
					{
						loader: "less-loader"
					}
				]
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: "css-loader/locals",
						options: {
							modules: true,
							localIdentName: "[name]__[local]--[hash:base64:5]"
						}
					}
				]
			}
		]
	}
})

module.exports = { clientCommon, serverCommon, PATHS }
