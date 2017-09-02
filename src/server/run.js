const express = require("express")
const webpack = require("webpack")
const noFavicon = require("express-no-favicons")
const webpackDevMiddleware = require("webpack-dev-middleware")
const webpackHotMiddleware = require("webpack-hot-middleware")
const webpackHotServerMiddleware = require("webpack-hot-server-middleware")
const clientConfigDev = require("../../webpack/client.dev")
const serverConfigDev = require("../../webpack/server.dev")
const clientProdConfig = require("../../webpack/client.prod")
const serverProdConfig = require("../../webpack/server.prod")
const publicPath = clientConfigDev.output.publicPath
const outputPath = clientConfigDev.output.path
const expressStaticGzip = require("express-static-gzip")
const app = express()

app.use(noFavicon())

let isBuilt = false

const done = () =>
	!isBuilt &&
	app.listen(process.env.PORT, () => {
		isBuilt = true
		// eslint-disable-next-line no-console
		console.log(
			"Build complete -- Listening @ localhost:",
			process.env.PORT,
			"\nNODE_ENV: ",
			process.env.NODE_ENV
		)
	})

if (process.env.NODE_ENV === "development") {
	console.log("inside dev") // eslint-disable-line no-console
	const compiler = webpack([clientConfigDev, serverConfigDev])
	const clientCompiler = compiler.compilers[0]
	const options = { publicPath, stats: { colors: true } }

	app.use(webpackDevMiddleware(compiler, options))
	app.use(webpackHotMiddleware(clientCompiler))
	app.use(webpackHotServerMiddleware(compiler))
	compiler.plugin("done", done)
} else {
	webpack([clientProdConfig, serverProdConfig]).run((err, stats) => {
		const clientStats = stats.toJson().children[0]
		const serverRender = require("../../build/main.js").default
		app.use(function(req, res, next) {
			res.setHeader("Service-Worker-Allowed", "/")
			next()
		})
		app.use(
			publicPath,
			expressStaticGzip(outputPath, { enableBrotli: false })
		)
		app.use(serverRender({ clientStats }))
		done()
	})
}
