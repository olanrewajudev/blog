import { useCallback, useEffect, useState } from 'react'
import Layout from '../../Components/Layout'
import { Link } from 'react-router-dom'
import { Apis, AuthGeturl, AuthPosturl, imageUrl } from '../../Components/Apis'
import moment from 'moment'
import { ErrorAlert, ToastAlert } from '../../Components/Util'
import BlogComponent from './BlogComponent'

const tableHeaders = [
  "S/N",
  "image",
  "title",
  'date created',
  '',
  '',
]

const UserBlog = () => {
  const [blogs, setBlogs] = useState([])
  const [view, setView] = useState(false)
  const [singles, setSingles] = useState({})
  const [loading, setLoading] = useState(true)
  const fetchMyBlogs = useCallback(async () => {
    const res = await AuthGeturl(Apis.blogs.my_blogs)
    if(res.status === 200) {
      setBlogs(res.msg)
      setLoading(!loading)
    }
  }, [])

  useEffect(() => {fetchMyBlogs()}, [fetchMyBlogs])

  const deleteBlog = async (id) => {
    const data = {id: id}
    const res = await AuthPosturl(Apis.blogs.delete_blog, data)
    if(res.status === 200) {
      fetchMyBlogs()
      return ToastAlert(res.msg)
    }else {
      return ErrorAlert(res.msg)
    }
  }

  const handleSingleBlog = (data) => {
    setSingles(data)
    setView(!view)
  }
  return (
    <Layout>
    {view &&  <BlogComponent data={singles} closeView={() => setView(!view)} />}
      <div className="w-11/12 mx-auto my-10">
        <div className="font-semibold flex gap-4 items-center">
            <div className="text-2xl">All Blogs</div>
            <Link to='/blog/new' className='border text-sm border-blue-700 rounded-full py-3 px-5 hover:bg-blue-700 hover:text-white text-blue-700'>New Blog</Link>
        </div>
        <div className="mt-10">
          <table className='w-full border table'>
            <thead>
              <tr>
                {tableHeaders.map((item, index) => (
                  <td className='capitalize' key={index}>{item}</td>
                ))}
              </tr>
            </thead>
            <tbody>
              {blogs.length > 0 && blogs.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td> <img src={`${imageUrl}/blogs/${item.image}`} alt="" className="w-10 h-10" /> </td>
                  <td>{item.title}</td>
                  <td>{moment(item.createdAt).fromNow()}</td>
                  <td> <Link to={`/blog/edit/${item.slug}/${item._id}`} className="bg-blue-700 py-2 px-4 rounded-full text-white text-xs">Edit</Link> </td>
                  <td> <button onClick={() => deleteBlog(item._id)} className="bg-red-700 text-white py-2 px-4 rounded-full text-xs">Delete</button> </td>
                  <td> <button onClick={() => handleSingleBlog(item)} className="bg-slate-400 text-white py-2 px-4 rounded-full text-xs">view</button> </td>
                </tr>
              )) }
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}

export default UserBlog
