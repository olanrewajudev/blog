import { Link } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import Logout from "./Logout"
import { useState } from "react"
import { useSelector } from "react-redux"

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
    const { loggedin } = useSelector(state => state.data)
    const linkcss = 'text-slate-100 capitalize text-sm font-semibold py-2.5 px-4'
    const [logs, setLogs] = useState(false)
    const OpenLogout = (e) => {
        e.preventDefault()
        setLogs(!logs)
    }

    return (
        <div>
            {logs && <Logout closeView={() => setLogs(!logs)} />}
            <div className="bg-slate-800 p-3">
                <div className="flex items-center justify-between">
                    <div className="">
                        <Link to='/' className="text-slate-200 text-3xl font-semibold">Blog Platform</Link>
                    </div>
                    <div className="">
                        {loggedin ? <>
                            <div className="flex flex-row">
                                <Link to='/blog' className={`${linkcss}`}>Blogs</Link>
                                <Link to='/dashboard' className={`${linkcss}`}>Dashboard</Link>
                                <Link to='' onClick={OpenLogout} className={`${linkcss}`}>Logout</Link>
                            </div>
                        </> : <>
                            <Link to='/login' className={`${linkcss}`}>Login</Link>
                            <Link to='/register' className={`${linkcss}`}>Register</Link></>}
                    </div>
                </div>
            </div>
            {children}
            <ToastContainer />
        </div>
    )
}

export default Layout
