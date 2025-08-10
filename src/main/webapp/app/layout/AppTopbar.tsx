
import React, { useContext } from 'react';
import { LayoutContext } from './context/LayoutContext';

const AppTopbar = () => {
    const { onMenuToggle } = useContext(LayoutContext);

    return (
        <div className="layout-topbar">
            <button type="button" className="p-link layout-menu-button layout-topbar-button" onClick={onMenuToggle}>
                <i className="pi pi-bars" />
            </button>

            <div className="layout-topbar-logo">
                <span>Your Logo</span>
            </div>

            <div className="layout-topbar-menu">
                <button type="button" className="p-link layout-topbar-button">
                    <i className="pi pi-user"></i>
                    <span>Profile</span>
                </button>
            </div>
        </div>
    );
};

export default AppTopbar;
