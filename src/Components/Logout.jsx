import { useState } from "react"
import Formbutton from "./Formbutton"
import ModalLayout from "./ModalLayout"
import { Apis, AuthPosturl } from "./Apis"
import { ErrorAlert, ToastAlert } from "./Util"
import Cookies from "js-cookie"
import { useSelector } from "react-redux"

// eslint-disable-next-line react/prop-types
const Logout = ({ closeView }) => {
    const {user} = useSelector(state => state.data)
    const [loading, setLoading] = useState(false)
    const confirmLogout = async (e) => {
        e.preventDefault()
        setLoading(true)
        const res = await AuthPosturl(Apis.user.logout_account)
        setLoading(false)
        if (res.status === 200) {
            Cookies.remove('session')
            ToastAlert(res.msg)
            setTimeout(() => {
                window.location = '/login'
            }, 2500);
        } else {
            return ErrorAlert(res.msg)
        }
    }
    return (
        <ModalLayout closeView={closeView}>
            <div className="text-center font-semibold text-xl mb-2">Hi {user.fullname}!</div>
            <div className="text-center">Are your sure you want to Logout?</div>
            <form onSubmit={confirmLogout} className="mt-10">
                <div className="mx-auto w-fit">
                    <Formbutton title='Logout' loading={loading} />
                </div>
            </form>
        </ModalLayout>
    )
}

export default Logout
