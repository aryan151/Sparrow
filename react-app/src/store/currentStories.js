const SET_STORIES = 'currentStories/SET_GENERAL_STORIES'; 

const setStoriesAction = (stories) => {
    return {
        type: SET_STORIES,
        stories
    };
};


function todayAndYesterday(){

    const date1 = new Date();
    const [month1, day1, year1]  = date1.toLocaleString().split(' ')[0].split('/');
    const today = `${year1.slice(0, year1.length - 1)}-${month1}-${day1}`;

    const date2 = new Date();
    const yesterdayTemp = new Date(date2.setDate(date2.getDate() - 1));
    const [month2, day2, year2] = yesterdayTemp.toLocaleString().split(' ')[0].split('/');
    const yesterday = `${year2.slice(0, year2.length - 1)}-${month2}-${day2}`;

    return [today, yesterday];
};





export const setGeneralStories = () => async (dispatch) => {
    const data = await fetch('https://finnhub.io/api/v1//news?category=general&token=c5f2bi2ad3ib660qt670');
    const APIStories = await data.json();
    if (!APIStories.error) {
        const stories = [];
        APIStories.slice(0, 16).forEach(APIstory => {
            let story = {
                link: APIstory.url,
                publishDate: APIstory.datetime,
                publisher: APIstory.source,
                photoUrl: APIstory.image,
                title: APIstory.headline,
                description: APIstory.summary
            };
            if (story.photoUrl) {
                stories.push(story)
            };
        });
        dispatch(setStoriesAction(stories));
    }
    return
};
 

export const setCompanyStories = (ticker) => async (dispatch) => {
    const [today, yesterday] = todayAndYesterday();
    const data = await fetch(`https://finnhub.io/api/v1/company-news?symbol=${ticker}&from=${yesterday}&to=${today}&token=c5f2bi2ad3ib660qt670`);
    const APIStories = await data.json();
    if (!APIStories.error) {
        const stories = [];
        APIStories.slice(0, 16).forEach(APIstory => {
            let story = {
                    link: APIstory.url,
                    publishDate: APIstory.datetime,
                    publisher: APIstory.source,
                    photoUrl: APIstory.image,
                    title: APIstory.headline,
                    description: APIstory.summary
                };
                if (story.photoUrl) {
                    stories.push(story);
                };
        });
        dispatch(setStoriesAction(stories));
    }
    return
};


const initialState = [];

const currentStoriesReducer = (state=initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_STORIES:
            newState = [...action.stories];
            return newState;
        default:
            return state;
    };
};

export default currentStoriesReducer; 