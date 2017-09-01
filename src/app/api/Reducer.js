import { REQUESTING, RECEIVE_TOP_RATED, RECEIVE_NOW_SHOWING, RECEIVE_POPULAR } from './ActionTypes'

export function moviesReducer(state = {
    topRated : [],
    nowShowing : [],
    popular : []
}, action) {

    switch(action.type) {

        case REQUESTING : 
            break

        case RECEIVE_NOW_SHOWING :
            break

        case RECEIVE_POPULAR :
            break

        case RECEIVE_TOP_RATED : 
            break
    }

}