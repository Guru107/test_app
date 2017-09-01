import universal from "react-universal-component"

const TopRatingListing = universal(import("./TopRatingListing"))
if (__SERVER__) {
	TopRatingListing.preload()
}
export default TopRatingListing
