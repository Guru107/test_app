//eslint-disable-next-line no-unused-vars
import axios from "axios"
import { TMDB_API_KEY } from "secret_key"

export default function(url) {
	//eslint-disable-next-line no-unused-vars
	return new Promise(function(resolve, reject) {
		let URL = "",
			preloadedState = {
				moviesReducer: {
					topRated: [],
					nowShowing: [],
					popular: []
				}
			}
		switch (url) {
			case "/": {
				URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-IN&page=1`

				return axios.get(URL).then(
					response => {
						preloadedState.moviesReducer = Object.assign(
							preloadedState.moviesReducer,
							{
								nowShowing: response.data.results
							}
						)

						resolve(preloadedState)
					},
					err => {
						reject(err)
					}
				)
			}
			case "/popular": {
				URL = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-IN&page=1`

				return axios.get(URL).then(
					response => {
						preloadedState.moviesReducer = Object.assign(
							preloadedState.moviesReducer,
							{
								popular: response.data.results
							}
						)
						resolve(preloadedState)
					},
					err => {
						reject(err)
					}
				)
			}

			case "/top-rated": {
				URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${TMDB_API_KEY}&language=en-IN&page=1`

				return axios.get(URL).then(
					response => {
						preloadedState.moviesReducer = Object.assign(
							preloadedState.moviesReducer,
							{
								topRated: response.data.results
							}
						)
						resolve(preloadedState)
					},
					err => {
						reject(err)
					}
				)
			}
			default: {
				URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-IN&page=1`

				return axios.get(URL).then(
					response => {
						preloadedState.moviesReducer = Object.assign(
							preloadedState.moviesReducer,
							{
								nowShowing: response.data.results
							}
						)

						resolve(preloadedState)
					},
					err => {
						reject(err)
					}
				)
			}
		}
	})
}
