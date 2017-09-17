import { h } from "preact"
import render from "preact-render-to-string"
import { createMemoryHistory } from "history"
import { Provider } from "preact-redux"
import configureStore from "store"
import { flushChunkNames } from "react-universal-component/server"
import flushChunks from "webpack-flush-chunks"
import preloadState from "./preloadState"
import App from "App"
import { resolve } from "path"
export default ({ clientStats }) => (req, res) => {
	preloadState(req.url).then(data => {
		const memoryHistory = createMemoryHistory()
		const store = configureStore(memoryHistory, data)
		const app = render(
			<Provider store={store}>
				<App history={memoryHistory} url={req.url} />
			</Provider>
		)
		const chunkNames = flushChunkNames()
		const {
			js,
			styles,
			scripts,
			stylesheets,
			cssHash
		} = flushChunks(clientStats, {
			chunkNames,
			before: ["bootstrap", "vendor"],
			after: ["main"],
			outputPath: resolve(__dirname, "..", "public")
		})
		console.log("PATH: ", req.path) // eslint-disable-line no-console
		console.log("DYNAMIC CHUNK NAMES RENDERED", chunkNames) // eslint-disable-line no-console
		console.log("SCRIPTS SERVED: ", scripts) // eslint-disable-line no-console
		console.log("STYLESHEETS SERVED: ", stylesheets) // eslint-disable-line no-console
		res.send(`
			<!doctype html>
			<html>
				<head>
					<meta charset="utf-8">
					<meta name=viewport content="width=device-width, initial-scale=1">
					<title>The Movie Database</title>
					<link rel="prefetch stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
					<link rel="prefetch stylesheet" href="https://code.getmdl.io/1.2.1/material.indigo-pink.min.css">
					${styles}
				</head>
				<body>
					<div id="root">${app}</div>
					${cssHash}
					${js}
					<script>window.__INITIAL_STATE__ = ${JSON.stringify(
						store.getState()
					)}</script>
				</body>
			</html>
		`)
	})
}
