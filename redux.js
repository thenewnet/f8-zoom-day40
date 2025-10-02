const MyRedux = {
    __DO_NOT_USE__ActionTypes: {
        type: "@@redux/INIT.a.b.c",
    },

    createStore(reducer, initState){
        let state = reducer(
            initState,
            this.__DO_NOT_USE__ActionTypes
        );

        let listeners = [];
        return {
            getState(){
                return state;
            },
            dispatch(action){
                state = reducer(state, action);
                listeners.forEach(listener => listener());
            },
            subscribe(listener){
                listeners.push(listener);

                return () => {
                    listeners = listeners.filter(l => l !== listener);
                }
            }   
        }
    }
}