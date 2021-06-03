import {Switch, Route} from "react-router-dom";
// import '.src/App.css';
import Signup from "./Signup";
import Login from "./Login";
import Header from "./Header";
import MovieHome from "./MovieHome";
import { useEffect, useState } from "react";
import MovieList from "./MovieList";
import MovieMainPage from "./MovieMainPage";


function App() {

  const [categories, setCategories] = useState([])
  const [movies, setMovies] = useState([])
  // const [selectedMovie, setSelectedMovie] = useState({})


  useEffect(() => {
    fetch("http://localhost:3000/categories")
    .then(r => r.json())
    .then(categoryData => {
      setCategories(categoryData)
      let movieGroupings = categoryData.map(( category) => category.movies)
      let allMovies = movieGroupings.flat()
      setMovies(allMovies)}
      )
      
  }, [])

  // function setClickedMovie(id){
  //   const movieOnPage = movies.find((movie) => movie.id == id)
  //   setSelectedMovie(movieOnPage)
  // }


  return (
    <div>
      <Header/>
      <Switch>
        <Route exact path="/">
          <Signup/>
        </Route>
        <Route exact path="/login">
          <Login/>
        </Route>
        <Route exact path="/home">
          <MovieHome categories={categories}/>
        </Route>
        <Route exact path="/categories/:id">
          {categories.length === 0 ? null : <MovieList categories={categories}/>}
        </Route>
        <Route exact path="/movies/:id">
          {movies.length ===0 ? null: <MovieMainPage movies = {movies}/>}
        </Route>
      </Switch>
      
    </div>
  );
}

export default App;
