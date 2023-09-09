import { useCallback, useEffect, useState } from 'react'
import { Apis, AuthGeturl } from '../Components/Apis'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { dispatchLoggedIn, dispatchUser } from '../app/reducers'

// eslint-disable-next-line
const UserRoute = ({children}) => {
    const [active, setActive] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const getUserAccount = useCallback(async () => {
      const res = await AuthGeturl(Apis.user.get_account)
      if(res.status === 200) {
        dispatch(dispatchUser(res.msg))
        dispatch(dispatchLoggedIn(true))
        return setActive(true)
      }else {
        return navigate('/login')
      }
    }, [dispatch, navigate])
  
    useEffect(() => {getUserAccount()}, [getUserAccount])
  if(active) {
    return <>{children}</>
  }
}

export default UserRoute
