import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppWrapper(props) {
    const [showAllIps, setShowAllIps] = useState(true);
    const [login, setLogin] = useState(false);

    let state = {
        showAllIps,
        setShowAllIps,
        login,
        setLogin
    }

    return (
        <AppContext.Provider value={state}>
            {props.children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
    return useContext(AppContext);
}
