import { h } from "preact"
import { LayoutTabPanel } from "preact-mdl"
import PropTypes from "prop-types"

function TopRatingListing(props) {
	return (
		<LayoutTabPanel
			class={props.url == "/top-rated" ? "is-active" : ""}
			id="/top-rated"
		>
			{`Data /top-rated`}
		</LayoutTabPanel>
	)
}

TopRatingListing.propTypes = {
	url: PropTypes.string.isRequired
}

export default TopRatingListing
