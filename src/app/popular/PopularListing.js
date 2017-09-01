import { h, Component } from "preact"
import { LayoutTabPanel } from "preact-mdl"
import PropTypes from "prop-types"
import { connect } from "preact-redux"
import { getMovies, requestTypes } from "api/ActionCreator"
import MovieCard from "card/MovieCard"
class PopularListing extends Component {
	componentDidMount() {
		this.props.dispatch(getMovies(requestTypes.POPULAR))
	}

	render(props) {
		return (
			<LayoutTabPanel
				class={props.url == "/popular" ? "is-active" : ""}
				id="/popular"
			>
				{props.popular.map(movie => {
					return <MovieCard key={movie.id} movie={movie} />
				})}
			</LayoutTabPanel>
		)
	}
}

PopularListing.propTypes = {
	url: PropTypes.string.isRequired
}

function mapStateToProps(state) {
	return {
		popular: state.moviesReducer.popular
	}
}

export default connect(mapStateToProps)(PopularListing)
