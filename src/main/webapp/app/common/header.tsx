import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';


export default function Header() {
  const { t } = useTranslation();
  const headerRef = useRef<HTMLElement|null>(null);

  const handleClick = (event: Event) => {
    // close any open dropdown
    const $clickedDropdown = (event.target as HTMLElement).closest('.js-dropdown');
    const $dropdowns = headerRef.current!.querySelectorAll('.js-dropdown');
    $dropdowns.forEach(($dropdown:Element) => {
      if ($clickedDropdown !== $dropdown && $dropdown.getAttribute('data-dropdown-keepopen') !== 'true') {
        $dropdown.ariaExpanded = 'false';
        $dropdown.nextElementSibling!.classList.add('hidden');
      }
    });
    // toggle selected if applicable
    if ($clickedDropdown) {
      $clickedDropdown.ariaExpanded = '' + ($clickedDropdown.ariaExpanded !== 'true');
      $clickedDropdown.nextElementSibling!.classList.toggle('hidden');
    }
  };

  useEffect(() => {
    document.body.addEventListener('click', handleClick);
    return () => document.body.removeEventListener('click', handleClick);
  }, []);

  return (
    <header ref={headerRef} className="bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <nav className="flex flex-wrap items-center justify-between py-2">
          <Link to="/" className="flex py-1.5 mr-4">
            <img src="/images/logo.png" alt={t('app.title')} width="30" height="30" className="inline-block" />
            <span className="text-xl pl-3">{t('app.title')}</span>
          </Link>
          <button type="button" className="js-dropdown md:hidden border rounded cursor-pointer" data-dropdown-keepopen="true"
              aria-label={t('navigation.toggle')} aria-controls="navbarToggle" aria-expanded="false">
            <div className="space-y-1.5 my-2.5 mx-4">
              <div className="w-6 h-0.5 bg-gray-500"></div>
              <div className="w-6 h-0.5 bg-gray-500"></div>
              <div className="w-6 h-0.5 bg-gray-500"></div>
            </div>
          </button>
          <div className="hidden md:block flex grow md:grow-0 justify-end basis-full md:basis-auto pt-3 md:pt-1 pb-1" id="navbarToggle">
            <ul className="flex">
              <li>
                <Link to="/" className="block text-gray-500 p-2">{t('navigation.home')}</Link>
              </li>
              <li className="relative">
                <button type="button" className="js-dropdown block text-gray-500 p-2 cursor-pointer" id="navbarEntitiesLink"
                    aria-expanded="false">
                  <span>{t('navigation.entities')}</span>
                  <span className="text-[9px] align-[3px] pl-0.5">&#9660;</span>
                </button>
                <ul className="hidden block absolute right-0 bg-white border border-gray-300 rounded min-w-[10rem] py-2" aria-labelledby="navbarEntitiesLink">
                  <li><Link to="/efmigrationsHistories" className="inline-block w-full hover:bg-gray-200 px-4 py-1">{t('efmigrationsHistory.list.headline')}</Link></li>
                  <li><Link to="/accessControls" className="inline-block w-full hover:bg-gray-200 px-4 py-1">{t('accessControl.list.headline')}</Link></li>
                  <li><Link to="/addresses" className="inline-block w-full hover:bg-gray-200 px-4 py-1">{t('address.list.headline')}</Link></li>
                  <li><Link to="/applicationConfigs" className="inline-block w-full hover:bg-gray-200 px-4 py-1">{t('applicationConfig.list.headline')}</Link></li>
                  <li><Link to="/attachments" className="inline-block w-full hover:bg-gray-200 px-4 py-1">{t('attachment.list.headline')}</Link></li>
                  <li><Link to="/audits" className="inline-block w-full hover:bg-gray-200 px-4 py-1">{t('audit.list.headline')}</Link></li>
                  <li><Link to="/companies" className="inline-block w-full hover:bg-gray-200 px-4 py-1">{t('company.list.headline')}</Link></li>
                  <li><Link to="/companyContacts" className="inline-block w-full hover:bg-gray-200 px-4 py-1">{t('companyContact.list.headline')}</Link></li>
                  <li><Link to="/contacts" className="inline-block w-full hover:bg-gray-200 px-4 py-1">{t('contact.list.headline')}</Link></li>
                  <li><Link to="/contactRequests" className="inline-block w-full hover:bg-gray-200 px-4 py-1">{t('contactRequest.list.headline')}</Link></li>
                  <li><Link to="/customers" className="inline-block w-full hover:bg-gray-200 px-4 py-1">{t('customer.list.headline')}</Link></li>
                  <li><Link to="/customerOrders" className="inline-block w-full hover:bg-gray-200 px-4 py-1">{t('customerOrder.list.headline')}</Link></li>
                  <li><Link to="/customerTypes" className="inline-block w-full hover:bg-gray-200 px-4 py-1">{t('customerType.list.headline')}</Link></li>
                  <li><Link to="/dependents" className="inline-block w-full hover:bg-gray-200 px-4 py-1">{t('dependent.list.headline')}</Link></li>
                  <li><Link to="/educationDegrees" className="inline-block w-full hover:bg-gray-200 px-4 py-1">{t('educationDegree.list.headline')}</Link></li>
                  <li><Link to="/emailHistories" className="inline-block w-full hover:bg-gray-200 px-4 py-1">{t('emailHistory.list.headline')}</Link></li>
                  <li><Link to="/employees" className="inline-block w-full hover:bg-gray-200 px-4 py-1">{t('employee.list.headline')}</Link></li>
                  <li><Link to="/equipaments" className="inline-block w-full hover:bg-gray-200 px-4 py-1">{t('equipament.list.headline')}</Link></li>
                  <li><Link to="/events" className="inline-block w-full hover:bg-gray-200 px-4 py-1">{t('event.list.headline')}</Link></li>
                  <li><Link to="/eventCustomers" className="inline-block w-full hover:bg-gray-200 px-4 py-1">{t('eventCustomer.list.headline')}</Link></li>
                  <li><Link to="/eventEmployees" className="inline-block w-full hover:bg-gray-200 px-4 py-1">{t('eventEmployee.list.headline')}</Link></li>
                  <li><Link to="/eventEquipaments" className="inline-block w-full hover:bg-gray-200 px-4 py-1">{t('eventEquipament.list.headline')}</Link></li>
                  <li><Link to="/eventMenus" className="inline-block w-full hover:bg-gray-200 px-4 py-1">{t('eventMenu.list.headline')}</Link></li>
                  <li><Link to="/eventMenuItems" className="inline-block w-full hover:bg-gray-200 px-4 py-1">{t('eventMenuItem.list.headline')}</Link></li>
                  <li><Link to="/fileControls" className="inline-block w-full hover:bg-gray-200 px-4 py-1">{t('fileControl.list.headline')}</Link></li>
                  <li><Link to="/fileLayouts" className="inline-block w-full hover:bg-gray-200 px-4 py-1">{t('fileLayout.list.headline')}</Link></li>
                  <li><Link to="/loginHistories" className="inline-block w-full hover:bg-gray-200 px-4 py-1">{t('loginHistory.list.headline')}</Link></li>
                  <li><Link to="/menus" className="inline-block w-full hover:bg-gray-200 px-4 py-1">{t('menu.list.headline')}</Link></li>
                  <li><Link to="/menuItems" className="inline-block w-full hover:bg-gray-200 px-4 py-1">{t('menuItem.list.headline')}</Link></li>
                  <li><Link to="/orders" className="inline-block w-full hover:bg-gray-200 px-4 py-1">{t('order.list.headline')}</Link></li>
                  <li><Link to="/orderEmails" className="inline-block w-full hover:bg-gray-200 px-4 py-1">{t('orderEmail.list.headline')}</Link></li>
                  <li><Link to="/orderFileControls" className="inline-block w-full hover:bg-gray-200 px-4 py-1">{t('orderFileControl.list.headline')}</Link></li>
                  <li><Link to="/orderProperties" className="inline-block w-full hover:bg-gray-200 px-4 py-1">{t('orderProperty.list.headline')}</Link></li>
                  <li><Link to="/orderStatuses" className="inline-block w-full hover:bg-gray-200 px-4 py-1">{t('orderStatus.list.headline')}</Link></li>
                  <li><Link to="/orderTrackings" className="inline-block w-full hover:bg-gray-200 px-4 py-1">{t('orderTracking.list.headline')}</Link></li>
                  <li><Link to="/orderTypes" className="inline-block w-full hover:bg-gray-200 px-4 py-1">{t('orderType.list.headline')}</Link></li>
                  <li><Link to="/partners" className="inline-block w-full hover:bg-gray-200 px-4 py-1">{t('partner.list.headline')}</Link></li>
                  <li><Link to="/partnerUnits" className="inline-block w-full hover:bg-gray-200 px-4 py-1">{t('partnerUnit.list.headline')}</Link></li>
                  <li><Link to="/passwordHistories" className="inline-block w-full hover:bg-gray-200 px-4 py-1">{t('passwordHistory.list.headline')}</Link></li>
                  <li><Link to="/portfolios" className="inline-block w-full hover:bg-gray-200 px-4 py-1">{t('portfolio.list.headline')}</Link></li>
                  <li><Link to="/productAreas" className="inline-block w-full hover:bg-gray-200 px-4 py-1">{t('productArea.list.headline')}</Link></li>
                  <li><Link to="/productCategories" className="inline-block w-full hover:bg-gray-200 px-4 py-1">{t('productCategory.list.headline')}</Link></li>
                  <li><Link to="/registrationRequests" className="inline-block w-full hover:bg-gray-200 px-4 py-1">{t('registrationRequest.list.headline')}</Link></li>
                  <li><Link to="/roles" className="inline-block w-full hover:bg-gray-200 px-4 py-1">{t('role.list.headline')}</Link></li>
                  <li><Link to="/specialNeedss" className="inline-block w-full hover:bg-gray-200 px-4 py-1">{t('specialNeeds.list.headline')}</Link></li>
                  <li><Link to="/tickets" className="inline-block w-full hover:bg-gray-200 px-4 py-1">{t('ticket.list.headline')}</Link></li>
                  <li><Link to="/ticketProperties" className="inline-block w-full hover:bg-gray-200 px-4 py-1">{t('ticketProperty.list.headline')}</Link></li>
                  <li><Link to="/ticketStatuses" className="inline-block w-full hover:bg-gray-200 px-4 py-1">{t('ticketStatus.list.headline')}</Link></li>
                  <li><Link to="/users" className="inline-block w-full hover:bg-gray-200 px-4 py-1">{t('user.list.headline')}</Link></li>
                  <li><Link to="/userStatuses" className="inline-block w-full hover:bg-gray-200 px-4 py-1">{t('userStatus.list.headline')}</Link></li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
