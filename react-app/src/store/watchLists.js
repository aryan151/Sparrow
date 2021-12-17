const SET_USER_LISTS = 'userLists/SET_USER_LISTS';
const UPDATE_USER_LIST = 'userLists/UPDATE_USER_LIST';
const DELETE_USER_LIST = 'userLists/DELETE_USER_LIST';
const ADD_USER_LIST = 'userLists/ADD_USER_LIST'; 


const setUserListsAction = (lists) => {
    return {
        type: SET_USER_LISTS,
        lists
    };
};

const updateUserListAction = (list) => {
    return {
        type: UPDATE_USER_LIST,
        list
    };
};

const deleteUserListAction = (listId) => {
    return {
        type: DELETE_USER_LIST,
        listId
    };
};

const addUserListAction = (list) => {
    return {
        type: ADD_USER_LIST,
        list
    };
};
 

/* ----------------------------------------------------------------------- */
/* --------------------------------Thunks--------------------------------- */
/* ----------------------------------------------------------------------- */

export const setUserLists = (userId) => async (dispatch) => {
const res = await fetch(`/api/users/${userId}/lists/`);
const lists = await res.json();
dispatch(setUserListsAction(lists));
};

export const updateUserList = (list) => async (dispatch) => {
const res = await fetch(`/api/lists/${list.id}/`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(list)
});
const updatedList = await res.json();
dispatch(updateUserListAction(updatedList));
};

export const deleteUserList = (listId) => async (dispatch) => {
await fetch(`/api/lists/${listId}/`, {
    method: "DELETE"
});
dispatch(deleteUserListAction(listId));
};

export const addUserList = (list) => async (dispatch) => {
const res = await fetch(`/api/users/${list.user_id}/lists/`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(list)
});
const newList = await res.json();
dispatch(addUserListAction(newList));
};

export const addListSymbol = (listId, symbol) => async (dispatch) => {
const res = await fetch(`/api/lists/${listId}/listsymbols/`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({list_id: listId, symbol})
});
const listSymbol = await res.json();
dispatch(addListSymbolAction(listSymbol));
};

export const deleteListSymbol = (listSymbol) => async (dispatch) => {
const {id, listId, symbol} =listSymbol
await fetch(`/api/listsymbols/${id}/`, {
    method: "DELETE"
});
dispatch(deleteListSymbolAction({listId, symbol}));
};

/* ----------------------------------------------------------------------- */
/* -----------------------Initial State & Reducer------------------------- */
/* ----------------------------------------------------------------------- */

const initialState = {}

const userListsReducer = (state=initialState, action) => {
let newState;
switch (action.type) {
    case SET_USER_LISTS:
        newState = {...action.lists}
        return newState;
    case UPDATE_USER_LIST:
        newState = {...state}
        newState[action.list.id] = action.list
        return newState;
    case DELETE_USER_LIST:
        newState = {...state}
        delete newState[action.listId]
        return newState;
    case ADD_USER_LIST:
        newState = {...state}
        newState[action.list.id] = action.list
        return newState;
    case ADD_LIST_SYMBOL:
        newState = {...state}
        newState[action.data.listId].symbols = {...newState[action.data.listId].symbols, [action.data.symbol]: action.data}
        return newState;
    case DELETE_LIST_SYMBOL:
        newState = {...state}
        delete newState[action.data.listId].symbols[action.data.symbol]
        return newState
    default:
        return state;
}
}

export default userListsReducer;