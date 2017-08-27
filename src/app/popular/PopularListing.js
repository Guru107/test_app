import { h } from "preact"
import { LayoutTabPanel } from "preact-mdl"
import PropTypes from "prop-types"

function PopularListing(props) {
	return (
		<LayoutTabPanel
			class={props.url == "/popular" ? "is-active" : ""}
			id="/popular"
		>
			{`Data /popular`}
		</LayoutTabPanel>
	)
}

PopularListing.propTypes = {
	url: PropTypes.string.isRequired
}
export default PopularListing
