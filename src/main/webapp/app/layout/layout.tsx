import React, { useContext } from 'react';
import { LayoutProvider, LayoutContext } from './context/LayoutContext';
import { MenuProvider } from './context/menucontext';
import AppTopbar from './AppTopbar';
import AppMenu from './AppMenu';

// This is the component that consumes the context
const AppLayout = ({ children }) => {
    const { layoutState } = useContext(LayoutContext);

    // Dynamically create class names based on the layout state
    const containerClassName = [
        'layout-wrapper',
        'layout-static', // Using static layout mode by default
        layoutState.staticMenuDesktopInactive ? 'layout-static-inactive' : '',
        layoutState.overlayMenuActive ? 'layout-overlay-active' : '',
        layoutState.staticMenuMobileActive ? 'layout-mobile-active' : ''
    ].filter(Boolean).join(' ');

    return (
        <div className={containerClassName}>
            <AppTopbar />
            <div className="layout-sidebar">
                <AppMenu />
            </div>
            <div className="layout-main-container">
                <div className="layout-main">
                    {children}
                </div>
            </div>
        </div>
    );
};

// This is the main export that provides the context
const Layout = ({ children }) => {
    return (
        <LayoutProvider>
            <MenuProvider>
                <AppLayout>{children}</AppLayout>
            </MenuProvider>
        </LayoutProvider>
    );
};

export default Layout;
