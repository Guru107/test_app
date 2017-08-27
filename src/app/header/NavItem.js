import { h } from "preact"
import { Link } from "preact-router/match"
import PropTypes from "prop-types"

function NavItem(props) {
	return (
		<Link
			activeClassName="is-active"
			class="mdl-layout__tab"
			href={props.to}
		>
			{props.text}
		</Link>
	)
}

NavItem.propTypes = {
	text: PropTypes.string.isRequired,
	to: PropTypes.string.isRequired
}
export default NavItem
