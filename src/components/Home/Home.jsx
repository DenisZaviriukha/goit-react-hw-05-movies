import {Link, Outlet, useLocation} from "react-router-dom";
const Home = ({ films }) => {
    const location = useLocation()
    return (
        <>
            <h1>Home</h1>
            <ul>
                {films.map(film => {
                    return(
                    <li key={film.id}>
                        <Link to={`/movies/${film.id}`} state={{from: location}}>{film.original_title}</Link>
                    </li>)
                })}
            </ul>            
        </>
    )       
}

export default Home