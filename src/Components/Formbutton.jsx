
// eslint-disable-next-line react/prop-types
const Formbutton = ({title, loading}) => {
    return (
        <button disabled={loading ? true : false} className={`rounded-full flex items-center gap-3 py-3 px-5 capitalize text-sm ${loading ? 'bg-slate-400 hover:bg-slate-500 text-white' : 'bg-slate-700 hover:bg-slate-800 text-white'}`}>{title} {loading && <div className="spins"></div>} </button>
    )
}

export default Formbutton

