import { h } from "preact"
import {
	Card,
	CardTitle,
	CardText,
	CardTitleText,
	CardActions
} from "preact-mdl"
import card from "./movie-card.less"

function MovieCard({ movie }) {
	return (
		<Card class={card["movie-card"]} shadow={2}>
			<CardTitle
				class={card["title-wrapper"]}
				style={{
					background: `url(//image.tmdb.org/t/p/w500_and_h281_bestv2${movie.backdrop_path})`
				}}
			>
				<CardTitleText>{movie.title}</CardTitleText>
			</CardTitle>
			<CardText>{movie.overview}</CardText>
			<CardActions class="mdl-card--border" />
		</Card>
	)
}

export default MovieCard
