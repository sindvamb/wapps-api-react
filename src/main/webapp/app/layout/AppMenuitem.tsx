import React, { useContext } from 'react';
import { classNames } from 'primereact/utils';
import { Link } from 'react-router-dom';
import { MenuContext } from './context/menucontext';
import { AppMenuBaseItem } from './types/types';

interface AppMenuitemProps {
    item: AppMenuBaseItem;
    root: boolean;
    index: number;
    parentKey?: string;
}

const AppMenuitem = (props: AppMenuitemProps) => {
    const { activeMenu, setActiveMenu } = useContext(MenuContext);
    const { item, root, index, parentKey } = props;
    const key = parentKey ? parentKey + '-' + index : String(index);
    const isActive = activeMenu === key || activeMenu.startsWith(key + '-');

    const itemClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (item.disabled) {
            event.preventDefault();
            return;
        }

        if (item.command) {
            item.command({ originalEvent: event, item: item });
        }

        if (item.items) {
            setActiveMenu(isActive ? (parentKey as string) : key);
        } else {
            setActiveMenu(key);
        }
    };

    const subMenu = item.items && item.visible !== false && (
        <ul>
            {item.items.map((child, i) => {
                return <AppMenuitem item={child} index={i} parentKey={key} key={child.label} root={false} />;
            })}
        </ul>
    );

    return (
        <li className={classNames({ 'layout-root-menuitem': root, 'active-menuitem': isActive })}>
            {root && item.visible !== false && <div className="layout-menuitem-root-text">{item.label}</div>}
            {(!item.items || (item.items && !root)) && item.visible !== false ? (
                <Link to={item.to!} target={item.target} onClick={(e) => itemClick(e)} className="p-ripple" tabIndex={0}>
                    <i className={classNames('layout-menuitem-icon', item.icon)}></i>
                    <span className="layout-menuitem-text">{item.label}</span>
                    {item.items && <i className="pi pi-fw pi-angle-down layout-submenu-toggler"></i>}
                </Link>
            ) : null}
            {subMenu}
        </li>
    );
};

export default AppMenuitem;
