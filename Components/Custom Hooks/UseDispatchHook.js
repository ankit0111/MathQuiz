import { useState } from 'react'
import { useDispatch } from 'react-redux';

const UseDispatchHook = () => {

    const dispatch = useDispatch();

    const Dispatch1 = (action) => {
        // const [dis1, setDis1] = useState();
        dispatch(action);
        // return { dispatch1 };
    };

    return {
        Dispatch1: Dispatch1,
    }

}
export default UseDispatchHook;