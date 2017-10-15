const { clientCommon, PATHS } = require("./common.config")
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin")
const UglifyJSPlugin = require("uglifyjs-webpack-plugin")
const CompressionPlugin = require("compression-webpack-plugin")
const BrotliPlugin = require("brotli-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
//const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin
const fs = require("fs")
const path = require("path")
const WorkboxBuildWebpackPlugin = require("workbox-webpack-plugin")
const webpack = require("webpack")
/**
 * @const workBoxLibMap
 * @description This constant holds an array of objects containing all the workbox libs
 * 				required and in a format compatable for copy-webpack-plugin as all the
 * 				libs are copied from `node_modules` folder to the `public` folder.
 *
 */
const workBoxLibMap = fs
	.readdirSync(PATHS.NODE_MODULES)
	.filter(name => /^workbox/.test(name) && !/webpack|build/.test(name))
	.map(name => {
		const libPath = `${PATHS.NODE_MODULES}/${name}/build/importScripts/`
		const libFileName = fs
			.readdirSync(libPath)
			.filter(name => /dev/.test(name))
			.map(fileName => {
				return {
					from: `${libPath}${fileName}`,
					to: `${path.basename(name)}${path.extname(fileName)}`
				}
			})

		return libFileName
	})
	.reduce((acc, val) => acc.concat(val), [])

const clientProdConfig = Object.assign(clientCommon, {
	devtool: "source-map",
	entry: { main: PATHS.CLIENT },
	output: Object.assign(clientCommon.output, {
		filename: "js/[name].[chunkhash].js",
		chunkFilename: "js/[name].[chunkhash].js"
	}),
	plugins: clientCommon.plugins.concat([
		new ExtractCssChunks({ filename: "[name].[chunkhash].css" }),
		new UglifyJSPlugin({
			parallel: true,
			sourceMap: true,
			extractComments: true,
			uglifyOptions: {
				ecma: 6,
				compress: {
					dead_code: true,
					drop_debugger: true,
					hoist_funs: true,
					inline: true,
					join_vars: true,
					reduce_vars: true,
					warnings: true,
					drop_console: true,
					keep_infinity: true
				}
			}
		}),
		new CompressionPlugin({
			test: /\.(html|css)$|^(?!sw).*\.js$/,
			threshold: 10240,
			minRatio: 0.8,
			algorithm: "gzip"
		}),
		new BrotliPlugin({
			test: /\.(css|html)$|^(?!sw).*\.js$/,
			threshold: 10240,
			minRatio: 0.8
		}),
		new webpack.DefinePlugin({
			__DEV__: false,
			__PROD__: true,
			__SERVER__: false,
			__CLIENT__: true,
			"process.env.NODE_ENV": JSON.stringify("production")
		}),
		new WorkboxBuildWebpackPlugin({
			swSrc: PATHS.SRC + "/sw.js",
			globIgnores: ["workbox-*"]
		}),
		new CopyWebpackPlugin(workBoxLibMap)
		// new BundleAnalyzerPlugin({
		// 	openAnalyzer: false,
		// 	generateStatsFile: true,
		// 	statsFilename: "stats.json"
		// })
	])
})

module.exports = clientProdConfig
