import { Routes, Route, NavLink } from "react-router-dom";
import { lazy, useEffect, useState } from "react";
import { getTrendingMovies } from "../api";

// import Home from "./Home/Home/Home";
// import Movies from "./Movies/Movies"
// import NotFound from "./NotFound/NotFound";
// import MovieDetails from "./MovieDetails/MovieDetails";
// import Cast from "./Cast/Cast";
// import Review from "./Review/Review";
// import Layout from "./Layout/Layout";

const Layout = lazy(() => import('../components/Layout/Layout'))
const Home = lazy(() => import('../components/Home/Home'))
const Movies = lazy(() => import('../components/Movies/Movies'))
const NotFound = lazy(() => import('../components/NotFound/NotFound'))
const MovieDetails = lazy(() => import('../components/MovieDetails/MovieDetails'))
const Cast = lazy(() => import('../components/Cast/Cast'))
const Review = lazy(() => import('../components/Review/Review'))

export const App = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const movies = await getTrendingMovies();
        setTrendingMovies(movies);
        
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchTrendingMovies();
  }, []);


  return (
    <>
      <Routes> 
        <Route path="/" element={<Layout />} >
          <Route index element={<Home films={trendingMovies} />} />
          <Route exact path="movies" element={<Movies />} />
          <Route path="movies/:movieId" element={<MovieDetails />} >
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Review />} />
          </Route>
        <Route path="*" element={<NotFound />} /> 
        </Route>
      </Routes>
    </>
  );
};

