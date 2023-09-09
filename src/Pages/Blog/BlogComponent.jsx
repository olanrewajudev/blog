import { FaClock, FaTimes } from "react-icons/fa"
import { imageUrl } from "../../Components/Apis"
import moment from "moment"
import { useEffect, useRef } from "react"

// eslint-disable-next-line react/prop-types
const BlogComponent = ({data, closeView}) => {
    const togref = useRef()

    useEffect(() => {
        togref && window.addEventListener('click', (e) => togref.current !== null && !togref.current.contains(e.target) && closeView(), true)
    }, [closeView])
  return (
    <div className="fixed bg-black/50 top-0 left-0 w-full h-screen">
      <div ref={togref} className="bg-white w-full pb-20 max-w-[40vw] ml-auto h-screen overflow-y-auto scrolls scrollsdown overflow-x-hidden relative">
        <div className="absolute top-4 right-4 cursor-pointer bg-slate-100 rounded-full p-2" onClick={closeView}> <FaTimes /> </div>
        <div className="w-11/12 mx-auto">
            <div className="pt-5 font-semibold">{data.title}</div>
            <div className="text-sm text-blue-700 flex items-center gap-2 mb-10"> <FaClock /> {moment(data.createdAt).calendar()} </div>
            <div className=""> <img src={`${imageUrl}/blogs/${data.image}`} alt="" className="w-full" /> </div>
            <div className="text-sm contents" dangerouslySetInnerHTML={{__html: data.content}} />
        </div>
      </div>
    </div>
  )
}
export default BlogComponent

