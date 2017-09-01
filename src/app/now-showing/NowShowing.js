import { h, Component } from "preact"
import { LayoutTabPanel } from "preact-mdl"
import PropTypes from "prop-types"
import { connect } from "preact-redux"
import { getMovies, requestTypes } from "api/ActionCreator"
import MovieCard from "card/MovieCard"
class NowShowing extends Component {
	componentDidMount() {
		this.props.dispatch(getMovies(requestTypes.NOW_SHOWING))
	}

	render(props) {
		return (
			<LayoutTabPanel class={props.url == "/" ? "is-active" : ""} id="/">
				{props.nowShowing.map(movie => {
					return <MovieCard key={movie.id} movie={movie} />
				})}
			</LayoutTabPanel>
		)
	}
}

function mapStateToProps(state) {
	return {
		nowShowing: state.moviesReducer.nowShowing
	}
}

NowShowing.propTypes = {
	url: PropTypes.string.isRequired
}

export default connect(mapStateToProps)(NowShowing)
