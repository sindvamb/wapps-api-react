import React, { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';

// Ícones do Heroicons
const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
  </svg>
);

type NavItem = {
  path: string;
  translationKey: string;
};

type NavGroup = {
  title: string;
  items: NavItem[];
};

type SidebarProps = {
  isCollapsed: boolean;
  toggleCollapse: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, toggleCollapse }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  const navGroups: NavGroup[] = [
    {
      title: 'navigation.groups.administration',
      items: [
        { path: '/accessControls', translationKey: 'accessControl.list.headline' },
        { path: '/applicationConfigs', translationKey: 'applicationConfig.list.headline' },
        { path: '/audits', translationKey: 'audit.list.headline' },
        { path: '/roles', translationKey: 'role.list.headline' },
        { path: '/users', translationKey: 'user.list.headline' },
        { path: '/userStatuses', translationKey: 'userStatus.list.headline' },
      ],
    },
    {
      title: 'navigation.groups.customers',
      items: [
        { path: '/customers', translationKey: 'customer.list.headline' },
        { path: '/customerTypes', translationKey: 'customerType.list.headline' },
        { path: '/customerOrders', translationKey: 'customerOrder.list.headline' },
        { path: '/dependents', translationKey: 'dependent.list.headline' },
      ],
    },
    {
      title: 'navigation.groups.companies',
      items: [
        { path: '/companies', translationKey: 'company.list.headline' },
        { path: '/companyContacts', translationKey: 'companyContact.list.headline' },
        { path: '/partners', translationKey: 'partner.list.headline' },
        { path: '/partnerUnits', translationKey: 'partnerUnit.list.headline' },
      ],
    },
    {
      title: 'navigation.groups.contacts',
      items: [
        { path: '/contacts', translationKey: 'contact.list.headline' },
        { path: '/contactRequests', translationKey: 'contactRequest.list.headline' },
      ],
    },
    {
      title: 'navigation.groups.events',
      items: [
        { path: '/events', translationKey: 'event.list.headline' },
        { path: '/eventCustomers', translationKey: 'eventCustomer.list.headline' },
        { path: '/eventEmployees', translationKey: 'eventEmployee.list.headline' },
        { path: '/eventEquipaments', translationKey: 'eventEquipament.list.headline' },
        { path: '/eventMenus', translationKey: 'eventMenu.list.headline' },
        { path: '/eventMenuItems', translationKey: 'eventMenuItem.list.headline' },
      ],
    },
    {
      title: 'navigation.groups.orders',
      items: [
        { path: '/orders', translationKey: 'order.list.headline' },
        { path: '/orderEmails', translationKey: 'orderEmail.list.headline' },
        { path: '/orderFileControls', translationKey: 'orderFileControl.list.headline' },
        { path: '/orderProperties', translationKey: 'orderProperty.list.headline' },
        { path: '/orderStatuses', translationKey: 'orderStatus.list.headline' },
        { path: '/orderTrackings', translationKey: 'orderTracking.list.headline' },
        { path: '/orderTypes', translationKey: 'orderType.list.headline' },
      ],
    },
    {
      title: 'navigation.groups.products',
      items: [
        { path: '/productAreas', translationKey: 'productArea.list.headline' },
        { path: '/productCategories', translationKey: 'productCategory.list.headline' },
      ],
    },
    {
      title: 'navigation.groups.others',
      items: [
        { path: '/addresses', translationKey: 'address.list.headline' },
        { path: '/attachments', translationKey: 'attachment.list.headline' },
        { path: '/educationDegrees', translationKey: 'educationDegree.list.headline' },
        { path: '/employees', translationKey: 'employee.list.headline' },
        { path: '/equipaments', translationKey: 'equipament.list.headline' },
        { path: '/fileLayouts', translationKey: 'fileLayout.list.headline' },
        { path: '/menus', translationKey: 'menu.list.headline' },
        { path: '/menuItems', translationKey: 'menuItem.list.headline' },
        { path: '/tickets', translationKey: 'ticket.list.headline' },
        { path: '/ticketProperties', translationKey: 'ticketProperty.list.headline' },
        { path: '/ticketStatuses', translationKey: 'ticketStatus.list.headline' },
      ],
    },
  ];

  const toggleGroup = (groupTitle: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupTitle]: !prev[groupTitle],
    }));
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className={`
      fixed left-0 top-0 h-full bg-white shadow-lg transition-all duration-300 ease-in-out z-10
      ${isCollapsed ? 'w-16' : 'w-64'}
    `}>
      <div className="flex flex-col h-full">
        {/* Cabeçalho da Sidebar */}
        <div className="flex items-center justify-between p-4 border-b">
          {!isCollapsed && (
            <h2 className="text-xl font-semibold text-gray-800">Menu</h2>
          )}
          <button
            onClick={toggleCollapse}
            className="p-2 rounded-md hover:bg-gray-200 focus:outline-none"
            aria-label={isCollapsed ? 'Expandir menu' : 'Recolher menu'}
          >
            {isCollapsed ? (
              <ChevronRightIcon className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronRightIcon className="w-5 h-5 text-gray-600 transform rotate-180" />
            )}
          </button>
        </div>

        {/* Conteúdo da Sidebar */}
        <nav className="flex-1 overflow-y-auto">
          <div className="p-2">
            <Link
              to="/"
              className={`flex items-center p-2 rounded-md hover:bg-gray-100 ${
                isActive('/') ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
              }`}
            >
              <span className="ml-2">{t('navigation.home')}</span>
            </Link>
          </div>
          
          {navGroups.map((group) => {
            const isGroupExpanded = expandedGroups[group.title] ?? !isCollapsed;
            const hasActiveItem = group.items.some(item => isActive(item.path));
            
            return (
              <div key={group.title} className="mb-1">
                <button
                  onClick={() => toggleGroup(group.title)}
                  className={`w-full flex items-center justify-between p-2 rounded-md hover:bg-gray-100 text-left ${
                    hasActiveItem ? 'text-blue-600 font-medium' : 'text-gray-700'
                  }`}
                >
                  <span className="truncate">{t(group.title)}</span>
                  {isCollapsed ? null : (
                    <ChevronDownIcon
                      className={`w-4 h-4 transform transition-transform ${
                        isGroupExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </button>

                {(!isCollapsed || isGroupExpanded) && (
                  <div className="ml-4 mt-1 space-y-1">
                    {group.items.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`block p-2 text-sm rounded-md hover:bg-gray-100 ${
                          isActive(item.path)
                            ? 'bg-blue-50 text-blue-600 font-medium'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        {t(item.translationKey)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
