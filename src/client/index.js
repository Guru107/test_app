import { h, render } from "preact"
import "material-design-lite/material"
let root = document.getElementById("root").lastElementChild

function init() {
	const App = require("App").default
	root = render(<App />, document.getElementById("root"), root)
	if (__DEV__) {
		const rootNode = document.getElementById("root")
		if (rootNode.childElementCount > 1) {
			rootNode.removeChild(rootNode.firstChild)
		}
	}
}

if (__DEV__ && module.hot) {
	require("preact/devtools")
	module.hot.accept("App", () => {
		window.requestAnimationFrame(init)
	})
}

init()
