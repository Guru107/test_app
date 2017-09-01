import {
	REQUESTING,
	RECEIVE_TOP_RATED,
	RECEIVE_NOW_SHOWING,
	RECEIVE_POPULAR,
	API_FAILURE
} from "./ActionTypes"

export default function moviesReducer(
	state = {
		topRated: [],
		nowShowing: [],
		popular: [],
		isFetching: false,
		success: false,
		error: false
	},
	action
) {
	switch (action.type) {
		case REQUESTING: {
			return Object.assign({}, state, {
				isFetching: true,
				success: false,
				error: false
			})
		}

		case RECEIVE_NOW_SHOWING: {
			return Object.assign({}, state, {
				isFetching: false,
				success: true,
				error: false,
				nowShowing: action.data.results
			})
		}

		case RECEIVE_POPULAR: {
			return Object.assign({}, state, {
				isFetching: false,
				success: true,
				error: false,
				popular: action.data.results
			})
		}

		case RECEIVE_TOP_RATED: {
			return Object.assign({}, state, {
				isFetching: false,
				success: true,
				error: false,
				topRated: action.data.results
			})
		}

		case API_FAILURE: {
			return Object.assign({}, state, {
				isFetching: false,
				success: false,
				error: true
			})
		}
		default: {
			return state
		}
	}
}
