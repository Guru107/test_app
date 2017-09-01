import universal from "react-universal-component"
const NowShowing = universal(import("./NowShowing"))
if (__SERVER__) {
	NowShowing.preload()
}
export default NowShowing
