import React, { useContext, useEffect } from 'react';
import { classNames } from 'primereact/utils';
import { Link, useLocation } from 'react-router-dom';
import { MenuContext } from './context/menucontext';
import { AppMenuItem, AppMenuBaseItem } from './types/types';

// Função "Type Guard" para verificar se um item é um item de menu válido (e não um separador)
const isBaseItem = (item: AppMenuItem): item is AppMenuBaseItem => {
    return item.type === 'item';
};

interface AppMenuitemProps {
    item: AppMenuItem;
    root: boolean;
    index: number;
    parentKey?: string;
}

const AppMenuitem = (props: AppMenuitemProps) => {
    const { item, root, index, parentKey } = props;

    // Se não for um item de menu válido (ex: um separador), não renderiza nada.
    // Esta verificação resolve os erros de compilação do TypeScript.
    if (!isBaseItem(item)) {
        return null;
    }

    // A partir daqui, o TypeScript sabe que 'item' é do tipo AppMenuBaseItem e tem todas as propriedades.
    const { activeMenu, setActiveMenu } = useContext(MenuContext);
    const key = parentKey ? `${parentKey}-${index}` : String(index);
    const isActive = activeMenu === key || (activeMenu ? activeMenu.startsWith(key + '-') : false);
    const location = useLocation();

    // Efeito para abrir a categoria correta se uma de suas páginas filhas estiver ativa ao carregar
    useEffect(() => {
        if (root && item.items && !isActive && item.items.some(child => isBaseItem(child) && child.to === location.pathname)) {
            setActiveMenu(key);
        }
    }, [location.pathname, root, item, isActive, key, setActiveMenu]);

    const itemClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        if (item.disabled) {
            event.preventDefault();
            return;
        }
        if (item.command) {
            item.command({ originalEvent: event, item });
        }

        // Lógica de Acordeão para as categorias raiz
        if (root && item.items) {
            event.preventDefault();
            setActiveMenu(isActive ? '' : key); // Se já estiver ativo, fecha. Se não, abre.
        } else if (!root) {
            // Se for um link filho, define sua chave completa como ativa para highlighting
            setActiveMenu(key);
        }
    };

    // Se for uma categoria raiz
    if (root) {
        const subMenu = item.items && isActive && (
            <ul className="layout-submenu">
                {item.items.map((child, i) => (
                    <AppMenuitem 
                        item={child} 
                        index={i} 
                        parentKey={key} 
                        root={false} 
                        key={isBaseItem(child) ? child.label + i : `sep-${i}`} 
                    />
                ))}
            </ul>
        );

        return (
            <li className={classNames('layout-menuitem', { 'active-menuitem': isActive })}>
                <a 
                    href="#" 
                    onClick={itemClick} 
                    className={classNames('p-ripple menu-link', { 'active-route': isActive })}
                    tabIndex={0}
                >
                    <i className={classNames('layout-menuitem-icon', item.icon)}></i>
                    <span className="layout-menuitem-text">{item.label}</span>
                    {item.items && (
                        <i className={classNames('pi pi-fw layout-submenu-toggler', { 
                            'pi-angle-down': isActive, 
                            'pi-angle-right': !isActive 
                        })}></i>
                    )}
                </a>
                {subMenu}
            </li>
        );
    }

    // Se não for uma categoria raiz, é um link de navegação final
    return (
        <li className="layout-menuitem">
            <Link 
                to={item.to || '#'} 
                target={item.target} 
                className={classNames('p-ripple menu-link', { 
                    'active-route': location.pathname === item.to,
                    'disabled-link': item.disabled 
                })}
                onClick={(e) => {
                    if (item.disabled) {
                        e.preventDefault();
                        return;
                    }
                    setActiveMenu(key);
                    if (item.command) {
                        item.command({ originalEvent: e, item });
                    }
                }}
            >
                {item.icon && <i className={classNames('layout-menuitem-icon', item.icon)}></i>}
                <span className="layout-menuitem-text">{item.label}</span>
                {item.badge && <span className="menuitem-badge">{item.badge}</span>}
            </Link>
        </li>
    );
};

export default AppMenuitem;
