import { h } from "preact"
import { Layout, LayoutContent, Progress } from "preact-mdl"
import { Router } from "preact-router"
import Header from "header/Header"
import NowShowing from "now-showing/index"
import PopularListing from "popular/index"
import TopRatingListing from "top-rated/index"
import styles from "./index.less"
import PropTypes from "prop-types"
//eslint-disable-next-line react/prop-types
function App({ url, history }) {
	return (
		<Layout fixed-header fixed-tabs>
			<Header />
			<Progress class={styles["progress-bar"]} indeterminate />
			<LayoutContent>
				<Router history={history} url={url}>
					<NowShowing path="/" />
					<PopularListing path="/popular" />
					<TopRatingListing path="/top-rated" />
				</Router>
			</LayoutContent>
		</Layout>
	)
}
App.propTypes = {
	url: PropTypes.string.isRequired
}
export default App
