import { h } from "preact"
import { LayoutHeader, LayoutHeaderRow, LayoutTitle } from "preact-mdl"
import NavBar from "./NavBar"

function Header() {
	return (
		<LayoutHeader>
			<LayoutHeaderRow>
				<LayoutTitle>
					{"tMDB"}
				</LayoutTitle>
			</LayoutHeaderRow>
			<NavBar />
		</LayoutHeader>
	)
}

export default Header
