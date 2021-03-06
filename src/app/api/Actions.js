import {
	REQUESTING,
	RECEIVE_TOP_RATED,
	RECEIVE_NOW_SHOWING,
	RECEIVE_POPULAR,
	API_FAILURE
} from "./ActionTypes"

export function request() {
	return {
		type: REQUESTING
	}
}

export function receivedNowShowing(data) {
	return {
		type: RECEIVE_NOW_SHOWING,
		data
	}
}

export function receivedPopular(data) {
	return {
		type: RECEIVE_POPULAR,
		data
	}
}

export function receivedTopRated(data) {
	return {
		type: RECEIVE_TOP_RATED,
		data
	}
}

export function error(error) {
	return {
		type: API_FAILURE,
		error
	}
}
