import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import App from "./app";
import Home from './home/home';
import EfmigrationsHistoryList from './efmigrations-history/efmigrations-history-list';
import EfmigrationsHistoryAdd from './efmigrations-history/efmigrations-history-add';
import EfmigrationsHistoryEdit from './efmigrations-history/efmigrations-history-edit';
import AccessControlList from './access-control/access-control-list';
import AccessControlAdd from './access-control/access-control-add';
import AccessControlEdit from './access-control/access-control-edit';
import AddressList from './address/address-list';
import AddressAdd from './address/address-add';
import AddressEdit from './address/address-edit';
import ApplicationConfigList from './application-config/application-config-list';
import ApplicationConfigAdd from './application-config/application-config-add';
import ApplicationConfigEdit from './application-config/application-config-edit';
import AttachmentList from './attachment/attachment-list';
import AttachmentAdd from './attachment/attachment-add';
import AttachmentEdit from './attachment/attachment-edit';
import AuditList from './audit/audit-list';
import AuditAdd from './audit/audit-add';
import AuditEdit from './audit/audit-edit';
import CompanyList from './company/company-list';
import CompanyAdd from './company/company-add';
import CompanyEdit from './company/company-edit';
import CompanyContactList from './company-contact/company-contact-list';
import CompanyContactAdd from './company-contact/company-contact-add';
import CompanyContactEdit from './company-contact/company-contact-edit';
import ContactList from './contact/contact-list';
import ContactAdd from './contact/contact-add';
import ContactEdit from './contact/contact-edit';
import ContactRequestList from './contact-request/contact-request-list';
import ContactRequestAdd from './contact-request/contact-request-add';
import ContactRequestEdit from './contact-request/contact-request-edit';
import CustomerList from './customer/customer-list';
import CustomerAdd from './customer/customer-add';
import CustomerEdit from './customer/customer-edit';
import CustomerOrderList from './customer-order/customer-order-list';
import CustomerOrderAdd from './customer-order/customer-order-add';
import CustomerOrderEdit from './customer-order/customer-order-edit';
import CustomerTypeList from './customer-type/customer-type-list';
import CustomerTypeAdd from './customer-type/customer-type-add';
import CustomerTypeEdit from './customer-type/customer-type-edit';
import DependentList from './dependent/dependent-list';
import DependentAdd from './dependent/dependent-add';
import DependentEdit from './dependent/dependent-edit';
import EducationDegreeList from './education-degree/education-degree-list';
import EducationDegreeAdd from './education-degree/education-degree-add';
import EducationDegreeEdit from './education-degree/education-degree-edit';
import EmailHistoryList from './email-history/email-history-list';
import EmailHistoryAdd from './email-history/email-history-add';
import EmailHistoryEdit from './email-history/email-history-edit';
import EmployeeList from './employee/employee-list';
import EmployeeAdd from './employee/employee-add';
import EmployeeEdit from './employee/employee-edit';
import EquipamentList from './equipament/equipament-list';
import EquipamentAdd from './equipament/equipament-add';
import EquipamentEdit from './equipament/equipament-edit';
import EventList from './event/event-list';
import EventAdd from './event/event-add';
import EventEdit from './event/event-edit';
import EventCustomerList from './event-customer/event-customer-list';
import EventCustomerAdd from './event-customer/event-customer-add';
import EventCustomerEdit from './event-customer/event-customer-edit';
import EventEmployeeList from './event-employee/event-employee-list';
import EventEmployeeAdd from './event-employee/event-employee-add';
import EventEmployeeEdit from './event-employee/event-employee-edit';
import EventEquipamentList from './event-equipament/event-equipament-list';
import EventEquipamentAdd from './event-equipament/event-equipament-add';
import EventEquipamentEdit from './event-equipament/event-equipament-edit';
import EventMenuList from './event-menu/event-menu-list';
import EventMenuAdd from './event-menu/event-menu-add';
import EventMenuEdit from './event-menu/event-menu-edit';
import EventMenuItemList from './event-menu-item/event-menu-item-list';
import EventMenuItemAdd from './event-menu-item/event-menu-item-add';
import EventMenuItemEdit from './event-menu-item/event-menu-item-edit';
import FileControlList from './file-control/file-control-list';
import FileControlAdd from './file-control/file-control-add';
import FileControlEdit from './file-control/file-control-edit';
import FileLayoutList from './file-layout/file-layout-list';
import FileLayoutAdd from './file-layout/file-layout-add';
import FileLayoutEdit from './file-layout/file-layout-edit';
import LoginHistoryList from './login-history/login-history-list';
import LoginHistoryAdd from './login-history/login-history-add';
import LoginHistoryEdit from './login-history/login-history-edit';
import MenuList from './menu/menu-list';
import MenuAdd from './menu/menu-add';
import MenuEdit from './menu/menu-edit';
import MenuItemList from './menu-item/menu-item-list';
import MenuItemAdd from './menu-item/menu-item-add';
import MenuItemEdit from './menu-item/menu-item-edit';
import OrderList from './order/order-list';
import OrderAdd from './order/order-add';
import OrderEdit from './order/order-edit';
import OrderEmailList from './order-email/order-email-list';
import OrderEmailAdd from './order-email/order-email-add';
import OrderEmailEdit from './order-email/order-email-edit';
import OrderFileControlList from './order-file-control/order-file-control-list';
import OrderFileControlAdd from './order-file-control/order-file-control-add';
import OrderFileControlEdit from './order-file-control/order-file-control-edit';
import OrderPropertyList from './order-property/order-property-list';
import OrderPropertyAdd from './order-property/order-property-add';
import OrderPropertyEdit from './order-property/order-property-edit';
import OrderStatusList from './order-status/order-status-list';
import OrderStatusAdd from './order-status/order-status-add';
import OrderStatusEdit from './order-status/order-status-edit';
import OrderTrackingList from './order-tracking/order-tracking-list';
import OrderTrackingAdd from './order-tracking/order-tracking-add';
import OrderTrackingEdit from './order-tracking/order-tracking-edit';
import OrderTypeList from './order-type/order-type-list';
import OrderTypeAdd from './order-type/order-type-add';
import OrderTypeEdit from './order-type/order-type-edit';
import PartnerList from './partner/partner-list';
import PartnerAdd from './partner/partner-add';
import PartnerEdit from './partner/partner-edit';
import PartnerUnitList from './partner-unit/partner-unit-list';
import PartnerUnitAdd from './partner-unit/partner-unit-add';
import PartnerUnitEdit from './partner-unit/partner-unit-edit';
import PasswordHistoryList from './password-history/password-history-list';
import PasswordHistoryAdd from './password-history/password-history-add';
import PasswordHistoryEdit from './password-history/password-history-edit';
import PortfolioList from './portfolio/portfolio-list';
import PortfolioAdd from './portfolio/portfolio-add';
import PortfolioEdit from './portfolio/portfolio-edit';
import ProductAreaList from './product-area/product-area-list';
import ProductAreaAdd from './product-area/product-area-add';
import ProductAreaEdit from './product-area/product-area-edit';
import ProductCategoryList from './product-category/product-category-list';
import ProductCategoryAdd from './product-category/product-category-add';
import ProductCategoryEdit from './product-category/product-category-edit';
import RegistrationRequestList from './registration-request/registration-request-list';
import RegistrationRequestAdd from './registration-request/registration-request-add';
import RegistrationRequestEdit from './registration-request/registration-request-edit';
import RoleList from './role/role-list';
import RoleAdd from './role/role-add';
import RoleEdit from './role/role-edit';
import SpecialNeedsList from './special-needs/special-needs-list';
import SpecialNeedsAdd from './special-needs/special-needs-add';
import SpecialNeedsEdit from './special-needs/special-needs-edit';
import TicketList from './ticket/ticket-list';
import TicketAdd from './ticket/ticket-add';
import TicketEdit from './ticket/ticket-edit';
import TicketPropertyList from './ticket-property/ticket-property-list';
import TicketPropertyAdd from './ticket-property/ticket-property-add';
import TicketPropertyEdit from './ticket-property/ticket-property-edit';
import TicketStatusList from './ticket-status/ticket-status-list';
import TicketStatusAdd from './ticket-status/ticket-status-add';
import TicketStatusEdit from './ticket-status/ticket-status-edit';
import UserList from './user/user-list';
import UserAdd from './user/user-add';
import UserEdit from './user/user-edit';
import UserStatusList from './user-status/user-status-list';
import UserStatusAdd from './user-status/user-status-add';
import UserStatusEdit from './user-status/user-status-edit';
import Error from './error/error';


