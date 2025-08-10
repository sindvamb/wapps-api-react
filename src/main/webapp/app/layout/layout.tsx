import { LayoutProvider } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import AppTopbar from './AppTopbar';
import AppMenu from './AppMenu';
import React from 'react';

const Layout = ({ children }) => {
    return (
        <LayoutProvider>
            <MenuProvider>
                <div className="layout-wrapper">
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
            </MenuProvider>
        </LayoutProvider>
    );
};

export default Layout;