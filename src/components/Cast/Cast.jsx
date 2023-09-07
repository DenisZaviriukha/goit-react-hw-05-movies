import { getMovieCredits } from "api"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Cast = () => {

    const { movieId } = useParams();

    const [cast, setCast] = useState([])
    
    useEffect(() => {
        const fetchCast = async () => {
            try {
                const details = await getMovieCredits(movieId);
                setCast(details.cast);
                
            } catch (error) {
                console.error('Error:', error);
                console.log('cringe')
            }
        };
    fetchCast();
    }, [movieId]);
    
    return (
        <div>
            {cast ? (
                <ul>
                    {cast.map(character => {
                        return (
                            <li key={character.credit_id}>
                                {character.profile_path !== null ? <img
                                    src={`https://image.tmdb.org/t/p/w500${character.profile_path}`}
                                    alt={character.name}
                                    width={'200px'}
                                /> : <p>"No photo"</p>}
                                <p>{character.name}</p>
                                <p>Play: {character.character}</p>
                            </li>
                        )
                    })}
                </ul>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export default Cast