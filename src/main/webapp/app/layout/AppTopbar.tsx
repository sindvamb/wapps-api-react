import React from 'react';
import { Link } from 'react-router-dom';

const AppTopbar = () => {
    return (
        <div className="layout-topbar">
            <Link to="/" className="layout-topbar-logo">
                <span>SAKAI</span>
            </Link>
        </div>
    );
};

export default AppTopbar;
