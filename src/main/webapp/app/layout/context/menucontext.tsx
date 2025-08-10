import React, { useState, createContext } from 'react';

export const MenuContext = createContext({
    activeMenu: '',
    setActiveMenu: (menu: string) => {},
});

export const MenuProvider = ({ children }) => {
    const [activeMenu, setActiveMenu] = useState('');

    const value = {
        activeMenu,
        setActiveMenu,
    };

    return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};