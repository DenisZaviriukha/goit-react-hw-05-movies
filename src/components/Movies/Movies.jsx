import { searchMovies } from "api";
import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";

const Movies = () => {

    const [films, setFilms] = useState([])
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation()

    useEffect(() => {
        setFormSubmitted(true)
        const getFilms = async () => {
            setFilms(await searchMovies(searchParams.get('filmName')))
        }
        if (formSubmitted) { 
            getFilms()
        }
        
    }, [searchParams, formSubmitted])

    const handleSubmit = e => {
        e.preventDefault();

        if (e.target.filmName.value === "") {
            return 
        }

        else { 
            setFormSubmitted(false)
        }

        setSearchParams({ filmName: e.target.filmName.value })

        e.target.filmName.value = ""
        setFormSubmitted(true)
    }

    const renderOfFilms = () => {
        if (films.results !== undefined && films.total_results !== 0 && formSubmitted) {
            return (
                films.results.map(el => { return (<li key={el.id}><Link to={`/movies/${el.id}`} state={{from: location}}>{el.original_title}</Link></li>) })
            )
        }
    }

    return (
        <div>
            <h2>Movie Search</h2>
            <form onSubmit={handleSubmit}>
                <input name="filmName" type="text"/>
                <button type="submit">Search</button>
            </form>
            <ul>
                {renderOfFilms()}
            </ul>
        </div>
    )
}

export default Movies