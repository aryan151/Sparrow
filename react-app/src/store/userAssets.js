import { multiAssetGraphData } from './stockApiInfo';  


const SET_USER_ASSETS = 'userAssets/SET_USER_ASSETS';      
const ADD_USER_ASSET = 'userAssets/ADD_USER_ASSETS';
const UPDATE_USER_ASSET = 'userAssets/UPDATE_USER_ASSET';
const DELETE_USER_ASSET = 'userAssets/DELETE_USER_ASSET';



const setAssetsAction = (assets) => {
    return {
        type: SET_USER_ASSETS,
        assets
    };
};

const addAssetAction = (asset) => {
    return {
        type: ADD_USER_ASSET,
        asset
    };
}; 

const updateAssetAction = (asset) => {
    return {
        type: UPDATE_USER_ASSET,
        asset
    };
};

const deleteAssetAction = (ticker) => {
    return {
        type: DELETE_USER_ASSET,
        ticker  
    };
};


export const setUserAssets = (userId, resolution) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/assets/`);
    const assets = await res.json();
    const symbols = Object.keys(assets)
    if (resolution) {
        const graphData = await multiAssetGraphData(resolution, symbols, assets)
        if (graphData) {
            assets['graphData'] = graphData
            dispatch(setAssetsAction(assets));
        } else {
            return
        }
    } else {
        dispatch(setAssetsAction(assets))
    }
};

export const  addUserAsset = (asset) => async (dispatch) => {
    const res = await fetch(`/api/assets/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(asset)
    });
    const newAsset = await res.json();
    dispatch(addAssetAction(newAsset));
};

export const updateUserAsset = (updatedAsset) => async (dispatch) => {
    const res = await fetch(`/api/assets/${updatedAsset.id}/`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedAsset)
    });
    const asset = await res.json()
    dispatch(updateAssetAction(asset));
};

export const deleteUserAsset = (asset) => async (dispatch) => {
    await fetch(`/api/assets/${asset.id}/`, {
        method: "DELETE"
    });   
    dispatch(deleteAssetAction(asset.ticker));    
};


const initialState = {}

const userAssetsReducer = (state=initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_USER_ASSETS:
            newState = action.assets
            return newState;
        case ADD_USER_ASSET:
            newState = {...state};
            newState[action.asset.ticker] = action.asset;
            return newState;
        case UPDATE_USER_ASSET:
            newState = {...state};
            newState[action.asset.ticker] = action.asset;
            return newState;
        case DELETE_USER_ASSET:
            newState = {...state}
            delete newState[action.ticker];  
            return newState;
        default:
            return state;
    };
};

export default userAssetsReducer;