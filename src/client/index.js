import { h, render } from "preact"

let root = document.getElementById("root").lastElementChild

function init() {
	const App = require("../app/TestComponent").default
	root = render(<App />, document.getElementById("root"), root)
}

if (__DEV__ && module.hot) {
	require("preact/devtools")
	module.hot.accept("../app/TestComponent", () => {
		window.requestAnimationFrame(init)
	})
}

init()
