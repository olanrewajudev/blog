import { useRef, useState } from "react";
import Layout from "../../Components/Layout"
import JoditEditor from 'jodit-react';
import { ErrorAlert, ToastAlert } from "../../Components/Util";
import Formbutton from "../../Components/Formbutton";
import { Apis, AuthPosturl } from "../../Components/Apis";


const NewBlog = () => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('')
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false)
    const imgref = useRef()

    const handleImage =  (e) => {
        const file = e.target.files[0]
        if (!file.type.startsWith('image/')) return ErrorAlert('file must be a valid a image')
        if (file.size > 3000000) return ErrorAlert('image must not be more than 3MB')
        setImage(file)
    }

    const handleSubmission = async (e) => {
        e.preventDefault()
        if (!title) return ErrorAlert('blog title is required')
        if (!image) return ErrorAlert('blog image is required')
        if (!content) return ErrorAlert('blog content is required')
        const data = new FormData()
        data.append('image', image)
        data.append('title', title)
        data.append('content', content)

        setLoading(true)
        const res = await AuthPosturl(Apis.blogs.new_blog, data)
        setLoading(false)
        if(res.status === 200) {
            setContent('')
            setTitle('')
            setImage('')
            imgref.current.value = null
            ToastAlert(res.msg)
        }else {
            return ErrorAlert(res.msg)
        }
    }
    return (
        <Layout>
            <div className="w-11/12 bg-white p-4 shadow-xl rounded-lg mx-auto my-10">
                <form onSubmit={handleSubmission}>
                    <div className="mb-3">
                        <div className="capitalize">Enter Blog Title</div>
                        <input value={title} onChange={e => setTitle(e.target.value)} type="text" className="input" />
                    </div>

                    <div className="mb-3">
                        <div className="capitalize">Upload Image</div>
                        <input ref={imgref} onChange={handleImage} type="file" className="input" />
                    </div>

                    {/* <div className="" dangerouslySetInnerHTML={{__html: content}}></div> */}
                    <div className="mb-3">
                        <div className="capitalize">Enter Content</div>
                        <JoditEditor
                            ref={editor}
                            value={content}
                            onChange={newContent => setContent(newContent)}
                        />

                    </div>

                    <div className="mt-10 ml-auto w-fit">
                        <div className="mx-auto w-fit">
                            <Formbutton title='Publish Blog' loading={loading} />
                        </div>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default NewBlog
