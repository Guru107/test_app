import * as actions from "./Actions"
import axios from "axios"
import { TMDB_API_KEY } from "secret_key"

export const requestTypes = {
	POPULAR: "POPULAR",
	NOW_SHOWING: "NOW_SHOWING",
	TOP_RATED: "TOP_RATED"
}

const apiMap = {
	NOW_SHOWING: {
		url: `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-IN&page=1`,
		successAction: actions.receivedNowShowing,
		key : 'nowShowing'
	},

	TOP_RATED: {
		url: `https://api.themoviedb.org/3/movie/top_rated?api_key=${TMDB_API_KEY}&language=en-IN&page=1`,
		successAction: actions.receivedTopRated,
		key : 'topRated'
	},

	POPULAR: {
		url: `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-IN&page=1`,
		successAction: actions.receivedPopular,
		key : 'popular'
	}
}

export function getMovies(type) {
	return (dispatch, getState) => {
		
		const actionMap = apiMap[type]

		if( getState().moviesReducer[actionMap.key].length > 0 ) {
			return
		}

		dispatch(actions.request())
		axios.get(actionMap.url).then(
			response => {
				return dispatch(actionMap.successAction(response.data))
			},
			error => {
				return dispatch(actions.error(error))
			}
		)
	}
}
