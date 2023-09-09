import axios from 'axios'
const url = 'http://localhost:5001/api'
import Cookies from 'js-cookie'


export const imageUrl = 'http://localhost:5001'
const token = Cookies.get('session')
const options = {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}


const user_urls = {
    register_account: `${url}/user/register`,
    login_account: `${url}/user/user-login`,            
    get_account: `${url}/user/get-account`,
    logout_account: `${url}/user/logout-account`,
    resend_otp: `${url}/user/resend-otp`,
    activate_account: `${url}/user/activate-registration`,
}

const blog_urls = {
    new_blog: `${url}/blog/add-blog`,
    my_blogs: `${url}/blog/my-blogs`,
    update_blog: `${url}/blog/update-blog`,
    delete_blog: `${url}/blog/delete-blog`,
    single: `${url}/blog`,
    all: `${url}/blog/general/blogs`,
    like: `${url}/blog/like`,
    dislike: `${url}/blog/dislike`,
}

const comment_urls = {
    add_comment: `${url}/comment/add-comment`,
    blog_comment : `${url}/comment/blog-comments`
}

export const Apis = {
    user: user_urls,
    blogs: blog_urls,
    comments: comment_urls,
}

export const Posturl = async (endpoint, data) => {
    const res = await axios.post(endpoint, data)
    return res.data
}

export const Geturl = async (endpoint) => {
    const res = await axios.get(endpoint)
    return res.data
}

export const AuthPosturl = async (endpoint, data) => {
    const res = await axios.post(endpoint, data, options)
    return res.data
}

export const AuthGeturl = async (endpoint) => {
    const res = await axios.get(endpoint, options)
    return res.data
}