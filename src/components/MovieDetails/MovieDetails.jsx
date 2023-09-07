import { getMovieDetails } from "api"
import { Link, Outlet, useLocation, useParams} from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import { useRef } from "react";


const MovieDetails = () => {

    const { movieId } = useParams();
    const [movieDetails, setMovieDetails] = useState(null);
    const location = useLocation();
    const backLink = useRef(location.state?.from ?? '/')
  
    useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const details = await getMovieDetails(movieId);
        setMovieDetails(details);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
    fetchMovieDetails();
  }, [movieId]);

    return (
        <div>
            {movieDetails ? (
                <>
                    <Link to={backLink.current}>Go back</Link>
                    <h2>{movieDetails.title}</h2>
                    {movieDetails.poster_path && (
                        <img
                        src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                        alt={movieDetails.title}
                        width={'200px'}        
                        />
                    )}
                    <p>Overview: {movieDetails.overview}</p>
                    <p>Vote Average: {movieDetails.vote_average}</p>
                    <ul>Genres: {movieDetails.genres.map(genre => { return <li key={genre.id}>{genre.name}</li>})}</ul>
                    <p>Additional information</p>
                    <ul>
                        <li><Link to={`/movies/${movieId}/cast`}>Cast</Link></li>   
                        <li><Link to={`/movies/${movieId}/reviews`}>Reviews</Link></li>
                    </ul>
                    <Suspense fallback={<div>Loading...</div>}>
                      <Outlet />
                    </Suspense> 
                    
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export default MovieDetails