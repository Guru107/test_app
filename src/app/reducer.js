import { combineReducers } from "redux"
import { routerReducer as routing } from "preact-router-redux"

const reducerObject = {
	routing
}
const rootReducer = combineReducers(reducerObject)

export default rootReducer
