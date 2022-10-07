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
    const currentModeLocal = window.localStorage.getItem('themeMode');
    const [isAuth, setIsAuth] = useState(Authentication.isAuth());
    const [currentColor, setCurrentColor] = useState('#03C9D7');
    const [currentMode, setCurrentMode] = useState(currentModeLocal);
    const [themeSettings, setThemeSettings] = useState(false);

    const setMode = (mode) => {
        setCurrentMode(mode.target.defaultValue);
        localStorage.setItem('themeMode', mode.target.defaultValue)
        console.log('mode :', mode)
        setThemeSettings(false)
    }
    const setColor = (color) => {
        setCurrentColor(color);
        localStorage.setItem('colorMode', color)
        setThemeSettings(false)
    }

    const handleClick = (clicked) => {
        setIsClicked({ ...initialState, [clicked]: true });
    }

    return (
        <StateContext.Provider value={{
            activeMenu, setActiveMenu,
            isClicked, setIsClicked,
            handleClick,
            screenSize, setScreenSize,
            isAuth, setIsAuth,
            currentColor, currentMode,
            themeSettings, setThemeSettings,
            setMode, setColor
        }}>
            {children}

        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);