
import React, { useRef, useContext, useState } from 'react';
import { LayoutContext } from './context/LayoutContext';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { Badge } from 'primereact/badge';
import { OverlayPanel } from 'primereact/overlaypanel';
import { InputText } from 'primereact/inputtext';
import { useNavigate } from 'react-router-dom';

const AppTopbar = () => {
    const { layoutState, onMenuToggle } = useContext(LayoutContext);
    const menu = useRef<Menu>(null);
    const op = useRef<OverlayPanel>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const notifications = [
        { text: 'Nova mensagem recebida', icon: 'pi pi-envelope', time: '5 min atrás' },
        { text: 'Novo usuário cadastrado', icon: 'pi pi-user-plus', time: '1 hora atrás' },
        { text: 'Atualização do sistema disponível', icon: 'pi pi-sync', time: 'Ontem' },
    ];

    const messages = [
        { text: 'Reunião hoje às 15:00', icon: 'pi pi-calendar', time: '10 min atrás' },
        { text: 'Relatório mensal aprovado', icon: 'pi pi-check-circle', time: '1 hora atrás' },
        { text: 'Novo acesso ao sistema', icon: 'pi pi-shield', time: 'Ontem' },
    ];

    const userMenuItems = [
        {
            label: 'Perfil',
            icon: 'pi pi-user',
            command: () => { navigate('/profile'); }
        },
        {
            label: 'Configurações',
            icon: 'pi pi-cog',
            command: () => { navigate('/settings'); }
        },
        {
            separator: true
        },
        {
            label: 'Sair',
            icon: 'pi pi-sign-out',
            command: () => { 
                // Implementar lógica de logout
                console.log('Logout');
                navigate('/login');
            }
        }
    ];

    const toggleUserMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (menu.current) {
            menu.current.toggle(event);
        }
    };

    const showSearch = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (op.current) {
            op.current.toggle(event);
        }
    };

    const search = () => {
        console.log('Pesquisar por:', searchTerm);
        // Implementar lógica de busca
    };

    return (
        <div className="layout-topbar">
            <div className="layout-topbar-left">
                <button 
                    type="button" 
                    className="p-link layout-menu-button"
                    onClick={onMenuToggle}
                >
                    <i className="pi pi-bars"></i>
                </button>
                <button 
                    className="p-link layout-topbar-logo"
                    onClick={() => navigate('/')}
                >
                    <span>SINDVAMB</span>
                </button>
            </div>

            <div className="layout-topbar-right">
                <div className="topbar-actions">
                    <button 
                        className="p-link search-btn"
                        onClick={showSearch}
                    >
                        <i className="pi pi-search"></i>
                    </button>

                    <OverlayPanel 
                        ref={op} 
                        className="search-panel"
                        dismissable={true}
                    >
                        <div className="p-inputgroup">
                            <InputText 
                                placeholder="Pesquisar..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && search()}
                            />
                            <Button 
                                icon="pi pi-search" 
                                onClick={search}
                            />
                        </div>
                    </OverlayPanel>

                    <div className="topbar-notifications">
                        <button className="p-link">
                            <i className="pi pi-bell"></i>
                            <Badge value="3" severity="danger"></Badge>
                        </button>
                        <div className="notification-panel">
                            <div className="notification-header">
                                <h4>Notificações</h4>
                                <a href="#" className="mark-all-read">Marcar todas como lidas</a>
                            </div>
                            <div className="notification-list">
                                {notifications.map((item, i) => (
                                    <div key={i} className="notification-item">
                                        <i className={`notification-icon ${item.icon}`}></i>
                                        <div className="notification-content">
                                            <p>{item.text}</p>
                                            <span className="notification-time">{item.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="notification-footer">
                                <a href="#">Ver todas as notificações</a>
                            </div>
                        </div>
                    </div>

                    <div className="topbar-messages">
                        <button className="p-link">
                            <i className="pi pi-envelope"></i>
                            <Badge value="2" severity="info"></Badge>
                        </button>
                        <div className="messages-panel">
                            <div className="messages-header">
                                <h4>Mensagens</h4>
                                <a href="#" className="mark-all-read">Marcar todas como lidas</a>
                            </div>
                            <div className="messages-list">
                                {messages.map((item, i) => (
                                    <div key={i} className="message-item">
                                        <i className={`message-icon ${item.icon}`}></i>
                                        <div className="message-content">
                                            <p>{item.text}</p>
                                            <span className="message-time">{item.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="messages-footer">
                                <a href="#">Ver todas as mensagens</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="user-profile">
                    <button 
                        className="p-link"
                        onClick={toggleUserMenu}
                        aria-haspopup="true"
                        aria-controls="user-menu"
                    >
                        <Avatar 
                            icon="pi pi-user" 
                            className="user-avatar"
                            shape="circle"
                        />
                        <span className="user-name">Admin</span>
                        <i className="pi pi-angle-down"></i>
                    </button>
                    <Menu 
                        model={userMenuItems} 
                        popup 
                        ref={menu} 
                        id="user-menu"
                        popupAlignment="right"
                    />
                </div>
            </div>
        </div>
    );
};

export default AppTopbar;
