import { h, Component } from "preact"
import { LayoutTabPanel } from "preact-mdl"
import PropTypes from "prop-types"
import { connect } from "preact-redux"
import { getMovies, requestTypes } from "api/ActionCreator"

class NowShowing extends Component {

	componentDidMount() {
		this.props.dispatch(getMovies(requestTypes.NOW_SHOWING))
	}

	render(props) {

		return (
			<LayoutTabPanel class={props.url == "/" ? "is-active" : ""} id="/">
				{`Data /`}
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
