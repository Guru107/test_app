import {
	REQUESTING,
	RECEIVE_TOP_RATED,
	RECEIVE_NOW_SHOWING,
	RECEIVE_POPULAR,
	API_FAILURE
} from "./ActionTypes"

export function moviesReducer(
	state = {
		topRated: {},
		nowShowing: {},
		popular: {},
		isFetching: false,
		success: false,
		error: false
	},
	action
) {
	switch (action.type) {
		case REQUESTING: {
			return Object.assign({}, state, {
				isFetching: true
			})
		}

		case RECEIVE_NOW_SHOWING: {
			return Object.assign({}, state, {
				isFetching: false,
				nowShowing: action.data
			})
		}

		case RECEIVE_POPULAR: {
			return Object.assign({}, state, {
				isFetching: false,
				popular: action.data
			})
		}

		case RECEIVE_TOP_RATED: {
			return Object.assign({}, state, {
				isFetching: false,
				topRated: action.data
			})
		}

		case API_FAILURE: {
			return Object.assign({}, state, {
				isFetching: false
			})
		}
	}
}
