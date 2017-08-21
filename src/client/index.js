import { render } from "preact"
import AppContainer from "react-hot-loader/lib/AppContainer"
import TestComponent from "../app/TestComponent"

const renderFunc = App =>
	render(
		<AppContainer>
			<App />
		</AppContainer>,
		document.body
	)

if (__DEV__ && module.hot) {
	module.hot.accept("../app/TestComponent", () => {
		const TestComponent = require("../app/TestComponent").default
		render(TestComponent)
	})
}

renderFunc(TestComponent)
