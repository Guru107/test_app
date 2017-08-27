import { h } from "preact"
import { LayoutTabPanel } from "preact-mdl"
import PropTypes from "prop-types"

function NowShowing(props) {
	return (
		<LayoutTabPanel class={props.url == "/" ? "is-active" : ""} id="/">
			{`Data /`}
		</LayoutTabPanel>
	)
}

NowShowing.propTypes = {
	url: PropTypes.string.isRequired
}
export default NowShowing
