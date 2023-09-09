import { useEffect, useRef } from 'react'
import {FaTimes} from 'react-icons/fa'
// eslint-disable-next-line react/prop-types
const ModalLayout = ({children, closeView}) => {
    const togref = useRef()
    useEffect(() => {
        if(togref) {
            window.addEventListener('click', (e) => {
                togref.current !== null && !togref.current.contains(e.target) && closeView()
            }, true)
        }
    }, [closeView])
  return (
    <div className="fixed h-screen w-full bg-black/50 z-[99] flex items-start pt-10 justify-center">
      <div ref={togref} className="bg-white p-3 max-w-xl w-full rounded-lg relative">
        <button onClick={closeView} className="absolute top-2 right-2 cursor-pointer bg-slate-200 rounded-full p-2"> <FaTimes /> </button>
        {children}
      </div>
    </div>
  )
}

export default ModalLayout

