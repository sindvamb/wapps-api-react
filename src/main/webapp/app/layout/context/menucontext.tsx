import React, { useState, createContext, useCallback } from 'react';

interface MenuContextType {
    activeMenu: string;
    setActiveMenu: (menu: string) => void;
    toggleMenu: (key: string) => void;
}

export const MenuContext = createContext<MenuContextType>({
    activeMenu: '',
    setActiveMenu: () => {},
    toggleMenu: () => {}
});

export const MenuProvider = ({ children }: { children: React.ReactNode }) => {
    const [activeMenu, setActiveMenu] = useState('');

    const toggleMenu = useCallback((key: string) => {
        setActiveMenu(current => current === key ? '' : key);
    }, []);

    const value = {
        activeMenu,
        setActiveMenu,
        toggleMenu
    };

    return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};