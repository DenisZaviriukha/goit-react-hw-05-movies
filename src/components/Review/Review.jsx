import { getMovieReviews } from "api"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Review = () => {

    const { movieId } = useParams();

    const [reviews, setReviews] = useState('')
    
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const details = await getMovieReviews(movieId);
                setReviews(details.results);
            } catch (error) {
                console.error('Error:', error);
            }
        };
    fetchReviews();
    }, [movieId]);
    
    const renderOfReviews = () => { 
        if (reviews === '') {
            return
        }
        if (reviews.length === 0) {
            return (<div>No reviews yet</div>)
        }
        else { 
            return (
                <ul>
                    {reviews.map(rewiev => {
                        return (
                        <li key={rewiev.id}>
                            <p>Author: {rewiev.author}</p>
                            <p>{rewiev.content}</p>
                        </li>
                        );
                    })}
                </ul>
            )
        }
    }

    return (
        <div>
            {renderOfReviews()}
        </div>
    )
}

export default Review