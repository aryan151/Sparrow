import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUserLists } from "../../store/watchLists";
import Item from './item';  

function AllList({isPos}) {
    const dispatch = useDispatch()    

    const userId = useSelector(state => state?.session?.user?.id)
    const lists = useSelector(state => state?.watchLists)  
    
    const listKeys = Object.keys(lists)

    useEffect(()=>{
        (async () => {
            await dispatch(setUserLists(userId))
        })();
    }, [dispatch]);

    return (
        <>
            {listKeys && listKeys.map(key => (
                <Item list={lists[key]} isPos={isPos} userId={userId}/>   
            ))}
        </>
    );
};

export default AllList;  