import { h } from "preact"
import { Button } from "preact-mdl"

function TestComponent() {
	return (
		<div>
			<Button primary raised>
				{"I am button!"}
			</Button>
		</div>
	)
}

export default TestComponent
