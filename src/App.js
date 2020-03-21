import React, {useEffect, useState} from 'react';
// import logo from './logo.svg';
import './App.css';
import MovieCard from './components/MovieCard.js';
import Spinner from 'react-bootstrap/Spinner'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Nav, NavDropdown, Form, FormControl,} from "react-bootstrap";
let apikey = process.env.REACT_APP_JURGIS;
let keyword = '';
let movieList =[];

function App() {
  
  let[movies,setMovies] = useState(null);
  const [genres, setGenres] = useState([]);

  let popularMovies = async () => {
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}&language=en-US&page=$1`;
    //here we get an array of 20 movies
    let fetchedData = await fetch(url);
    let data = await fetchedData.json(); 

    movieList = data.results; 

    movieList.map(movie =>{
      movie.genres = movie.genre_ids.map(genre =>genres.find(el=>el.id === genre))
    })
    // console.log("this is what it is", movieList);
    //original movieList
    console.log("new movieLiast", movieList)  
    setMovies(movieList)  
  }

  const fetchGenres = async () => {
    let secondUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apikey}&language=en-US`
    let secondData = await fetch(secondUrl);
    let secondResult = await secondData.json();
    setGenres(secondResult.genres) // will change genres value
  }
  useEffect(() => {
    fetchGenres();
  }, []); // run once after mounted , mounted is different from re-rendered


  useEffect(()=>{
    popularMovies();
  }, [genres]);

  console.log(movies)

  if (movies == null){
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    )
  }
  //Search function for search input
  let searchByKeyword = (e) => { 
    keyword = e.target.value;
    if(keyword === ''){
      setMovies(movieList)
    } else {
      setMovies(movieList.filter((movie)=>movie.title.toLowerCase().includes(keyword.toLowerCase())));
    }
    // console.log(Object.values(genre_ids)); 
  }
  
  //Filter Movies by Genre
  let filteredMovies = (g) => {
    if (g === null) {
      setMovies(movieList)
    } else {
      setMovies(movieList.filter((movie) => movie.genre_ids.includes(g)));
    }
  }

  let sortByPopularity = () => {
    let sortedMovie = [...movies].sort((a, b) => b.popularity - a.popularity);
    setMovies(sortedMovie);
  };

  let sortByLeastPopularity = () => {
    let sortedLeastMovie = [...movies].sort((a, b) => a.popularity - b.popularity);
    setMovies(sortedLeastMovie);
  };

  let sortByHighestRating = () => {
    let sortedHighestRating = [...movies].sort((a, b) => b.vote_average - a.vote_average);
    setMovies(sortedHighestRating);
  };
  

  return (
    //order of elements on the main page
    <div>
      <Navbar bg="dark" variant="dark" >
        <Navbar.Brand href="#home">Movies!</Navbar.Brand>
        <Nav className="mr-auto">
          <NavDropdown title="Filter" id="basic-nav-dropdown">
            <NavDropdown.Item onClick={() => filteredMovies(28)} href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item onClick={() => filteredMovies(12)} href="#action/3.2">Adventure</NavDropdown.Item>
            <NavDropdown.Item onClick={() => filteredMovies(35)} href="#action/3.1">Comedy</NavDropdown.Item>
            <NavDropdown.Item onClick={() => filteredMovies(80)} href="#action/3.2">Crime</NavDropdown.Item>
            <NavDropdown.Item onClick={() => filteredMovies(99)} href="#action/3.3">Documentary</NavDropdown.Item>
            <NavDropdown.Item onClick={() => filteredMovies(18)} href="#action/3.2">Drama</NavDropdown.Item>
            <NavDropdown.Item onClick={() => filteredMovies(36)} href="#action/3.2">Fantasy</NavDropdown.Item>
            <NavDropdown.Item onClick={() => filteredMovies(36)} href="#action/3.2">History</NavDropdown.Item>
            <NavDropdown.Item onClick={() => filteredMovies(27)} href="#action/3.2">Horror</NavDropdown.Item>
            <NavDropdown.Item onClick={() => filteredMovies(10749)} href="#action/3.2">Romance</NavDropdown.Item>
            <NavDropdown.Item onClick={() => filteredMovies(878)} href="#action/3.2">Science Fiction</NavDropdown.Item>
            <NavDropdown.Item onClick={() => filteredMovies(53)} href="#action/3.2">Thriller</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Favorites</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange= {(e)=>searchByKeyword(e)}/>
          <Button onClick={()=>searchByKeyword()} variant="outline-info">Search</Button>
          <Button onClick={() => sortByPopularity()} variant="outline-success">Most Popular</Button>
          <Button onClick={() => sortByLeastPopularity()} variant="outline-success">Least Popular</Button>
          <Button onClick={() => sortByHighestRating()} variant="outline-success">Top Rated</Button>
        </Form> 
      </Navbar >
      <MovieCard fetchedMovies = {movies}/>
      <Button variant="outline-danger">More</Button>
    </div>
  );
}

export default App;
