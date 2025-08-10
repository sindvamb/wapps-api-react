import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Tipos
type NavItem = {
  path: string;
  translationKey: string;
  icon: React.ReactNode;
};

type NavGroup = {
  title: string;
  icon: React.ReactNode;
  items: NavItem[];
  defaultOpen?: boolean;
};

interface SidebarProps {
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

// Ícones do Heroicons
const ChevronDownIcon = ({ className = '' }: { className?: string }) => (
  <svg className={`w-4 h-4 ${className}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

const ChevronRightIcon = ({ className = '' }: { className?: string }) => (
  <svg className={`w-4 h-4 ${className}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
  </svg>
);

// Ícones para os itens de navegação
const HomeIcon = ({ className = '' }: { className?: string }) => (
  <svg className={`w-5 h-5 ${className}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
  </svg>
);

const UserGroupIcon = ({ className = '' }: { className?: string }) => (
  <svg className={`w-5 h-5 ${className}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z" />
  </svg>
);

const BuildingIcon = ({ className = '' }: { className?: string }) => (
  <svg className={`w-5 h-5 ${className}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
  </svg>
);

const UserIcon = ({ className = '' }: { className?: string }) => (
  <svg className={`w-5 h-5 ${className}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
  </svg>
);

const CalendarIcon = ({ className = '' }: { className?: string }) => (
  <svg className={`w-5 h-5 ${className}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
  </svg>
);

const ShoppingCartIcon = ({ className = '' }: { className?: string }) => (
  <svg className={`w-5 h-5 ${className}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
  </svg>
);

const CubeIcon = ({ className = '' }: { className?: string }) => (
  <svg className={`w-5 h-5 ${className}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
  </svg>
);

const CollectionIcon = ({ className = '' }: { className?: string }) => (
  <svg className={`w-5 h-5 ${className}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
  </svg>
);

const CogIcon = ({ className = '' }: { className?: string }) => (
  <svg className={`w-5 h-5 ${className}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 110-6 3 3 0 010 6z" clipRule="evenodd" />
  </svg>
);

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, toggleCollapse }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  // Grupos de navegação
  const navGroups: NavGroup[] = [
    {
      title: 'navigation.groups.administration',
      icon: <CogIcon className="text-gray-400" />,
      defaultOpen: false,
      items: [
        { path: '/accessControls', translationKey: 'accessControl.list.headline', icon: <UserGroupIcon className="text-gray-400" /> },
        { path: '/applicationConfigs', translationKey: 'applicationConfig.list.headline', icon: <CogIcon className="text-gray-400" /> },
        { path: '/audits', translationKey: 'audit.list.headline', icon: <CollectionIcon className="text-gray-400" /> },
        { path: '/roles', translationKey: 'role.list.headline', icon: <UserGroupIcon className="text-gray-400" /> },
        { path: '/users', translationKey: 'user.list.headline', icon: <UserIcon className="text-gray-400" /> },
        { path: '/userStatuses', translationKey: 'userStatus.list.headline', icon: <UserIcon className="text-gray-400" /> },
      ],
    },
    {
      title: 'navigation.groups.customers',
      icon: <UserGroupIcon className="text-gray-400" />,
      defaultOpen: true,
      items: [
        { path: '/customers', translationKey: 'customer.list.headline', icon: <UserIcon className="text-gray-400" /> },
        { path: '/customerTypes', translationKey: 'customerType.list.headline', icon: <UserGroupIcon className="text-gray-400" /> },
        { path: '/customerOrders', translationKey: 'customerOrder.list.headline', icon: <ShoppingCartIcon className="text-gray-400" /> },
        { path: '/dependents', translationKey: 'dependent.list.headline', icon: <UserIcon className="text-gray-400" /> },
      ],
    },
    {
      title: 'navigation.groups.companies',
      icon: <BuildingIcon className="text-gray-400" />,
      defaultOpen: true,
      items: [
        { path: '/companies', translationKey: 'company.list.headline', icon: <BuildingIcon className="text-gray-400" /> },
        { path: '/companyContacts', translationKey: 'companyContact.list.headline', icon: <UserIcon className="text-gray-400" /> },
        { path: '/partners', translationKey: 'partner.list.headline', icon: <UserGroupIcon className="text-gray-400" /> },
        { path: '/partnerUnits', translationKey: 'partnerUnit.list.headline', icon: <BuildingIcon className="text-gray-400" /> },
      ],
    },
    {
      title: 'navigation.groups.contacts',
      icon: <UserIcon className="text-gray-400" />,
      defaultOpen: true,
      items: [
        { path: '/contacts', translationKey: 'contact.list.headline', icon: <UserIcon className="text-gray-400" /> },
        { path: '/contactRequests', translationKey: 'contactRequest.list.headline', icon: <CollectionIcon className="text-gray-400" /> },
      ],
    },
    {
      title: 'navigation.groups.events',
      icon: <CalendarIcon className="text-gray-400" />,
      defaultOpen: true,
      items: [
        { path: '/events', translationKey: 'event.list.headline', icon: <CalendarIcon className="text-gray-400" /> },
        { path: '/eventCustomers', translationKey: 'eventCustomer.list.headline', icon: <UserIcon className="text-gray-400" /> },
        { path: '/eventEmployees', translationKey: 'eventEmployee.list.headline', icon: <UserGroupIcon className="text-gray-400" /> },
        { path: '/eventEquipaments', translationKey: 'eventEquipament.list.headline', icon: <CubeIcon className="text-gray-400" /> },
        { path: '/eventMenus', translationKey: 'eventMenu.list.headline', icon: <CollectionIcon className="text-gray-400" /> },
        { path: '/eventMenuItems', translationKey: 'eventMenuItem.list.headline', icon: <CollectionIcon className="text-gray-400" /> },
      ],
    },
    {
      title: 'navigation.groups.orders',
      icon: <ShoppingCartIcon className="text-gray-400" />,
      defaultOpen: false,
      items: [
        { path: '/orders', translationKey: 'order.list.headline', icon: <ShoppingCartIcon className="text-gray-400" /> },
        { path: '/orderEmails', translationKey: 'orderEmail.list.headline', icon: <CollectionIcon className="text-gray-400" /> },
        { path: '/orderFileControls', translationKey: 'orderFileControl.list.headline', icon: <CollectionIcon className="text-gray-400" /> },
        { path: '/orderProperties', translationKey: 'orderProperty.list.headline', icon: <CollectionIcon className="text-gray-400" /> },
        { path: '/orderStatuses', translationKey: 'orderStatus.list.headline', icon: <CollectionIcon className="text-gray-400" /> },
        { path: '/orderTrackings', translationKey: 'orderTracking.list.headline', icon: <CollectionIcon className="text-gray-400" /> },
        { path: '/orderTypes', translationKey: 'orderType.list.headline', icon: <CollectionIcon className="text-gray-400" /> },
      ],
    },
    {
      title: 'navigation.groups.products',
      icon: <CubeIcon className="text-gray-400" />,
      defaultOpen: false,
      items: [
        { path: '/productAreas', translationKey: 'productArea.list.headline', icon: <CollectionIcon className="text-gray-400" /> },
        { path: '/productCategories', translationKey: 'productCategory.list.headline', icon: <CollectionIcon className="text-gray-400" /> },
      ],
    },
    {
      title: 'navigation.groups.others',
      icon: <CollectionIcon className="text-gray-400" />,
      defaultOpen: false,
      items: [
        { path: '/addresses', translationKey: 'address.list.headline', icon: <CollectionIcon className="text-gray-400" /> },
        { path: '/attachments', translationKey: 'attachment.list.headline', icon: <CollectionIcon className="text-gray-400" /> },
        { path: '/educationDegrees', translationKey: 'educationDegree.list.headline', icon: <CollectionIcon className="text-gray-400" /> },
        { path: '/employees', translationKey: 'employee.list.headline', icon: <UserIcon className="text-gray-400" /> },
        { path: '/equipaments', translationKey: 'equipament.list.headline', icon: <CubeIcon className="text-gray-400" /> },
        { path: '/fileLayouts', translationKey: 'fileLayout.list.headline', icon: <CollectionIcon className="text-gray-400" /> },
        { path: '/menus', translationKey: 'menu.list.headline', icon: <CollectionIcon className="text-gray-400" /> },
        { path: '/menuItems', translationKey: 'menuItem.list.headline', icon: <CollectionIcon className="text-gray-400" /> },
        { path: '/tickets', translationKey: 'ticket.list.headline', icon: <CollectionIcon className="text-gray-400" /> },
        { path: '/ticketProperties', translationKey: 'ticketProperty.list.headline', icon: <CollectionIcon className="text-gray-400" /> },
        { path: '/ticketStatuses', translationKey: 'ticketStatus.list.headline', icon: <CollectionIcon className="text-gray-400" /> },
      ],
    },
  ];

  // Inicializa os grupos expandidos apenas uma vez
  useEffect(() => {
    // Se não houver grupos expandidos, inicializa com os grupos padrão
    if (Object.keys(expandedGroups).length === 0) {
      const initialExpanded: Record<string, boolean> = {};
      navGroups.forEach(group => {
        if (group.defaultOpen) {
          initialExpanded[group.title] = true;
        }
      });
      setExpandedGroups(initialExpanded);
    }
  }, []); // Executa apenas uma vez na montagem

  // Atualiza os grupos expandidos quando o sidebar é recolhido/expandido
  useEffect(() => {
    if (isCollapsed) {
      // Fecha todos os grupos quando o sidebar é recolhido
      setExpandedGroups({});
    } else if (Object.keys(expandedGroups).length === 0) {
      // Ao expandir, restaura os grupos padrão apenas se não houver estado salvo
      const initialExpanded: Record<string, boolean> = {};
      navGroups.forEach(group => {
        if (group.defaultOpen) {
          initialExpanded[group.title] = true;
        }
      });
      setExpandedGroups(initialExpanded);
    }
  }, [isCollapsed]); // Depende apenas de isCollapsed

  // Alterna a expansão de um grupo
  const toggleGroup = (groupTitle: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupTitle]: !prev[groupTitle]
    }));
  };

  // Verifica se um caminho está ativo
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  // Verifica se algum item de um grupo está ativo
  const isGroupActive = (group: NavGroup) => {
    return group.items.some(item => isActive(item.path));
  };

  return (
    <div className={`bg-gray-800 text-white h-screen flex flex-col ${isCollapsed ? 'w-16' : 'w-64'} transition-all duration-300`}>
      {/* Cabeçalho */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!isCollapsed && (
          <h2 className="text-xl font-semibold">{t('navigation.title')}</h2>
        )}
        <button
          onClick={toggleCollapse}
          className="p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          aria-label={isCollapsed ? t('navigation.expand') : t('navigation.collapse')}
        >
          {isCollapsed ? (
            <ChevronRightIcon className="w-5 h-5" />
          ) : (
            <ChevronDownIcon className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Navegação */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="py-2">
          {/* Link para a página inicial */}
          <li className="mb-2">
            <Link
              to="/"
              className={`flex items-center px-4 py-3 hover:bg-gray-700 ${
                location.pathname === '/' ? 'bg-blue-600' : ''
              }`}
            >
              <HomeIcon className="w-5 h-5" />
              {!isCollapsed && <span className="ml-3">{t('navigation.home')}</span>}
            </Link>
          </li>

          {/* Grupos de navegação */}
          {navGroups.map((group) => {
            const isGroupExpanded = expandedGroups[group.title] && !isCollapsed;
            const groupIsActive = isGroupActive(group);

            return (
              <li key={group.title} className="mb-1">
                <button
                  onClick={() => toggleGroup(group.title)}
                  className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-700 ${
                    groupIsActive ? 'bg-gray-900' : ''
                  }`}
                  title={isCollapsed ? t(group.title) : ''}
                >
                  <div className="flex items-center">
                    <span className={`${groupIsActive ? 'text-white' : 'text-gray-400'}`}>
                      {group.icon}
                    </span>
                    {!isCollapsed && <span className="ml-3">{t(group.title)}</span>}
                  </div>
                  {!isCollapsed && (
                    isGroupExpanded ? (
                      <ChevronDownIcon className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronRightIcon className="w-4 h-4 text-gray-400" />
                    )
                  )}
                </button>

                {/* Itens do grupo */}
                {!isCollapsed && isGroupExpanded && (
                  <ul className="bg-gray-900">
                    {group.items.map((item) => {
                      const isItemActive = isActive(item.path);
                      return (
                        <li key={item.path}>
                          <Link
                            to={item.path}
                            className={`flex items-center px-8 py-2 text-sm hover:bg-gray-800 ${
                              isItemActive ? 'bg-blue-600 text-white' : 'text-gray-300'
                            }`}
                          >
                            <span className={`mr-2 ${isItemActive ? 'text-white' : 'text-gray-400'}`}>
                              {item.icon}
                            </span>
                            {t(item.translationKey)}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Rodapé */}
      {/*<div className="p-4 border-t border-gray-700">*/}
      {/*  <div className="flex items-center">*/}
      {/*    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">*/}
      {/*      <UserIcon className="w-4 h-4 text-white" />*/}
      {/*    </div>*/}
      {/*    {!isCollapsed && (*/}
      {/*      <div className="ml-3">*/}
      {/*        <p className="text-sm font-medium">Usuário Admin</p>*/}
      {/*        <p className="text-xs text-gray-400">admin@example.com</p>*/}
      {/*      </div>*/}
      {/*    )}*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
};

export default Sidebar;
