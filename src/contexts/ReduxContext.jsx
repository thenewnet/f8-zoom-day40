import { createContext } from "react";

const Context = createContext();

function Provider({ store, children }) {
    return (
        <Context.Provider value={store}>
            {children}
        </Context.Provider>
    )
}

export { Provider, Context }
