import React, {useEffect, useState} from 'react';
// import logo from './logo.svg';
import './App.css';
import MovieCard from './components/MovieCard.js';
import Spinner from 'react-bootstrap/Spinner'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Nav, NavDropdown, Form, FormControl,} from "react-bootstrap";
let apikey = process.env.REACT_APP_JURGIS;
// let page = 1;
let keyword = '';
let movieList =[];

function App() {
  //State
  let[movies,setMovies] = useState()
  let popularMovies = async () => {
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}&language=en-US&page=$1`;
    //here we get an array of 20 movies
    let fetchedData = await fetch(url);
    let data = await fetchedData.json(); 
    console.log ("This is movieList", data);
    movieList = data.results; 
    
    //original movieList
    setMovies(movieList)     
  }

  //useEffect executes after the render
  useEffect(popularMovies,[]);

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
  }
  

  return (
    //order of elements on the main page
    <div>
      <Navbar bg="dark" variant="dark" >
        <Navbar.Brand href="#home">Movies!</Navbar.Brand>
        <Nav className="mr-auto">
          <NavDropdown title="Categories" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Comedies</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Documentaries</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Favorites</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange= {(e)=>searchByKeyword(e)}/>
          <Button onClick={()=>searchByKeyword()} variant="outline-info">Search</Button>
        </Form> 
      </Navbar >
      <MovieCard fetchedMovies = {movies}/>
      <Button variant="outline-danger">More</Button>
    </div>
  );
}

export default App;
