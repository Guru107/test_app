import { h, Component } from "preact"
import { LayoutTabPanel } from "preact-mdl"
import PropTypes from "prop-types"
import { connect } from "preact-redux"
import { getMovies, requestTypes } from "api/ActionCreator"

class TopRatingListing extends Component {

	componentDidMount() {
		this.props.dispatch(getMovies(requestTypes.TOP_RATED))
	}

	render(props) {

		return (
			<LayoutTabPanel
				class={props.url == "/top-rated" ? "is-active" : ""}
				id="/top-rated"
			>
				{`Data /top-rated`}
			</LayoutTabPanel>
		)

	}

}

function mapStateToProps(state) {
	return {
		topRated: state.moviesReducer.topRated
	}
}

TopRatingListing.propTypes = {
	url: PropTypes.string.isRequired
}

export default connect(mapStateToProps)(TopRatingListing)
