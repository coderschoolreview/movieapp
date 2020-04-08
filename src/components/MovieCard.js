import React from 'react'
import moment from 'moment'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Card, ListGroupItem, ListGroup } from "react-bootstrap";

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
        let releaseDate = moment(movie.release_date).format("MMM YYYY");
        //limit the description text lenght
        let descriptionLength = (movie.overview.split('.')[0] + ".");
        
        return (
            <div className="col-md-3">
            <Card id="movieC"  >
                <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w1280/${movie.poster_path}`} />
                <Card.Body id="cardBody" >
                    <Card.Title style={{fontSize:"1.5rem"}}>{movie.title}</Card.Title>
                </Card.Body>
                    <Card.Text style={{margin:"0"}} id="descriptionBox">{descriptionLength}</Card.Text>
                <ListGroup className="list-group-flush" >
                    <ListGroupItem>Genre: {renderGenres(movie.genres)}</ListGroupItem>
                    <div style={{display:"flex" , justifyContent:"space-between"}}>
                    <ListGroupItem >{releaseDate}</ListGroupItem>
                    <ListGroupItem >Rating: {movie.vote_average}</ListGroupItem>
                    </div>
                </ListGroup>
                  <Card.Link style={{ display: "flex", justifyContent: "center" }} href="#" onClick={()=>props.openModal(movie.id)}>Trailer</Card.Link>
            </Card>
            </div>

        )
    });

    return (
        <div className="row">
            {htmlPopularMovies}
        </div>
    )
}