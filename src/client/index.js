import { h, render } from "preact"
import { Provider } from "preact-redux"
import "material-design-lite/material"
import { syncHistoryWithStore } from "preact-router-redux"
import browerHistory from "browserHistory"
import configureStore from "store"
let root = document.getElementById("root").lastElementChild

function init() {
	const App = require("App").default,
		store = configureStore(browerHistory, window.__INITIAL_STATE__),
		history = syncHistoryWithStore(browerHistory, store)
	root = render(
		<Provider store={store}>
			<App history={history} />
		</Provider>,
		document.getElementById("root"),
		root
	)
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