export default function AppRoutes() {
  const router = createBrowserRouter([
    {
      element: <App />,
      children: [
        { path: '', element: <Home /> },
        { path: 'efmigrationsHistories', element: <EfmigrationsHistoryList /> },
        { path: 'efmigrationsHistories/add', element: <EfmigrationsHistoryAdd /> },
        { path: 'efmigrationsHistories/edit/:migrationId', element: <EfmigrationsHistoryEdit /> },
        { path: 'accessControls', element: <AccessControlList /> },
        { path: 'accessControls/add', element: <AccessControlAdd /> },
        { path: 'accessControls/edit/:id', element: <AccessControlEdit /> },
        { path: 'addresses', element: <AddressList /> },
        { path: 'addresses/add', element: <AddressAdd /> },
        { path: 'addresses/edit/:id', element: <AddressEdit /> },
        { path: 'applicationConfigs', element: <ApplicationConfigList /> },
        { path: 'applicationConfigs/add', element: <ApplicationConfigAdd /> },
        { path: 'applicationConfigs/edit/:id', element: <ApplicationConfigEdit /> },
        { path: 'attachments', element: <AttachmentList /> },
        { path: 'attachments/add', element: <AttachmentAdd /> },
        { path: 'attachments/edit/:id', element: <AttachmentEdit /> },
        { path: 'audits', element: <AuditList /> },
        { path: 'audits/add', element: <AuditAdd /> },
        { path: 'audits/edit/:id', element: <AuditEdit /> },
        { path: 'companies', element: <CompanyList /> },
        { path: 'companies/add', element: <CompanyAdd /> },
        { path: 'companies/edit/:id', element: <CompanyEdit /> },
        { path: 'companyContacts', element: <CompanyContactList /> },
        { path: 'companyContacts/add', element: <CompanyContactAdd /> },
        { path: 'companyContacts/edit/:id', element: <CompanyContactEdit /> },
        { path: 'contacts', element: <ContactList /> },
        { path: 'contacts/add', element: <ContactAdd /> },
        { path: 'contacts/edit/:id', element: <ContactEdit /> },
        { path: 'contactRequests', element: <ContactRequestList /> },
        { path: 'contactRequests/add', element: <ContactRequestAdd /> },
        { path: 'contactRequests/edit/:id', element: <ContactRequestEdit /> },
        { path: 'customers', element: <CustomerList /> },
        { path: 'customers/add', element: <CustomerAdd /> },
        { path: 'customers/edit/:id', element: <CustomerEdit /> },
        { path: 'customerOrders', element: <CustomerOrderList /> },
        { path: 'customerOrders/add', element: <CustomerOrderAdd /> },
        { path: 'customerOrders/edit/:id', element: <CustomerOrderEdit /> },
        { path: 'customerTypes', element: <CustomerTypeList /> },
        { path: 'customerTypes/add', element: <CustomerTypeAdd /> },
        { path: 'customerTypes/edit/:id', element: <CustomerTypeEdit /> },
        { path: 'dependents', element: <DependentList /> },
        { path: 'dependents/add', element: <DependentAdd /> },
        { path: 'dependents/edit/:id', element: <DependentEdit /> },
        { path: 'educationDegrees', element: <EducationDegreeList /> },
        { path: 'educationDegrees/add', element: <EducationDegreeAdd /> },
        { path: 'educationDegrees/edit/:id', element: <EducationDegreeEdit /> },
        { path: 'emailHistories', element: <EmailHistoryList /> },
        { path: 'emailHistories/add', element: <EmailHistoryAdd /> },
        { path: 'emailHistories/edit/:id', element: <EmailHistoryEdit /> },
        { path: 'employees', element: <EmployeeList /> },
        { path: 'employees/add', element: <EmployeeAdd /> },
        { path: 'employees/edit/:id', element: <EmployeeEdit /> },
        { path: 'equipaments', element: <EquipamentList /> },
        { path: 'equipaments/add', element: <EquipamentAdd /> },
        { path: 'equipaments/edit/:id', element: <EquipamentEdit /> },
        { path: 'events', element: <EventList /> },
        { path: 'events/add', element: <EventAdd /> },
        { path: 'events/edit/:id', element: <EventEdit /> },
        { path: 'eventCustomers', element: <EventCustomerList /> },
        { path: 'eventCustomers/add', element: <EventCustomerAdd /> },
        { path: 'eventCustomers/edit/:id', element: <EventCustomerEdit /> },
        { path: 'eventEmployees', element: <EventEmployeeList /> },
        { path: 'eventEmployees/add', element: <EventEmployeeAdd /> },
        { path: 'eventEmployees/edit/:id', element: <EventEmployeeEdit /> },
        { path: 'eventEquipaments', element: <EventEquipamentList /> },
        { path: 'eventEquipaments/add', element: <EventEquipamentAdd /> },
        { path: 'eventEquipaments/edit/:id', element: <EventEquipamentEdit /> },
        { path: 'eventMenus', element: <EventMenuList /> },
        { path: 'eventMenus/add', element: <EventMenuAdd /> },
        { path: 'eventMenus/edit/:id', element: <EventMenuEdit /> },
        { path: 'eventMenuItems', element: <EventMenuItemList /> },
        { path: 'eventMenuItems/add', element: <EventMenuItemAdd /> },
        { path: 'eventMenuItems/edit/:id', element: <EventMenuItemEdit /> },
        { path: 'fileControls', element: <FileControlList /> },
        { path: 'fileControls/add', element: <FileControlAdd /> },
        { path: 'fileControls/edit/:id', element: <FileControlEdit /> },
        { path: 'fileLayouts', element: <FileLayoutList /> },
        { path: 'fileLayouts/add', element: <FileLayoutAdd /> },
        { path: 'fileLayouts/edit/:id', element: <FileLayoutEdit /> },
        { path: 'loginHistories', element: <LoginHistoryList /> },
        { path: 'loginHistories/add', element: <LoginHistoryAdd /> },
        { path: 'loginHistories/edit/:id', element: <LoginHistoryEdit /> },
        { path: 'menus', element: <MenuList /> },
        { path: 'menus/add', element: <MenuAdd /> },
        { path: 'menus/edit/:id', element: <MenuEdit /> },
        { path: 'menuItems', element: <MenuItemList /> },
        { path: 'menuItems/add', element: <MenuItemAdd /> },
        { path: 'menuItems/edit/:id', element: <MenuItemEdit /> },
        { path: 'orders', element: <OrderList /> },
        { path: 'orders/add', element: <OrderAdd /> },
        { path: 'orders/edit/:id', element: <OrderEdit /> },
        { path: 'orderEmails', element: <OrderEmailList /> },
        { path: 'orderEmails/add', element: <OrderEmailAdd /> },
        { path: 'orderEmails/edit/:id', element: <OrderEmailEdit /> },
        { path: 'orderFileControls', element: <OrderFileControlList /> },
        { path: 'orderFileControls/add', element: <OrderFileControlAdd /> },
        { path: 'orderFileControls/edit/:id', element: <OrderFileControlEdit /> },
        { path: 'orderProperties', element: <OrderPropertyList /> },
        { path: 'orderProperties/add', element: <OrderPropertyAdd /> },
        { path: 'orderProperties/edit/:id', element: <OrderPropertyEdit /> },
        { path: 'orderStatuses', element: <OrderStatusList /> },
        { path: 'orderStatuses/add', element: <OrderStatusAdd /> },
        { path: 'orderStatuses/edit/:id', element: <OrderStatusEdit /> },
        { path: 'orderTrackings', element: <OrderTrackingList /> },
        { path: 'orderTrackings/add', element: <OrderTrackingAdd /> },
        { path: 'orderTrackings/edit/:id', element: <OrderTrackingEdit /> },
        { path: 'orderTypes', element: <OrderTypeList /> },
        { path: 'orderTypes/add', element: <OrderTypeAdd /> },
        { path: 'orderTypes/edit/:id', element: <OrderTypeEdit /> },
        { path: 'partners', element: <PartnerList /> },
        { path: 'partners/add', element: <PartnerAdd /> },
        { path: 'partners/edit/:id', element: <PartnerEdit /> },
        { path: 'partnerUnits', element: <PartnerUnitList /> },
        { path: 'partnerUnits/add', element: <PartnerUnitAdd /> },
        { path: 'partnerUnits/edit/:id', element: <PartnerUnitEdit /> },
        { path: 'passwordHistories', element: <PasswordHistoryList /> },
        { path: 'passwordHistories/add', element: <PasswordHistoryAdd /> },
        { path: 'passwordHistories/edit/:id', element: <PasswordHistoryEdit /> },
        { path: 'portfolios', element: <PortfolioList /> },
        { path: 'portfolios/add', element: <PortfolioAdd /> },
        { path: 'portfolios/edit/:id', element: <PortfolioEdit /> },
        { path: 'productAreas', element: <ProductAreaList /> },
        { path: 'productAreas/add', element: <ProductAreaAdd /> },
        { path: 'productAreas/edit/:id', element: <ProductAreaEdit /> },
        { path: 'productCategories', element: <ProductCategoryList /> },
        { path: 'productCategories/add', element: <ProductCategoryAdd /> },
        { path: 'productCategories/edit/:id', element: <ProductCategoryEdit /> },
        { path: 'registrationRequests', element: <RegistrationRequestList /> },
        { path: 'registrationRequests/add', element: <RegistrationRequestAdd /> },
        { path: 'registrationRequests/edit/:id', element: <RegistrationRequestEdit /> },
        { path: 'roles', element: <RoleList /> },
        { path: 'roles/add', element: <RoleAdd /> },
        { path: 'roles/edit/:id', element: <RoleEdit /> },
        { path: 'specialNeedss', element: <SpecialNeedsList /> },
        { path: 'specialNeedss/add', element: <SpecialNeedsAdd /> },
        { path: 'specialNeedss/edit/:id', element: <SpecialNeedsEdit /> },
        { path: 'tickets', element: <TicketList /> },
        { path: 'tickets/add', element: <TicketAdd /> },
        { path: 'tickets/edit/:id', element: <TicketEdit /> },
        { path: 'ticketProperties', element: <TicketPropertyList /> },
        { path: 'ticketProperties/add', element: <TicketPropertyAdd /> },
        { path: 'ticketProperties/edit/:id', element: <TicketPropertyEdit /> },
        { path: 'ticketStatuses', element: <TicketStatusList /> },
        { path: 'ticketStatuses/add', element: <TicketStatusAdd /> },
        { path: 'ticketStatuses/edit/:id', element: <TicketStatusEdit /> },
        { path: 'users', element: <UserList /> },
        { path: 'users/add', element: <UserAdd /> },
        { path: 'users/edit/:id', element: <UserEdit /> },
        { path: 'userStatuses', element: <UserStatusList /> },
        { path: 'userStatuses/add', element: <UserStatusAdd /> },
        { path: 'userStatuses/edit/:id', element: <UserStatusEdit /> },
        { path: 'error', element: <Error /> },
        { path: '*', element: <Error /> }
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}
