import { h } from "preact"
import { LayoutTabBar } from "preact-mdl"
import NavItem from "./NavItem"
function NavBar() {
	return (
		<LayoutTabBar>
			<NavItem text="Now Showing" to="/" />
			<NavItem text="Popular" to="/popular" />
			<NavItem text="Top Rated" to="/top-rated" />
		</LayoutTabBar>
	)
}

export default NavBar
