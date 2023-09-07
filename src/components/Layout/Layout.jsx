import { Suspense } from "react"
import { NavLink, Outlet } from "react-router-dom"

const Layout = () => {
    return(
    <>
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/movies">Movies</NavLink>
        </nav>
        <main>
            <Suspense fallback={<div>Loading...</div>}>
                <Outlet />
            </Suspense>    
        </main>
    </>)
}
export default Layout