
import {SlUser} from 'react-icons/sl'
import { useSelector } from 'react-redux'
import Layout from '../Components/Layout'

const Dashboard = () => {
  const {user} = useSelector(state => state.data)
  return (
    <Layout>
      <div className="text-3xl text-center font-semibold drop-shadow-lg mt-6">Dashboard</div>
      <div className="text-center text-2xl flex items-center justify-center gap-2 capitalize mt-10"> <SlUser /> {user.fullname} </div>
    </Layout>
  )
}

export default Dashboard
