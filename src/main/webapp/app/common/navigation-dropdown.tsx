import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type NavItem = {
  path: string;
  translationKey: string;
};

type NavGroup = {
  title: string;
  items: NavItem[];
};

const NavigationDropdown = () => {
  const { t } = useTranslation();

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
        { path: '/menus', translationKey: 'menu.list.headline' },
        { path: '/menuItems', translationKey: 'menuItem.list.headline' },
        { path: '/portfolios', translationKey: 'portfolio.list.headline' },
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
        { path: '/emailHistories', translationKey: 'emailHistory.list.headline' },
        { path: '/employees', translationKey: 'employee.list.headline' },
        { path: '/equipaments', translationKey: 'equipament.list.headline' },
        { path: '/fileControls', translationKey: 'fileControl.list.headline' },
        { path: '/fileLayouts', translationKey: 'fileLayout.list.headline' },
        { path: '/loginHistories', translationKey: 'loginHistory.list.headline' },
        { path: '/passwordHistories', translationKey: 'passwordHistory.list.headline' },
        { path: '/registrationRequests', translationKey: 'registrationRequest.list.headline' },
        { path: '/specialNeedss', translationKey: 'specialNeeds.list.headline' },
        { path: '/tickets', translationKey: 'ticket.list.headline' },
        { path: '/ticketProperties', translationKey: 'ticketProperty.list.headline' },
        { path: '/ticketStatuses', translationKey: 'ticketStatus.list.headline' },
      ],
    },
  ];

  return (
    <li className="relative group">
      <button
        type="button"
        className="js-dropdown block text-gray-500 p-2 cursor-pointer hover:text-gray-700"
        id="navbarEntitiesLink"
        aria-expanded="false"
      >
        <span>{t('navigation.entities')}</span>
        <span className="text-[9px] align-[3px] pl-0.5">&#9660;</span>
      </button>
      <div className="hidden group-hover:block absolute right-0 bg-white border border-gray-300 rounded shadow-lg w-64 max-h-[80vh] overflow-y-auto z-50">
        {navGroups.map((group, index) => (
          <div key={index} className="border-b border-gray-200 last:border-b-0">
            <h3 className="px-4 py-2 font-medium text-gray-700 bg-gray-50">
              {t(group.title)}
            </h3>
            <ul className="py-1">
              {group.items.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {t(item.translationKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </li>
  );
};

export default NavigationDropdown;
