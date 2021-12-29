const SET_USER_LISTS = 'userLists/SET_USER_LISTS';
const ADD_USER_LIST = 'userLists/ADD_USER_LIST';   
const UPDATE_USER_LIST = 'userLists/UPDATE_USER_LIST';
const DELETE_USER_LIST = 'userLists/DELETE_USER_LIST';
const ADD_LIST_SYMBOL = 'userLists/ADD_LIST_SYMBOL';
const DELETE_LIST_SYMBOL = 'userLists/DELETE_LIST_SYMBOL';  
 
 
const setUserListsAction = (watchlists) => {
    return {
        type: SET_USER_LISTS,
        watchlists  
    };
};

const updateUserListAction = (watchlist) => {
    return {
        type: UPDATE_USER_LIST,
        watchlist
    };
};

const deleteUserListAction = (watchlistId) => {
    return {
        type: DELETE_USER_LIST,    
        watchlistId
    };
};

const addUserListAction = (watchlist) => {    
    return {
        type: ADD_USER_LIST, 
        watchlist
    };
};
 
const addListSymbolAction = (data) => {
    return {
        type: ADD_LIST_SYMBOL,
        data
    };
};

const deleteListSymbolAction = (data) => {
    return {
        type: DELETE_LIST_SYMBOL,
        data
    };
};  


export const setUserLists = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/watchlists/`);
    const watchlists = await res.json();
    dispatch(setUserListsAction(watchlists));      
};

export const updateUserList = (watchlist) => async (dispatch) => {
    const res = await fetch(`/api/watchlists/${watchlist.id}/`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(watchlist)
    });
    const updatedList = await res.json();
    dispatch(updateUserListAction(updatedList));          
};

export const deleteUserList = (watchlistId) => async (dispatch) => {
await fetch(`/api/watchlists/${watchlistId}/`, {
    method: "DELETE"
});
dispatch(deleteUserListAction(watchlistId));
};

export const addUserList = (watchlist) => async (dispatch) => {
const res = await fetch(`/api/users/${watchlist.user_id}/watchlist/`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(watchlist)   
});
const newList = await res.json();
dispatch(addUserListAction(newList));  
};

export const addListSymbol = (listId, ticker) => async (dispatch) => {
    const res = await fetch(`/api/watchlists/${listId}/watchlist_ticker/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({list_id: listId, ticker})
    });
    const listSymbol = await res.json();
    dispatch(addListSymbolAction(listSymbol));  
};


const initialState = {}

const watchListsReducer = (state=initialState, action) => {
let newState;
switch (action.type) {
    case SET_USER_LISTS:
        newState = {...action.watchlists} 
        return newState;
    case UPDATE_USER_LIST:
        newState = {...state}
        newState[action.watchlist.id] = action.watchlist
        return newState;
    case DELETE_USER_LIST:
        newState = {...state}  
        delete newState[action.watchlistId]
        return newState;
    case ADD_USER_LIST:
        newState = {...state}  
        newState[action.watchlist.id] = action.watchlist
        return newState;
    case ADD_LIST_SYMBOL:
        newState = {...state}  
        newState[action.data.listId].tickers = {...newState[action.data.listId].tickers, [action.data.ticker]: action.data}
        return newState; 
    default:
        return state;
}
}

export default watchListsReducer;