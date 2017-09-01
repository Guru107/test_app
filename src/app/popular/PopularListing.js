import { h, Component } from "preact"
import { LayoutTabPanel } from "preact-mdl"
import PropTypes from "prop-types"
import { connect } from "preact-redux"
import { getMovies, requestTypes } from 'api/ActionCreator'

class PopularListing extends Component {

	componentDidMount() {

		this.props.dispatch(getMovies(requestTypes.POPULAR))

	}

	render() {
		
		return (
			<LayoutTabPanel
				class={props.url == "/popular" ? "is-active" : ""}
				id="/popular"
			>
				{ this.props.popular }
			</LayoutTabPanel>
		)
	}

	
}

PopularListing.propTypes = {
	url: PropTypes.string.isRequired
}

function mapStateToProps(state) {
	
	return {

		popular : state.moviesReducer.popular
	}
}

export default connect(mapStateToProps)(PopularListing)
