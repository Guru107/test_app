import { h } from "preact"
import render from "preact-render-to-string"
import { flushChunkNames } from "react-universal-component/server"
import flushChunks from "webpack-flush-chunks"
import App from "App"

export default ({ clientStats }) => (req, res) => {
	const app = render(<App />)
	const chunkNames = flushChunkNames()
	const {
		js,
		styles,
		cssHash,
		scripts,
		stylesheets
	} = flushChunks(clientStats, {
		chunkNames
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
				<title>Test App</title>
			
				<link rel="preload stylesheet" href="https://code.getmdl.io/1.2.1/material.indigo-pink.min.css">
				<style>
					/* fallback */
					@font-face {
					  font-family: 'Material Icons';
					  font-style: normal;
					  font-weight: 400;
					  src: url(https://fonts.gstatic.com/s/materialicons/v29/2fcrYFNaTjcS6g4U3t-Y5UEw0lE80llgEseQY3FEmqw.woff2) format('woff2');
					}
					
					.material-icons {
					  font-family: 'Material Icons';
					  font-weight: normal;
					  font-style: normal;
					  font-size: 24px;
					  line-height: 1;
					  letter-spacing: normal;
					  text-transform: none;
					  display: inline-block;
					  white-space: nowrap;
					  word-wrap: normal;
					  direction: ltr;
					  -webkit-font-feature-settings: 'liga';
					  -webkit-font-smoothing: antialiased;
					}
				</style>
				${styles}
			</head>
			<body>
				<div id="root">${app}</div>
				${cssHash}
				${js}
			</body>
		</html>
	`)
}
