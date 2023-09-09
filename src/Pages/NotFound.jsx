import Layout from '../Components/Layout'
import notfound from '../asset/images/404.jpg'

const NotFound = () => {
  return (
    <Layout className="">
      <img src={notfound} alt="" className="w-full h-[88vh]" />
    </Layout>
  )
}

export default NotFound
