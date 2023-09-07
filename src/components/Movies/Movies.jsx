import { searchMovies } from "api";
import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";



const Movies = () => {

    const [films, setFilms] = useState([])
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation()
    // const inputValue = searchParams.get("filmName") ?? ""

    useEffect(() => {
        // console.log('cringe')
        // if (films === []) {
        //     console.log('hollow array')
        //     return
        // }
        setFormSubmitted(true)
        const getFilms = async () => {
            setFilms(await searchMovies(searchParams.get('filmName')))
        }
        if (formSubmitted) { 
            getFilms()
        }
        
    }, [searchParams, formSubmitted])

    // useEffect(() => { 
        
    // }, [])

    const handleSubmit = e => {
        e.preventDefault();
        // console.log(e.target.filmName.value)
        if (e.target.filmName.value === "") {
            return 
            // setSearchParams({})
        }
        else { 
            setFormSubmitted(false)
        }
        setSearchParams({ filmName: e.target.filmName.value })

        e.target.filmName.value = ""
        // console.log(e.target.filmName.value)
        setFormSubmitted(true)
    }

    const onFormInput = e => {
        // if (e.target.value === "") {
        //     return setSearchParams({})
        // }
        // else { 
        //     setFormSubmitted(false)
        // }
        // setSearchParams({ filmName: e.target.value })
    }
    // console.log(location)
    const renderOfFilms = () => {
        if (films.results !== undefined && films.total_results !== 0 && formSubmitted) {
            return (
                films.results.map(el => { return (<li key={el.id}><Link to={`/movies/${el.id}`} state={{from: location}}>{el.original_title}</Link></li>) })
            )
        }
    }


    // при возврате на страницу, со страницы карточки фильма, должен всё ещё висеть актуальный список фильмов по запросу, а сейчас просто пустое поле выбивает

    return (
        <div>
            <h2>Movie Search</h2>
            <form onSubmit={handleSubmit}>
                <input name="filmName" type="text" onChange={onFormInput} />
                <button type="submit">Search</button>
            </form>
            <ul>
                {renderOfFilms()}
            </ul>
        </div>
    )
}

export default Movies