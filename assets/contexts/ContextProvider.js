import React, { createContext, useContext, useState } from 'react';
import Authentication from '../Services/Authentication';

const StateContext = createContext();

const initialState = {
    chat: false,
    cart: false,
    userProfile: false,
    notificatio: false,
}

export const ContextProvider = ({ children }) => {

    const [activeMenu, setActiveMenu] = useState(true);
    const [isClicked, setIsClicked] = useState(initialState);
    const [screenSize, setScreenSize] = useState(undefined);

    const [isAuth, setIsAuth] = useState(Authentication.isAuth());

    const handleClick = (clicked) => {
        setIsClicked({ ...initialState, [clicked]: true });
    }

    return (
        <StateContext.Provider value={{
            activeMenu, setActiveMenu,
            isClicked, setIsClicked,
            handleClick,
            screenSize, setScreenSize,
            isAuth, setIsAuth
        }}>
            {children}

        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);