import { useCallback, useEffect, useState } from 'react'
import { Apis, AuthGeturl } from '../Components/Apis'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { dispatchLoggedIn, dispatchUser } from '../app/reducers'
import Cookies from 'js-cookie'
import { ToastContainer } from 'react-toastify'

// eslint-disable-next-line
const NormalRoute = ({children}) => {
    const [active, setActive] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const getUserAccount = useCallback(async () => {
        const token = Cookies.get('session')
        setActive(true)
        if(token) {
            const res = await AuthGeturl(Apis.user.get_account)
            if(res.status === 200) {
              dispatch(dispatchUser(res.msg))
              dispatch(dispatchLoggedIn(true))
            }
        }
    }, [dispatch, navigate])
  
    useEffect(() => {getUserAccount()}, [getUserAccount])
  if(active) {
    return <>{children} <ToastContainer /></>
  }
}

export default NormalRoute
