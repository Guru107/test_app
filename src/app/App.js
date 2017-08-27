import { h } from "preact"
import { Layout, LayoutContent, Progress } from "preact-mdl"
import { Router } from "preact-router"
import Header from "header/Header"
import NowShowing from "now-showing"
import PopularListing from "popular"
import TopRatingListing from "top-rated"
import styles from "./index.less"

function App() {
	return (
		<Layout fixed-header fixed-tabs>
			<Header />
			<Progress class={styles["progress-bar"]} indeterminate />
			<LayoutContent>
				<Router>
					<NowShowing path="/" />
					<PopularListing path="/popular" />
					<TopRatingListing path="/top-rated" />
				</Router>
			</LayoutContent>
		</Layout>
	)
}

export default App
