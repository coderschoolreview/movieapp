// import React, { useEffect, useState } from 'react';
// // import logo from './logo.svg';
// import './App.css';
// import MovieCard from './components/MovieCard.js';
// import Spinner from 'react-bootstrap/Spinner'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button, Navbar, Nav, NavDropdown, Form, FormControl, } from "react-bootstrap";
// let apikey = process.env.REACT_APP_JURGIS;


let genreId = movieList.filter(function(number){
    return number === genreId;
})

let filteredMovies = (g) =>{
    let genreId = g.value;
    if (genreId === null){
        setMovies(movieList)
    } else {
        setMovies(movieList.map((movie) => movie.genre_ids === genreId)

    }
}


// <NavDropdown title="Categories" id="basic-nav-dropdown">
//     <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
//     <NavDropdown.Item href="#action/3.2">Adventure</NavDropdown.Item>
//     <NavDropdown.Item href="#action/3.3">Animation</NavDropdown.Item>
//     <NavDropdown.Divider />
//     <NavDropdown.Item href="#action/3.4">Favorites</NavDropdown.Item>
// </NavDropdown>

// // Print out an array of the inventors whose name contains 'n'.
// letterN = inventors.filter((nameN) => nameN.includes('n'))
// console.log("Names that contain n:", letterN)



let selectGenre = () =>{
    let genreSelected = movie.genres.map(genre)
    
    movieList.map (movie => {movie.genres = movie.genre_ids.map(genre => genres.find(el => el.id === genre))})
    
} 
        let searchByKeyword = (e) => {
            keyword = e.target.value;
            if (keyword === '') {
                setMovies(movieList)
            } else {
                setMovies(movieList.filter((movie) => movie.title.toLowerCase().includes(keyword.toLowerCase())));
            }
        }
// {
    "genres": [
        {
            "id": 28,
            "name": "Action"
        },
        {
            "id": 12,
            "name": "Adventure"
        },
        {
            "id": 16,
            "name": "Animation"
        },
        {
            "id": 35,
            "name": "Comedy"
        },
        {
            "id": 80,
            "name": "Crime"
        },
        {
            "id": 99,
            "name": "Documentary"
        },
        {
            "id": 18,
            "name": "Drama"
        },
        {
            "id": 10751,
            "name": "Family"
        },
        {
            "id": 14,
            "name": "Fantasy"
        },
        {
            "id": 36,
            "name": "History"
        },
        {
            "id": 27,
            "name": "Horror"
        },
        {
            "id": 9648,
            "name": "Mystery"
        },
        {
            "id": 10749,
            "name": "Romance"
        },
        {
            "id": 878,
            "name": "Science Fiction"
        },
        {
            "id": 53,
            "name": "Thriller"
        },
    ]
}