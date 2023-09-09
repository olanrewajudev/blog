import {toast} from 'react-toastify'


export const ToastAlert = (text) => {
    return (
        toast.success(text  , {
            position: "top-center",
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
    )
} 

export const ErrorAlert = (text) => {
    return (
        toast.error(text, {
            position: "top-center",
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
    )
} 


export const RoleLink  = [
    {
        role: 'admin',
        url: '/auth/admin'
    },
    {
        role: 'user',
        url: '/dashboard'
    },
]