import React, { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Apis, AuthPosturl, Geturl, imageUrl } from '../Components/Apis'
import moment from 'moment'
import { FaClock, FaRegPaperPlane } from 'react-icons/fa'
import InputEmoji from "react-input-emoji";
import { ErrorAlert, ToastAlert } from '../Components/Util'
import Layout from '../Components/Layout'
import { useSelector } from 'react-redux'

const BlogPageSingle = () => {
    const [loading, setLoading] = useState(true)
    const [loads, setLoads] = useState(false)
    const [text, setText] = useState('')
    const [coms, setComs] = useState([])
    const { user } = useSelector(state => state.data)
    const [blog, setBlog] = useState({})
    const { id } = useParams()
    const FetchBlog = useCallback(async () => {
        const res = await Geturl(`${Apis.blogs.single}/${id}`)
        setLoading(false)
        if (res.status === 200) {
            const result = await Geturl(`${Apis.comments.blog_comment}/${res.msg._id}`)
            setComs(result.msg)
            setBlog(res.msg)
        }
    }, [])

    useEffect(() => {
        FetchBlog()
    }, [FetchBlog])


    const HandleCommenting = async (e) => {
        e.preventDefault()
        if (!text) return ErrorAlert('Enter a valid comment')
        const data = {
            text: text,
            blogid: blog._id
        }
        setLoads(true)
        const res = await AuthPosturl(Apis.comments.add_comment, data)
        setLoads(false)
        if (res.status === 200) {
            setText('')
            FetchBlog()
            return ToastAlert(res.msg)
        } else {
            return ErrorAlert(res.msg)
        }
    }
    return (
        <Layout>
            <div className="w-11/12 mb-20 mx-auto">
                <div className="my-5">
                    <div className=" flex items-end justify-end"> <Link to='/' className='py-1.5 px-3 bg-slate-800 rounded-xl text-white text-xl text-center'>Back</Link> </div>
                    <div className="text-blue-600 text-lg font-semibold mb-3">{blog.title}</div>
                    <img src={`${imageUrl}/blogs/${blog.image}`} alt="" className="w-full object-cover h-[25rem]" />
                </div>
                <div className="text-blue-600 flex items-center gap-2 text-sm lowercase"> <FaClock /> {moment(blog.createdAt).format('Do dddd MMMM YYYY h:m:s A')}</div>
                <div dangerouslySetInnerHTML={{ __html: blog.content }} className="text-sm text-zinc-600" />
                {user?._id && <div className="">
                    <div className="text-xl font-semibold mt-3">Leave a comment</div>
                    <form onSubmit={HandleCommenting} className='flex items-center gap-4'>
                        <InputEmoji
                            value={text}
                            onChange={(val) => setText(val)}
                            placeholder="Type a message"
                        />
                        <button disabled={loads ? true : false} className={`${loads ? 'bg-blue-300' : 'bg-blue-600'} text-white rounded-full p-2.5 text-sm`}> <FaRegPaperPlane /> </button>
                    </form>
                </div>}
                <div className="mt-3 mb-6">
                    <div className="text-xl font-semibold">Comments</div>
                    <div className="mt-2">
                        {coms.length > 0 && coms.map((item, i) => (
                            <div className="flex gap-2 mb-2 border-b p-2 last:border-none" key={i}>
                                <img src={`${imageUrl}/profile/${item.user.image}`} alt="" className="w-10 h-10 shadow-xl rounded-full object-cover" />
                                <div className="">
                                    <div className="font-semibold">{item.user.fullname}</div>
                                    <div className="text-xs">{moment(item.createdAt).fromNow()}</div>
                                    <div className="text-sm">{item.text}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default BlogPageSingle
