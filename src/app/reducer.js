import { combineReducers } from "redux"
import { routerReducer as routing } from "preact-router-redux"
import moviesReducer from "api/Reducer"

const reducerObject = {
	routing,
	moviesReducer
}

const rootReducer = combineReducers(reducerObject)

export default rootReducer
