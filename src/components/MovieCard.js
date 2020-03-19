import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';

export default function MovieCard(props) {
    //find values using map and prepare for output
    let htmlMovie = props.movieList.map((movie) => {
        return (
            <Card className="bg-dark text-white col-md-4">
                <Card.Img src={`https://image.tmdb.org/t/p/w1280/${movie.poster_path}`} alt="Card image" />
                <Card.ImgOverlay>
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>{movie.overview}</Card.Text>
                    <Card.Text>Released: {movie.release_date}</Card.Text>
                    <Card.Text>Rating: {}</Card.Text>
                </Card.ImgOverlay>
            </Card>

        )
    })

    return (
        <div className="row">
            {htmlMovie}
        </div>
    )
}
