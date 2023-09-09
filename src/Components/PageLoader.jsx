import { useEffect, useState } from "react"
import spins from '../asset/images/spins.gif'

// eslint-disable-next-line react/prop-types
const PageLoader = ({children}) => {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 3000);
    }, [])
    
    if(loading) return <div className="flex bg-white items-center justify-center h-screen w-full"> <img src={spins} /> </div>

    return <>{children}</>
}

export default PageLoader
