import { useCallback, useEffect, useState } from "react"
import Layout from "../Components/Layout"
import { Apis, Geturl } from "../Components/Apis"
import SingleBlog from "./SingleBlog"

const Home = () => {
  const [blogs, setBlogs] = useState([])

  const FetchAllBlogs = useCallback(async () => {
    const res = await Geturl(Apis.blogs.all)
    if(res.status === 200) return setBlogs(res.allitems)
  }, [])


  useEffect(() => {FetchAllBlogs()}, [FetchAllBlogs])
  return (
    <Layout>
      <div className="">
        <div className="grid grid-cols-2 lg:grid-cols-7 w-11/12 mx-auto mt-10">
          <div className="col-span-5">
            <div className="">
              {blogs.map((item, i) => (
                <SingleBlog key={i} item={item.blog} comments={item.comments} resendSignal={() => FetchAllBlogs()} />
              ))}
            </div>
          </div>
          <div className="grid-cols"></div>
        </div>
      </div>
    </Layout>
  )
}

export default Home
