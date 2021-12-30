const TOGGLE = 'theme/TOGGLE'
const SET_THEME = 'theme/SET_THEME'  


const toggleThemeAction = (theme) => {
    return {
        type: TOGGLE,
        theme
    };
};


const setThemeAction = (theme) => {
    return {
        type: SET_THEME,
        theme
    };
};
 

export const toggleTheme = () => (dispatch) => {
    const currentTheme = localStorage.getItem('theme')
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
    localStorage.setItem('theme', newTheme)
    dispatch(toggleThemeAction(newTheme))
}

export const setTheme = () => (dispatch) =>{
    const isThemeInStorage = localStorage.getItem('theme')
    const theme = isThemeInStorage ? isThemeInStorage : 'light'
    localStorage.setItem('theme', theme)
    dispatch(setThemeAction(theme))
}


const initialState = null

const themeReducer = (state=initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_THEME:
            newState = action.theme
            return newState
        case TOGGLE:
            newState = action.theme
            return newState
        default:
            return state
    }
}

export default themeReducer;