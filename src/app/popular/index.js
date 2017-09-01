import universal from "react-universal-component"
const PopularListing = universal(import("./PopularListing"))

if (__SERVER__) {
	PopularListing.preload()
}
export default PopularListing
