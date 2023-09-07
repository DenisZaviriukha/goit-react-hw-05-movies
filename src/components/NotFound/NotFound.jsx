import { useState } from "react"
import { Navigate } from "react-router-dom"

const NotFound = () => {
    const [goBackHome, setGoBackHome] = useState(false)

    if (goBackHome) {
        return <Navigate to="/" replace={true}/>
    }
 
    return (<div>
        <p>Page not found</p>
        <button onClick={() => setGoBackHome(true)}>Back home</button>
    </div>   
    )
}

export default NotFound