import { useState } from "react";
import { createContext } from "react";
//to create context 
export const AppContext = createContext();
//to create provider
export const AppProvider = ({ children,currentUser }) => {
    //to share the data across the components
    const [loggedIn, setLoggedIn] = useState(currentUser!==null);
    return (
        <AppContext.Provider value={{ loggedIn, setLoggedIn }}>
            {children}
        </AppContext.Provider>
    )
};