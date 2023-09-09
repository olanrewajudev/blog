import {FaEye, FaEyeSlash} from 'react-icons/fa'
import Layout from '../../Components/Layout'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ErrorAlert, RoleLink, ToastAlert } from '../../Components/Util'
import { Apis, Posturl } from '../../Components/Apis'
import Formbutton from '../../Components/Formbutton'
import Cookies from 'js-cookie'
import {decodeToken} from 'react-jwt'


const Login = () => {
    const [pass, setPass] = useState(false)
    const [loading, setLoading] = useState(false)
    const Icon = pass ? FaEye : FaEyeSlash
    const [forms, setForms] = useState({
        email: '',
        password: ''
    })
    const handleForms = e => {
        setForms({
            ...forms,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async e => {
        e.preventDefault()
        if(!forms.email) return ErrorAlert('Email Address required')
        if(!forms.password) return ErrorAlert('Password required')

        const data = {
            email: forms.email,
            password: forms.password
        }
        setLoading(true)
        const res = await Posturl(Apis.user.login_account, data)
        setLoading(false)
        if(res.status === 200) {
            ToastAlert(res.msg)
            Cookies.set('session', res.token)
            const decoded = decodeToken(res.token)
            const findRole = RoleLink.find((item) => item.role === decoded.role)
            setTimeout(() => {
                window.location = `${findRole.url}`
            }, 2000)
        }else {
            return ErrorAlert(res.msg)
        }
    }
    return (
        <Layout>
            <div className="">
                <div className="w-11/12 mx-auto max-w-md bg-white p-4 shadow-xl rounded-lg my-10">
                    <form onSubmit={handleSubmit}>
                        <div className="text-center font-bold italic text-stone-800 text-3xl border-b pb-3 mb-3">Login Account</div>
                        <div className="mb-4">
                            <div className="text-right">Enter Email Address</div>
                            <input name="email" value={forms.email} onChange={handleForms} type="email" className="input" />
                        </div>
                        <div className="mb-4 relative">
                            <div onClick={() => setPass(!pass)} className="absolute top-8 right-3 cursor-pointer text-slate-600 text-xl"> <Icon /> </div>
                            <div className="text-right">Enter Password</div>
                            <input name="password" value={forms.password} onChange={handleForms} type={pass ? 'text' : 'password'} className="input" />
                        </div>
                        <div className="w-fit ml-auto">
                            <Formbutton title='Login Account' loading={loading} />
                        </div>
                        <div className="text-center mt-6 text-stone-800 text-sm">Dont have an account?  <Link to='/register' className='text-indigo-700'>Create Account</Link></div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default Login
