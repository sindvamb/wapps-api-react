import React, { useState, createContext } from 'react';

export const LayoutContext = createContext<any>({});

export const LayoutProvider = ({ children }) => {
    const [layoutState, setLayoutState] = useState({
        staticMenuDesktopInactive: false,
        overlayMenuActive: false,
        profileSidebarVisible: false,
        configSidebarVisible: false,
        staticMenuMobileActive: false,
        menuHoverActive: false
    });

    const onMenuToggle = () => {
        if (isOverlay()) {
            setLayoutState((prevLayoutState) => ({ ...prevLayoutState, overlayMenuActive: !prevLayoutState.overlayMenuActive }));
        } else if (isDesktop()) {
            setLayoutState((prevLayoutState) => ({ ...prevLayoutState, staticMenuDesktopInactive: !prevLayoutState.staticMenuDesktopInactive }));
        } else {
            setLayoutState((prevLayoutState) => ({ ...prevLayoutState, staticMenuMobileActive: !prevLayoutState.staticMenuMobileActive }));
        }
    };

    const isOverlay = () => {
        return false; // Simplified for now
    };

    const isDesktop = () => {
        return window.innerWidth > 991;
    };

    const value = {
        layoutState,
        onMenuToggle,
        isDesktop
    };

    return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
};