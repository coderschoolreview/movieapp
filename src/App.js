import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import logo from './jurgisLogo.png';
import bgimage from './dp.jpg'
import MovieCard from './components/MovieCard.js';
import Spinner from 'react-bootstrap/Spinner'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Pagination, Jumbotron, Container, Button, Navbar, Nav, NavDropdown, Form, FormControl, } from "react-bootstrap";
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
    // FIND OUT HOW TO CONTCAT
    // this.setMovies(movieList.concat(data.results)); 
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
  //Navbar: Search input HI i'M IN :.))don't break my shit :D OK WILL DO you can just watch
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
    <div id="main" >
      <Jumbotron style={{ backgroundImage: `url(${bgimage})`, backgroundSize: 'cover' }}>
        <Container>
          {/* <h1 style={{ color: "white" }}>Search for movies | serials | actors...</h1> */}
          
        </Container>
      </Jumbotron>
      <Navbar sticky="top" id="nav" bg="dark" variant="dark" expand="sm" navbar-default>
        {/* <Navbar.Brand href="#home"> */}
          <img src={logo} onClick=" " width="100px" paddingBottom="-50px" className="d-inline-block align-top" />
        {/* </Navbar.Brand> */}
        <FormControl id="searchBox" style={{ maxWidth: "30%" }} Ztype="text" placeholder="Search for movies | serials | actors..." className="mr-sm-2" onChange={(e) => searchByKeyword(e)} />
        {/* <FormControl style={{ width: "200px" }} Ztype="text" placeholder="Search" className="mr-sm-2" onChange={(e) => searchByKeyword(e)} /> */}
        <Nav className="mr-auto">
          <NavDropdown className="text-info dropdown" style={{ color: "#17a2b8" }} title="Genre" id="basic-nav-dropdown dropdown">
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
          <NavDropdown title="Sort by" className="dropbown" style={{ color: "#17a2b8" }} id="basic-nav-dropdown dropdwn">
            <NavDropdown.Item style={{ color: "#17a2b8" }} onClick={() => sortByPopularity()} href="#action/3.1">Most popular</NavDropdown.Item>
            <NavDropdown.Item style={{ color: "#17a2b8" }} onClick={() => sortByHighestRating()} href="#action/3.2">Top rated</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar >
      <div id="display">
        <MovieCard className="col-md-3" fetchedMovies={movies} />
        <div style={{display:"flex"}}>
          <Button className="pageNav minus" > - </Button>
          <Button className="pageNav plus" onClick={() => loadMore()}> + </Button> 
        </div>
      </div>
    </div>
  );
}
export default App;

{/* <Jumbotron style={{ backgroundImage: url(${ bgimage }), backgroundSize: 'cover' }}> */ }

// <Jumbotron style={{ backgroundImage: url(${ bgimage }), backgroundSize: 'cover' }}>
//   <Container>
//     <h1 class="TextColor">Unlimited movies, TV shows, and more.</h1>
//     <Row>
//       <FormControl fluid type="text" placeholder="Search" className="mr-sm-2 col-md-6" onChange={(e) => { searchByKeyword(e) }} />
//       <Button onClick={() => searchByKeyword()} className="mr-sm-2 col-md-2" variant="danger">Search</Button>
//     </Row>
//   </Container>
// </Jumbotron>