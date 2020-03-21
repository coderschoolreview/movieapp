import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, ListGroupItem, ListGroup } from "react-bootstrap";
import moment from 'moment'

export default function MovieCard(props) {

    //find values using map and prepare for output
    let htmlPopularMovies = props.fetchedMovies.map((movie) => {

        const renderGenres = genres => {
            if (!genres.some(genres => genres === undefined)) {
                return genres.map(el => <span><a>{el.name}</a>, </span>)
            }
            return ""
        }
        //momentJS to set the time format 
        let releaseDate = moment(movie.release_date).format("MMMM YYYY");
        //limit the description text lenght
        let descriptionLength = (movie.overview.split('.')[0] + ".");

            return (
                <Card className="col-md-3" style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w1280/${movie.poster_path}`} />
                    <Card.Body>
                        <Card.Title>{movie.title}</Card.Title>
                        <Card.Text>{descriptionLength}</Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>Released: {releaseDate}</ListGroupItem>
                        <ListGroupItem>Rating: {movie.vote_average}</ListGroupItem>
                        <ListGroupItem>Genre: {renderGenres(movie.genres)}</ListGroupItem>
                    </ListGroup>
                    <Card.Body>
                        <Card.Link href="#">Card Link</Card.Link>
                        <Card.Link href="#">Another Link</Card.Link>
                    </Card.Body>
                </Card>

            )
        });

    return (
        <div className="row">
            {htmlPopularMovies}
        </div>
    )
}
