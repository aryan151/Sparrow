import './res.css'  
function Resolution({resolution, setResolution, isPos}){

    const resolutions = ['D', 'W', 'M', 'Y']
    const toggleResolution = async (e) => {
        let res = e.target.value
        setResolution(res)
    }

    return (
        <div className='resolution-container'>
            {resolutions.map((res) => (
                <button
                    className={`${res === resolution ? `${isPos}-active-res` : ""} res-button`}
                    value={res}
                    onClick={toggleResolution}
                >
                    {res}
                </button>
            ))}
        </div>
    );
};

export default Resolution;