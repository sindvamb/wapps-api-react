import React from 'react';
import AppMenuitem from './AppMenuitem';
import { MenuProvider } from './context/menucontext';
import { AppMenuItem } from './types/types';

const AppMenu = () => {
    const model: AppMenuItem[] = [
        {
            type: 'item',
            label: 'Home',
            items: [{ type: 'item', label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }]
        },
        {
            type: 'item',
            label: 'Administração',
            items: [
                { type: 'item', label: 'Controles de Acesso', icon: 'pi pi-fw pi-shield', to: '/accessControls' },
                { type: 'item', label: 'Configurações', icon: 'pi pi-fw pi-cog', to: '/applicationConfigs' },
                { type: 'item', label: 'Auditoria', icon: 'pi pi-fw pi-eye', to: '/audits' },
                { type: 'item', label: 'Perfis', icon: 'pi pi-fw pi-users', to: '/roles' },
                { type: 'item', label: 'Usuários', icon: 'pi pi-fw pi-user', to: '/users' },
                { type: 'item', label: 'Status de Usuário', icon: 'pi pi-fw pi-user-edit', to: '/userStatuses' }
            ]
        },
        {
            type: 'item',
            label: 'Clientes',
            items: [
                { type: 'item', label: 'Clientes', icon: 'pi pi-fw pi-users', to: '/customers' },
                { type: 'item', label: 'Tipos de Cliente', icon: 'pi pi-fw pi-tags', to: '/customerTypes' },
                { type: 'item', label: 'Pedidos de Clientes', icon: 'pi pi-fw pi-shopping-cart', to: '/customerOrders' },
                { type: 'item', label: 'Dependentes', icon: 'pi pi-fw pi-sitemap', to: '/dependents' }
            ]
        },
        {
            type: 'item',
            label: 'Empresas',
            items: [
                { type: 'item', label: 'Empresas', icon: 'pi pi-fw pi-building', to: '/companies' },
                { type: 'item', label: 'Contatos da Empresa', icon: 'pi pi-fw pi-phone', to: '/companyContacts' },
                { type: 'item', label: 'Parceiros', icon: 'pi pi-fw pi-users', to: '/partners' },
                { type: 'item', label: 'Unidades de Parceiros', icon: 'pi pi-fw pi-home', to: '/partnerUnits' }
            ]
        },
        {
            type: 'item',
            label: 'Contatos',
            items: [
                { type: 'item', label: 'Contatos', icon: 'pi pi-fw pi-user', to: '/contacts' },
                { type: 'item', label: 'Solicitações de Contato', icon: 'pi pi-fw pi-envelope', to: '/contactRequests' }
            ]
        },
        {
            type: 'item',
            label: 'Eventos',
            items: [
                { type: 'item', label: 'Eventos', icon: 'pi pi-fw pi-calendar', to: '/events' },
                { type: 'item', label: 'Clientes de Eventos', icon: 'pi pi-fw pi-user', to: '/eventCustomers' },
                { type: 'item', label: 'Funcionários de Eventos', icon: 'pi pi-fw pi-users', to: '/eventEmployees' },
                { type: 'item', label: 'Equipamentos de Eventos', icon: 'pi pi-fw pi-box', to: '/eventEquipaments' },
                { type: 'item', label: 'Menus de Eventos', icon: 'pi pi-fw pi-bars', to: '/eventMenus' },
                { type: 'item', label: 'Itens de Menu de Eventos', icon: 'pi pi-fw pi-list', to: '/eventMenuItems' }
            ]
        },
        {
            type: 'item',
            label: 'Pedidos',
            items: [
                { type: 'item', label: 'Pedidos', icon: 'pi pi-fw pi-shopping-cart', to: '/orders' },
                { type: 'item', label: 'E-mails de Pedidos', icon: 'pi pi-fw pi-envelope', to: '/orderEmails' },
                { type: 'item', label: 'Controles de Arquivo de Pedido', icon: 'pi pi-fw pi-file', to: '/orderFileControls' },
                { type: 'item', label: 'Propriedades de Pedido', icon: 'pi pi-fw pi-cog', to: '/orderProperties' },
                { type: 'item', label: 'Status de Pedido', icon: 'pi pi-fw pi-check-circle', to: '/orderStatuses' },
                { type: 'item', label: 'Rastreamento de Pedidos', icon: 'pi pi-fw pi-map-marker', to: '/orderTrackings' },
                { type: 'item', label: 'Tipos de Pedido', icon: 'pi pi-fw pi-tags', to: '/orderTypes' }
            ]
        },
        {
            type: 'item',
            label: 'Produtos',
            items: [
                { type: 'item', label: 'Áreas de Produto', icon: 'pi pi-fw pi-th-large', to: '/productAreas' },
                { type: 'item', label: 'Categorias de Produto', icon: 'pi pi-fw pi-tags', to: '/productCategories' }
            ]
        },
        {
            type: 'item',
            label: 'Outros',
            items: [
                { type: 'item', label: 'Endereços', icon: 'pi pi-fw pi-map-marker', to: '/addresses' },
                { type: 'item', label: 'Anexos', icon: 'pi pi-fw pi-paperclip', to: '/attachments' },
                { type: 'item', label: 'Graus de Escolaridade', icon: 'pi pi-fw pi-graduation-cap', to: '/educationDegrees' },
                { type: 'item', label: 'Funcionários', icon: 'pi pi-fw pi-users', to: '/employees' },
                { type: 'item', label: 'Equipamentos', icon: 'pi pi-fw pi-box', to: '/equipaments' },
                { type: 'item', label: 'Layouts de Arquivo', icon: 'pi pi-fw pi-file', to: '/fileLayouts' },
                { type: 'item', label: 'Menus', icon: 'pi pi-fw pi-bars', to: '/menus' },
                { type: 'item', label: 'Itens de Menu', icon: 'pi pi-fw pi-list', to: '/menuItems' },
                { type: 'item', label: 'Tickets', icon: 'pi pi-fw pi-ticket', to: '/tickets' },
                { type: 'item', label: 'Propriedades de Ticket', icon: 'pi pi-fw pi-cog', to: '/ticketProperties' },
                { type: 'item', label: 'Status de Ticket', icon: 'pi pi-fw pi-check-circle', to: '/ticketStatuses' },
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
