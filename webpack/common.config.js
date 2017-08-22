const path = require("path")
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin")
const fs = require("fs")
const commonConfig = {
	context: path.join(__dirname, "..", "src"),
	resolve: {
		extensions: [".js", ".css", ".less", ".jsx", ".json"],
		alias: {
			react: "preact-compat",
			"react-dom": "preact-compat"
		},
		modules: [path.join(__dirname, "..", "node_modules")]
	}
}

const clientCommon = Object.assign({}, commonConfig, {
	name: "client",
	target: "web",
	devtool: "eval",
	output: {
		path: path.join(__dirname, "..", "public"),
		publicPath: "/assets/"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						cacheDirectory: true
					}
				},
				include: [
					path.resolve(__dirname, "..", "src"),
					path.resolve(__dirname, "..", "node_modules")
				]
			},
			{
				test: /\.less$/,
				exclude: /node_modules/,
				use: ExtractCssChunks.extract({
					use: [
						{
							loader: "css-loader",
							options: {
								modules: true,
								localIdentName:
									"[name]__[local]--[hash:base64:5]"
							}
						},
						{
							loader: "less-loader"
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
	.readdirSync(path.join(__dirname, "..", "node_modules"))
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
	// externals: [
	// 	nodeExternals({
	// 		whitelist: ["react-universal-component", "webpack-flush-chunks"]
	// 	})
	// ],
	externals,
	output: {
		path: path.join(__dirname, "..", "build")
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: "babel-loader",
				include: [
					path.resolve(__dirname, "..", "src"),
					path.resolve(__dirname, "..", "node_modules")
				]
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

module.exports = { clientCommon, serverCommon }
