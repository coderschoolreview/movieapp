import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import logo from './jurgisLogo.png';
import './App.css';
import MovieCard from './components/MovieCard.js';
import Spinner from 'react-bootstrap/Spinner'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Nav, NavDropdown, Form, FormControl, } from "react-bootstrap";
let apikey = process.env.REACT_APP_JURGIS;
let keyword = '';
let page = 1;
let movieList = [];
let data;

function App() {
  let [movies, setMovies] = useState(null);
  const [genres, setGenres] = useState([]);

  let popularMovies = async () => {
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}&language=en-US&page=${page}`;
    //here we get an array of 20 movies
    let fetchedData = await fetch(url);
    let data = await fetchedData.json();
    movieList = data.results;

    movieList.map(movie => {
      movie.genres = movie.genre_ids.map(genre => genres.find(el => el.id === genre))
    })
    setMovies(movieList)
  }
  let loadMore = () => {
    page++;
    popularMovies()
  };

  const fetchGenres = async () => {
    let secondUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apikey}&language=en-US`
    let secondData = await fetch(secondUrl);
    let secondResult = await secondData.json();
    setGenres(secondResult.genres) // will change genres value
  }
  useEffect(() => {
    fetchGenres();
  }, []); // run once after mounted , mounted is different from re-rendered

  useEffect(() => {
    popularMovies();
  }, [genres]);

  console.log(movies)
  // Loading message
  if (movies == null) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    )
  }
  //Navbar: Search input
  let searchByKeyword = (e) => {
    keyword = e.target.value;
    if (keyword === '') {
      setMovies(movieList)
    } else {
      setMovies(movieList.filter((movie) => movie.title.toLowerCase().includes(keyword.toLowerCase())));
    }
  }
  //Navbar: Filter Movies by Genre
  let filteredMovies = (g) => {
    if (g === null) {
      setMovies(movieList)
    } else {
      setMovies(movieList.filter((movie) => movie.genre_ids.includes(g)));
    }
  }
  //Navbar: Sort by
  let sortByPopularity = () => {
    let sortedMovie = [...movies].sort((a, b) => b.popularity - a.popularity);
    setMovies(sortedMovie);
  };
  let sortByHighestRating = () => {
    let sortedHighestRating = [...movies].sort((a, b) => b.vote_average - a.vote_average);
    setMovies(sortedHighestRating);
  };

  return (
    //order of elements on the main page
    <div id="main">
      <Navbar id="nav" bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#home">
          <img src={logo} width="100px" height="100px" className="d-inline-block align-top" />
        </Navbar.Brand>
        <FormControl style={{ width: "200px" }} Ztype="text" placeholder="Search" className="mr-sm-2" onChange={(e) => searchByKeyword(e)} />
        <Nav className="mr-auto">
          <NavDropdown title="Genre" id="basic-nav-dropdown dropdwn">
            <NavDropdown.Item className="text-info" onClick={() => filteredMovies(28)} href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item className="text-info" onClick={() => filteredMovies(12)} href="#action/3.2">Adventure</NavDropdown.Item>
            <NavDropdown.Item className="text-info" onClick={() => filteredMovies(35)} href="#action/3.1">Comedy</NavDropdown.Item>
            <NavDropdown.Item className="text-info" onClick={() => filteredMovies(80)} href="#action/3.2">Crime</NavDropdown.Item>
            <NavDropdown.Item className="text-info" onClick={() => filteredMovies(99)} href="#action/3.3">Documentary</NavDropdown.Item>
            <NavDropdown.Item className="text-info" onClick={() => filteredMovies(18)} href="#action/3.2">Drama</NavDropdown.Item>
            <NavDropdown.Item className="text-info" onClick={() => filteredMovies(36)} href="#action/3.2">Fantasy</NavDropdown.Item>
            <NavDropdown.Item className="text-info" onClick={() => filteredMovies(36)} href="#action/3.2">History</NavDropdown.Item>
            <NavDropdown.Item className="text-info" onClick={() => filteredMovies(27)} href="#action/3.2">Horror</NavDropdown.Item>
            <NavDropdown.Item className="text-info" onClick={() => filteredMovies(10749)} href="#action/3.2">Romance</NavDropdown.Item>
            <NavDropdown.Item className="text-info" onClick={() => filteredMovies(878)} href="#action/3.2">Science Fiction</NavDropdown.Item>
            <NavDropdown.Item className="text-info" onClick={() => filteredMovies(53)} href="#action/3.2">Thriller</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Sort by" id="basic-nav-dropdown dropdwn">
            <NavDropdown.Item onClick={() => sortByPopularity()} href="#action/3.1">Most popular</NavDropdown.Item>
            <NavDropdown.Item onClick={() => sortByHighestRating()} href="#action/3.2">Top rated</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar >

      <div>
        <MovieCard fetchedMovies={movies} />
        <Button onClick={() => loadMore()} variant="outline-danger">More</Button>
      </div>
    </div>
  );
}
export default App;