import React from 'react';
import AppMenuitem from './AppMenuitem';
import { MenuProvider } from './context/menucontext';
import { AppMenuItem } from './types/types';

const AppMenu = () => {
    const model: AppMenuItem[] = [
        {
            type: 'item',
            label: 'Home',
            items: [
                { type: 'item', label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }
            ]
        },
        {
            type: 'item',
            label: 'Cadastros',
            items: [
                { type: 'item', label: 'Controles de Acesso', icon: 'pi pi-fw pi-shield', to: '/accessControls' },
                { type: 'item', label: 'Endereços', icon: 'pi pi-fw pi-map-marker', to: '/addresses' },
                { type: 'item', label: 'Configurações', icon: 'pi pi-fw pi-cog', to: '/applicationConfigs' },
                { type: 'item', label: 'Anexos', icon: 'pi pi-fw pi-paperclip', to: '/attachments' },
                { type: 'item', label: 'Auditoria', icon: 'pi pi-fw pi-eye', to: '/audits' },
                { type: 'item', label: 'Empresas', icon: 'pi pi-fw pi-building', to: '/companies' },
                { type: 'item', label: 'Contatos da Empresa', icon: 'pi pi-fw pi-phone', to: '/companyContacts' },
                { type: 'item', label: 'Contatos', icon: 'pi pi-fw pi-user', to: '/contacts' },
                { type: 'item', label: 'Solicitações de Contato', icon: 'pi pi-fw pi-envelope', to: '/contactRequests' },
                { type: 'item', label: 'Clientes', icon: 'pi pi-fw pi-users', to: '/customers' },
                { type: 'item', label: 'Pedidos de Clientes', icon: 'pi pi-fw pi-shopping-cart', to: '/customerOrders' },
                { type: 'item', label: 'Tipos de Cliente', icon: 'pi pi-fw pi-tags', to: '/customerTypes' },
                { type: 'item', label: 'Dependentes', icon: 'pi pi-fw pi-sitemap', to: '/dependents' },
                { type: 'item', label: 'Graus de Escolaridade', icon: 'pi pi-fw pi-graduation-cap', to: '/educationDegrees' },
                { type: 'item', label: 'Histórico de E-mails', icon: 'pi pi-fw pi-history', to: '/emailHistories' }
            ]
        }
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    if (item.type === 'separator') {
                        return <li className="menu-separator" key={`separator-${i}`}></li>;
                    }
                    // A label is required for AppMenuitem, so we use it as a key.
                    return <AppMenuitem item={item} root={true} index={i} key={item.label} />;
                })}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
