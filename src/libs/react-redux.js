import { useContext, useEffect, useState } from "react";

import { Context } from "@/contexts/ReduxContext";

function useStore() {
    const store = useContext(Context);
    if (!store) {
        throw new Error('useStore must be used within a Redux Provider');
    }
    return store;
}

function useDispatch() {
    const store = useContext(Context);
    if (!store) {
        throw new Error('useDispatch must be used within a Redux Provider');
    }
    return store.dispatch;
}

function useSelector(selector) {
    const store = useContext(Context);

    if (!store) {
        throw new Error('useSelector must be used within a Redux Provider');
    }

    const [state, setState] = useState(() => {
        return selector(store.getState());
    });

    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            setState(selector(store.getState()));
        });

        //Closure
        return () => {
            unsubscribe();
        }
    },[store, selector])

    return state;
}

export { useStore, useDispatch, useSelector };