import React, { useEffect, useState } from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'
import logo from './jurgisLogo.png';
import bgimage from './dp.jpg'
import MovieCard from './components/MovieCard.js';
import Spinner from 'react-bootstrap/Spinner'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Jumbotron, Button, Navbar, Nav, NavDropdown, FormControl, } from "react-bootstrap";
import ReactModal from 'react-modal'
let apikey = process.env.REACT_APP_JURGIS;
let keyword = '';
let page = 1;
let movieList = [];

function App() {
  let [movies, setMovies] = useState(null);
  const [genres, setGenres] = useState([]);
  let [modal, SetModal] = useState(false);
  let [rate, setRate] = useState(0);

  let popularMovies = async () => {
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}&language=en-US&page=${page}`;
    //here we get an array of 20 movies
    let fetchedData = await fetch(url);
    let data = await fetchedData.json();
    movieList = movieList.concat(data.results);

    movieList.map(movie => {
      movie.genres = movie.genre_ids.map(genre => genres.find(el => el.id === genre))
    })
    setMovies(movieList)
  }
  let loadMore = () => {
    page++;
    popularMovies()
    setMovies(movieList);
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

  //Input range slider

  let searchByRate = (value) => {
    let rounded = Math.round(value * 10) / 10
    
    console.log("value", rounded)
    setRate(value)

    let filteredData = movieList.filter((movie) => movie.vote_average >= value);
    setMovies(filteredData);
  }

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

  const openModal = () => {
    SetModal(true)
  }

  return (
    //order of elements on the main page
    <div id="main" >
      <Jumbotron style={{ backgroundImage: `url(${bgimage})`, backgroundSize: 'cover' }}>
      </Jumbotron>
      <Navbar sticky="top" id="nav" bg="dark" variant="dark" expand="sm" navbar-default>
        <img src={logo} width="100px" className="d-inline-block align-top" />
        <FormControl id="searchBox" style={{ maxWidth: "30%" }} Ztype="text" placeholder="Search for movies | serials | actors..." className="mr-sm-2" onChange={(e) => searchByKeyword(e)} />
        <InputRange
          maxValue={10}
          step={0.1}
          minValue={0}
          value={rate}
          onChange={value => searchByRate(value)} />

          {/* step={2}
  value={this.state.value}
  onChange={value => this.setState({ value })} /> */}

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
        <div style={{ display: "flex" }}>
          <Button className="pageNav minus" > - </Button>
          <Button className="pageNav plus" onClick={() => loadMore()}> + </Button>
        </div>
      </div>
      {/* <Movie/> */}


      <ReactModal isOpen={modal}
        style={{ overlay: {}, contents: {} }}
        onRequestClose={() => SetModal(false)} />
    </div >
  );
}
export default App;