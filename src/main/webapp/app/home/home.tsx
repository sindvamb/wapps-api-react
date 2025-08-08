import React from 'react';
import { Link } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import useDocumentTitle from 'app/common/use-document-title';
import './home.css';


export default function Home() {
  const { t } = useTranslation();
  useDocumentTitle(t('home.index.headline'));

  return (<>
    <h1 className="grow text-3xl md:text-4xl font-medium mb-8">{t('home.index.headline')}</h1>
    <p className="mb-4"><Trans i18nKey="home.index.text" components={{ a: <a />, strong: <strong /> }} /></p>
    <p className="mb-12">
      <span>{t('home.index.swagger.text')}</span>
      <span> </span>
      <a href={process.env.API_PATH + '/swagger-ui.html'} target="_blank" className="underline">{t('home.index.swagger.link')}</a>.
    </p>
    <div className="md:w-2/5 mb-12">
      <h4 className="text-2xl font-medium mb-4">{t('home.index.exploreEntities')}</h4>
      <div className="flex flex-col border border-gray-300 rounded">
        <Link to="/accessControls" className="w-full border-gray-300 hover:bg-gray-100 border-b px-4 py-2">{t('accessControl.list.headline')}</Link>
        <Link to="/addresses" className="w-full border-gray-300 hover:bg-gray-100 border-b px-4 py-2">{t('address.list.headline')}</Link>
        <Link to="/applicationConfigs" className="w-full border-gray-300 hover:bg-gray-100 border-b px-4 py-2">{t('applicationConfig.list.headline')}</Link>
        <Link to="/attachments" className="w-full border-gray-300 hover:bg-gray-100 border-b px-4 py-2">{t('attachment.list.headline')}</Link>
        <Link to="/audits" className="w-full border-gray-300 hover:bg-gray-100 border-b px-4 py-2">{t('audit.list.headline')}</Link>
        <Link to="/companies" className="w-full border-gray-300 hover:bg-gray-100 border-b px-4 py-2">{t('company.list.headline')}</Link>
        <Link to="/companyContacts" className="w-full border-gray-300 hover:bg-gray-100 border-b px-4 py-2">{t('companyContact.list.headline')}</Link>
        <Link to="/contacts" className="w-full border-gray-300 hover:bg-gray-100 border-b px-4 py-2">{t('contact.list.headline')}</Link>
        <Link to="/contactRequests" className="w-full border-gray-300 hover:bg-gray-100 border-b px-4 py-2">{t('contactRequest.list.headline')}</Link>
        <Link to="/customers" className="w-full border-gray-300 hover:bg-gray-100 border-b px-4 py-2">{t('customer.list.headline')}</Link>
        <Link to="/customerOrders" className="w-full border-gray-300 hover:bg-gray-100 border-b px-4 py-2">{t('customerOrder.list.headline')}</Link>
        <Link to="/customerTypes" className="w-full border-gray-300 hover:bg-gray-100 border-b px-4 py-2">{t('customerType.list.headline')}</Link>
        <Link to="/dependents" className="w-full border-gray-300 hover:bg-gray-100 border-b px-4 py-2">{t('dependent.list.headline')}</Link>
        <Link to="/educationDegrees" className="w-full border-gray-300 hover:bg-gray-100 border-b px-4 py-2">{t('educationDegree.list.headline')}</Link>
        <Link to="/emailHistories" className="w-full border-gray-300 hover:bg-gray-100 border-b px-4 py-2">{t('emailHistory.list.headline')}</Link>
        <Link to="/employees" className="w-full border-gray-300 hover:bg-gray-100 border-b px-4 py-2">{t('employee.list.headline')}</Link>
        <Link to="/equipaments" className="w-full border-gray-300 hover:bg-gray-100 border-b px-4 py-2">{t('equipament.list.headline')}</Link>
        <Link to="/events" className="w-full border-gray-300 hover:bg-gray-100 border-b px-4 py-2">{t('event.list.headline')}</Link>
        <Link to="/eventCustomers" className="w-full border-gray-300 hover:bg-gray-100 border-b px-4 py-2">{t('eventCustomer.list.headline')}</Link>
        <Link to="/eventEmployees" className="w-full border-gray-300 hover:bg-gray-100 border-b px-4 py-2">{t('eventEmployee.list.headline')}</Link>
        <Link to="/eventEquipaments" className="w-full border-gray-300 hover:bg-gray-100 border-b px-4 py-2">{t('eventEquipament.list.headline')}</Link>
        <Link to="/eventMenus" className="w-full border-gray-300 hover:bg-gray-100 border-b px-4 py-2">{t('eventMenu.list.headline')}</Link>
        <Link to="/eventMenuItems" className="w-full border-gray-300 hover:bg-gray-100 border-b px-4 py-2">{t('eventMenuItem.list.headline')}</Link>
        <Link to="/fileControls" className="w-full border-gray-300 hover:bg-gray-100 border-b px-4 py-2">{t('fileControl.list.headline')}</Link>
        <Link to="/fileLayouts" className="w-full border-gray-300 hover:bg-gray-100 border-b px-4 py-2">{t('fileLayout.list.headline')}</Link>
        <Link to="/loginHistories" className="w-full border-gray-300 hover:bg-gray-100 border-b px-4 py-2">{t('loginHistory.list.headline')}</Link>
        <Link to="/menus" className="w-full border-gray-300 hover:bg-gray-100 border-b px-4 py-2">{t('menu.list.headline')}</Link>
        <Link to="/menuItems" className="w-full border-gray-300 hover:bg-gray-100 border-b px-4 py-2">{t('menuItem.list.headline')}</Link>
        <Link to="/orders" className="w-full border-gray-300 hover:bg-gray-100 border-b px-4 py-2">{t('order.list.headline')}</Link>
        <Link to="/orderEmails" className="w-full border-gray-300 hover:bg-gray-100 border-b px-4 py-2">{t('orderEmail.list.headline')}</Link>
        <Link to="/orderFileControls" className="w-full border-gray-300 hover:bg-gray-100 border-b px-4 py-2">{t('orderFileControl.list.headline')}</Link>
        <Link to="/orderProperties" className="w-full border-gray-300 hover:bg-gray-100 border-b px-4 py-2">{t('orderProperty.list.headline')}</Link>
        <Link to="/orderStatuses" className="w-full border-gray-300 hover:bg-gray-100 border-b px-4 py-2">{t('orderStatus.list.headline')}</Link>
        <Link to="/orderTrackings" className="w-full border-gray-300 hover:bg-gray-100 border-b px-4 py-2">{t('orderTracking.list.headline')}</Link>
        <Link to="/orderTypes" className="w-full border-gray-300 hover:bg-gray-100 border-b px-4 py-2">{t('orderType.list.headline')}</Link>
        <Link to="/partners" className="w-full border-gray-300 hover:bg-gray-100 border-b px-4 py-2">{t('partner.list.headline')}</Link>
        <Link to="/partnerUnits" className="w-full border-gray-300 hover:bg-gray-100 border-b px-4 py-2">{t('partnerUnit.list.headline')}</Link>
        <Link to="/passwordHistories" className="w-full border-gray-300 hover:bg-gray-100 border-b px-4 py-2">{t('passwordHistory.list.headline')}</Link>
        <Link to="/portfolios" className="w-full border-gray-300 hover:bg-gray-100 border-b px-4 py-2">{t('portfolio.list.headline')}</Link>
        <Link to="/productAreas" className="w-full border-gray-300 hover:bg-gray-100 border-b px-4 py-2">{t('productArea.list.headline')}</Link>
        <Link to="/productCategories" className="w-full border-gray-300 hover:bg-gray-100 border-b px-4 py-2">{t('productCategory.list.headline')}</Link>
        <Link to="/registrationRequests" className="w-full border-gray-300 hover:bg-gray-100 border-b px-4 py-2">{t('registrationRequest.list.headline')}</Link>
        <Link to="/roles" className="w-full border-gray-300 hover:bg-gray-100 border-b px-4 py-2">{t('role.list.headline')}</Link>
        <Link to="/specialNeedss" className="w-full border-gray-300 hover:bg-gray-100 border-b px-4 py-2">{t('specialNeeds.list.headline')}</Link>
        <Link to="/tickets" className="w-full border-gray-300 hover:bg-gray-100 border-b px-4 py-2">{t('ticket.list.headline')}</Link>
        <Link to="/ticketProperties" className="w-full border-gray-300 hover:bg-gray-100 border-b px-4 py-2">{t('ticketProperty.list.headline')}</Link>
        <Link to="/ticketStatuses" className="w-full border-gray-300 hover:bg-gray-100 border-b px-4 py-2">{t('ticketStatus.list.headline')}</Link>
        <Link to="/users" className="w-full border-gray-300 hover:bg-gray-100 border-b px-4 py-2">{t('user.list.headline')}</Link>
        <Link to="/userStatuses" className="w-full border-gray-300 hover:bg-gray-100 rounded-b px-4 py-2">{t('userStatus.list.headline')}</Link>
      </div>
    </div>
  </>);
}
