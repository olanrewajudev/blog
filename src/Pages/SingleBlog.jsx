import { Link } from "react-router-dom"
import { Apis, AuthPosturl, imageUrl } from "../Components/Apis"
import moment from "moment"
import { BiComment, BiDislike, BiLike } from 'react-icons/bi'
import { AiFillDislike, AiFillLike } from 'react-icons/ai'
import { useSelector } from "react-redux"
import { ErrorAlert } from "../Components/Util"
import { useState } from "react"

const SingleBlog = ({ item, resendSignal, comments }) => {
    const { user } = useSelector(state => state.data)
    const cs = 'flex items-center gap-2'
    const [liked, setLiked] = useState(item.likes.find(ele => ele === user._id) ? true : false)
    const [disliked, setDisLiked] = useState(item.dislikes.find(ele => ele === user._id) ? true : false)
    const LIkeIcon = liked ? AiFillLike : BiLike
    const DislikeIcon = disliked ? AiFillDislike : BiDislike

    const HandleLikes = async (id) => {
        if (!user?._id) return ErrorAlert('Login to like this blog')
        let tag;
        if (!liked) {
            tag = 'like'
            setDisLiked(false)
        } else {
            tag = 'unlike'
        }
        const data = {
            blogid: item._id,
            tag: tag
        }
        const res = await AuthPosturl(Apis.blogs.like, data)
        if (res.status === 200) {
            resendSignal()
            setLiked(!liked)
        } else {
            return ErrorAlert(res.msg)
        }
    }

    const HandleDisLikes = async (id) => {
        if (!user?._id) return ErrorAlert('Login to dislike this blog')
        let tag;
        if (!disliked) {
            tag = 'dislike'
            setLiked(false)
        } else {
            tag = 'undislike'
        }
        const data = {
            blogid: item._id,
            tag: tag
        }
        const res = await AuthPosturl(Apis.blogs.dislike, data)
        if (res.status === 200) {
            resendSignal()
            setDisLiked(!disliked)
        } else {
            return ErrorAlert(res.msg)
        }
    }


    return (
        <div className="mb-3 border-b bg-white p-2 shadow-xl">
            <div className="flex items-center">
                <div className="w-full">
                    <Link to={`/blogs/${item.slug}/${item._id}`} className="text-blue-700 font-semibold text-xl">{item.title}</Link>
                    <div className="text-sm capitalize flex items-center gap-2"> <img src={`${imageUrl}/profile/${item.user.image}`} alt="" className="w-6 border-2 border-white shadow-xl h-6 rounded-full" /> {item.user.fullname} </div>
                    <div className="flex items-center text-xs">{moment(item.createdAt).format('ddd Do-MM-MMM-YYYY h:mA')}</div>
                    <div className="text-sm text-slate-600 truncate h-10" dangerouslySetInnerHTML={{ __html: item.content }} />
                </div>
                <div className=""> <img src={`${imageUrl}/blogs/${item.image}`} alt="" className="w-20 h-20 mx-auto object-cover" /> </div>
            </div>
            <div className="flex items-center gap-10 mt-2 justify-end">
                <button onClick={() => HandleLikes(item._id)} className={`${cs} ${liked ? 'text-blue-600' : 'text-slate-600'}`}> <LIkeIcon />: {item.likes.length} </button>
                <button onClick={() => HandleDisLikes(item._id)} className={`${cs} ${disliked ? 'text-red-600' : 'text-slate-600'}`}> <DislikeIcon /> : {item.dislikes.length}</button>
                <Link to={`/blogs/${item.slug}/${item._id}`} onClick={() => HandleComment()} className={`${cs}`}> <BiComment /> : {comments.length}</Link>
            </div>
        </div>
    )
}

export default SingleBlog
