import './stories.css'
 
function Stories({stories}){


    function findTimeDiff(time){
        const unixCurrTime = parseInt(
          (new Date().getTime() / 1000).toFixed(0)
        );
        const diff = unixCurrTime - time
        const diffDate = new Date(diff*1000)
        const hoursDiff = diffDate.getUTCHours()
        const minDiff = diffDate.getUTCMinutes()
        if(hoursDiff < 1){
            return `${minDiff}m`
        }else{
            return `${hoursDiff}h`
        }
    }


    return (
        <div className='stories-container' >
            <p className='section-header'>News</p>
            {stories && stories.map(story => (
                <div className='story-container'>
                    <div className='story-wrapper'>
                        <a target="_blank" href={story.link}>
                            <div className='story-text'>
                                <div className='story-pub-time'>
                                    <p className='story-publisher'>{story.publisher}</p>
                                    <p className='story-time' >{findTimeDiff(story.publishDate)}</p>
                                </div>
                                <div className='story-content'>
                                    <div className='story-title-description'>
                                        <p className='story-title' >{story.title}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="storyImg" style={{"backgroundImage": `url('${story.photoUrl}')`}}></div>
                        </a>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Stories