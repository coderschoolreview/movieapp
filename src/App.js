import React, {useEffect, useState} from 'react';
// import logo from './logo.svg';
import './App.css';
import MovieCard from './components/MovieCard.js';
import Spinner from 'react-bootstrap/Spinner'
let apikey = process.env.REACT_APP_JURGIS;

function App() {

  let[movies,setMovies] = useState(null);
  let nowPlaying = async () => {
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}&language=en-US&page=1`;
    let data = await fetch(url);
    let dataResult = await data.json();
    console.log ("data", dataResult);

    setMovies(dataResult.results)
    
  }

  //useEffect executes after the render
  useEffect(nowPlaying,[]);
  if (movies == null){
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    )
  }
  
  return (
    //nowPlaying movies main section
    <div>
      <MovieCard movieList = {movies}/>
    </div>
  );
}

export default App;
