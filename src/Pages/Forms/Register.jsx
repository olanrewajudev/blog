import { FaEye, FaEyeSlash, FaPlus } from 'react-icons/fa'
import Layout from '../../Components/Layout'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ErrorAlert, RoleLink, ToastAlert } from '../../Components/Util'
import { Apis, Posturl } from '../../Components/Apis'
import Formbutton from '../../Components/Formbutton';
import Cookies from 'js-cookie'
import { decodeToken } from 'react-jwt'
import mail from '../../asset/images/mailc.png'

const Register = () => {
    const [loading, setLoading] = useState(false)
    const [code, setCode] = useState('')
    const [view, setView] = useState(1)
    const [pass, setPass] = useState(false)
    const [pass2, setPass2] = useState(false)
    const [, setLoads] = useState(false)
    const [otpmsg, setOtpmsg] = useState('Resend code')
    const Icon = pass ? FaEye : FaEyeSlash
    const Icon2 = pass2 ? FaEye : FaEyeSlash
    const [forms, setForms] = useState({
        fullname: '',
        email: '',
        password: '',
        confirm_password: '',
    })
    const [image, setImage] = useState({
        main: null,
        preview: null
    })

    const handleForms = e => {
        setForms({
            ...forms,
            [e.target.name]: e.target.value
        })
    }

    const handleUpload = e => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            setImage({
                main: file,
                preview: reader.result
            })
        }
    }

    const handleSubmission = async (e) => {
        e.preventDefault()
        if (image.main === null) return ToastAlert('Profile Photo is required')
        if (!forms.fullname) return ToastAlert('Fullname is required')
        if (!forms.email) return ToastAlert('Email Address is required')
        if (!forms.password) return ToastAlert('Password is required')
        if (!forms.confirm_password) return ToastAlert('Confirm your Password')
        if (forms.confirm_password !== forms.password) return ToastAlert('Password(s) does not match')

        const formdata = new FormData()
        formdata.append('image', image.main)
        formdata.append('fullname', forms.fullname)
        formdata.append('email', forms.email)
        formdata.append('password', forms.password)
        formdata.append('confirm_password', forms.confirm_password)

        setLoading(true)
        const result = await Posturl(Apis.user.register_account, formdata)
        setLoading(false)
        if (result.status === 200) {
            setView(2)
        }
        else {
            return ErrorAlert(result.msg)
        }
    }

    const ActivateAccount = async e => {
        if(!code) return ErrorAlert('Enter a valid verification code')
        e.preventDefault()
        const data = {
            code: code,
            email: forms.email
        }

        setLoading(true)
        const res = await Posturl(Apis.user.activate_account, data)
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

    const ResendOTP = async () => {
        const data = {
            email: forms.email
        }
        setLoads(true)
        const res = await Posturl(Apis.user.resend_otp, data)
        setLoads(false)
        setOtpmsg('Sending...')
        if(res.status === 200) {
            setOtpmsg('code sent')
            setTimeout(() => {
                setOtpmsg('Resend code')
            }, 2000);
        }else {
            setOtpmsg('Resend code')
            return ErrorAlert(res.msg)
        }
    }
    return (
        <Layout>
            <div className="">
                <div className="w-11/12 mx-auto max-w-md bg-white p-4 shadow-xl rounded-lg my-10">
                   {view === 1 && <form onSubmit={handleSubmission}>
                        <div className="text-center font-bold italic text-stone-800 text-3xl border-b pb-3 mb-3">Create Account</div>
                        <div className="mb-4">
                            <label>
                                {image.preview === null ? <div className="w-32 h-32 rounded-full bg-slate-200 cursor-pointer mx-auto flex items-center justify-center text-slate-600"> <FaPlus /> </div> : <img src={image.preview} alt="" className="w-32 h-32 mx-auto border rounded-full object-cover" />}
                                <input onChange={handleUpload} type="file" hidden />
                                <div className="text-center text-indigo-700 text-xs">Upload Profile</div>
                            </label>
                        </div>
                        <div className="mb-4">
                            <div className="text-right">Enter Fullname</div>
                            <input name="fullname" value={forms.fullname} onChange={handleForms} type="text" className="input" />
                        </div>
                        <div className="mb-4">
                            <div className="text-right">Enter Email Address</div>
                            <input name="email" value={forms.email} onChange={handleForms} type="email" className="input" />
                        </div>
                        <div className="mb-4 relative">
                            <div onClick={() => setPass(!pass)} className="absolute top-8 right-3 cursor-pointer text-slate-600 text-xl"> <Icon /> </div>
                            <div className="text-right">Enter Password</div>
                            <input name="password" value={forms.password} onChange={handleForms} type={pass ? 'text' : 'password'} className="input" />
                        </div>
                        <div className="mb-4 relative">
                            <div onClick={() => setPass2(!pass2)} className="absolute top-8 right-3 cursor-pointer text-slate-600 text-xl"> <Icon2 /> </div>
                            <div className="text-right">Confirm Password</div>
                            <input name="confirm_password" value={forms.confirm_password} onChange={handleForms} type={pass2 ? 'text' : 'password'} className="input" />
                        </div>
                        <div className="w-fit ml-auto">
                            <Formbutton title='Continue' loading={loading} />
                        </div>
                        <div className="text-center mt-6 text-stone-800 text-sm">Already have an account?  <Link to='/login' className='text-indigo-700'>Login Account</Link></div>
                    </form>}
                  {view === 2 &&  <form onSubmit={ActivateAccount}>
                        <div className="w-[10rem] mb-2 mx-auto">
                            <img src={mail} alt="" />
                        </div>
                        <div className="text-center">A mail has been sent to <span className="text-orange-600"> {forms.email.slice(0, 3)}******{forms.email.slice(-10)} </span> <br /> copy and paste your account verification code to authorize your account </div>
                        <div className="w-3/5 mt-4 mx-auto">
                            <input value={code} onChange={e => setCode(e.target.value)} type="text" className="input text-center" placeholder='*******' />
                        </div>
                        <div className="text-center mt-3 text-sm">Didnt recieve any code? <button type="button" onClick={ResendOTP} className="text-orange-600">{otpmsg}</button> </div>
                        <div className="w-fit mx-auto mt-5">
                            <Formbutton title='verify email' loading={loading} />
                        </div>
                    </form>}
                </div>
            </div>
        </Layout>
    )
}

export default Register
