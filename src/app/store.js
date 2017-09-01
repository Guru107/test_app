import { createStore, applyMiddleware, compose } from "redux"
import { routerMiddleware } from "preact-router-redux"
import rootReducer from "./reducer"
import thunkMiddleware from "redux-thunk"
export default function(history, state) {
	let composeStore

	if (__DEV__) {
		composeStore = compose(
			applyMiddleware(thunkMiddleware, routerMiddleware(history)),
			typeof window === "object" &&
			typeof window.devToolsExtension !== "undefined"
				? window.devToolsExtension()
				: f => f
		)
	} else {
		composeStore = compose(
			applyMiddleware(thunkMiddleware, routerMiddleware(history))
		)
	}
	const store = createStore(rootReducer, state, composeStore)
	return store
}
