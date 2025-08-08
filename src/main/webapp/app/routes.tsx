import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";

// Páginas
// Rotas de AccessControl
import AccessControlList from './access-control/access-control-list';
import AccessControlAdd from './access-control/access-control-add';
import AccessControlEdit from './access-control/access-control-edit';

// Rotas de Address
import AddressList from './address/address-list';
import AddressAdd from './address/address-add';
import AddressEdit from './address/address-edit';

// Rotas de ApplicationConfig
import ApplicationConfigList from './application-config/application-config-list';
import ApplicationConfigAdd from './application-config/application-config-add';
import ApplicationConfigEdit from './application-config/application-config-edit';

// Rotas de Attachment
import AttachmentList from './attachment/attachment-list';
import AttachmentAdd from './attachment/attachment-add';
import AttachmentEdit from './attachment/attachment-edit';

// Rotas de Audit
import AuditList from './audit/audit-list';
import AuditAdd from './audit/audit-add';
import AuditEdit from './audit/audit-edit';

// Rotas de Company
import CompanyList from './company/company-list';
import CompanyAdd from './company/company-add';
import CompanyEdit from './company/company-edit';

// Rotas de CompanyContact
import CompanyContactList from './company-contact/company-contact-list';
import CompanyContactAdd from './company-contact/company-contact-add';
import CompanyContactEdit from './company-contact/company-contact-edit';

// Rotas de Contact
import ContactList from './contact/contact-list';
import ContactAdd from './contact/contact-add';
import ContactEdit from './contact/contact-edit';

// Rotas de ContactRequest
import ContactRequestList from './contact-request/contact-request-list';
import ContactRequestAdd from './contact-request/contact-request-add';
import ContactRequestEdit from './contact-request/contact-request-edit';

// Rotas de Customer
import CustomerList from './customer/customer-list';
import CustomerAdd from './customer/customer-add';
import CustomerEdit from './customer/customer-edit';

// Rotas de CustomerOrder
import CustomerOrderList from './customer-order/customer-order-list';
import CustomerOrderAdd from './customer-order/customer-order-add';
import CustomerOrderEdit from './customer-order/customer-order-edit';

// Rotas de CustomerType
import CustomerTypeList from './customer-type/customer-type-list';
import CustomerTypeAdd from './customer-type/customer-type-add';
import CustomerTypeEdit from './customer-type/customer-type-edit';

// Rotas de Dependent
import DependentList from './dependent/dependent-list';
import DependentAdd from './dependent/dependent-add';
import DependentEdit from './dependent/dependent-edit';

// Rotas de EducationDegree
import EducationDegreeList from './education-degree/education-degree-list';
import EducationDegreeAdd from './education-degree/education-degree-add';
import EducationDegreeEdit from './education-degree/education-degree-edit';

// Rotas de EmailHistory
import EmailHistoryList from './email-history/email-history-list';
import EmailHistoryAdd from './email-history/email-history-add';
import EmailHistoryEdit from './email-history/email-history-edit';
import Home from "./home/home";
import {Outlet} from 'react-router-dom';

// Componente de layout que será usado nas rotas
function AppLayout({ children }: { children: React.ReactNode }) {
  return <div className="app-layout">{children}</div>;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout><Outlet /></AppLayout>}>
        <Route index element={<Home />} />
        
        {/* Rotas de AccessControl */}
        <Route path="accessControls">
          <Route index element={<AccessControlList />} />
          <Route path="add" element={<AccessControlAdd />} />
          <Route path="edit/:id" element={<AccessControlEdit />} />
        </Route>
        
        {/* Rotas de Address */}
        <Route path="addresses">
          <Route index element={<AddressList />} />
          <Route path="add" element={<AddressAdd />} />
          <Route path="edit/:id" element={<AddressEdit />} />
        </Route>
        
        {/* Rotas de ApplicationConfig */}
        <Route path="applicationConfigs">
          <Route index element={<ApplicationConfigList />} />
          <Route path="add" element={<ApplicationConfigAdd />} />
          <Route path="edit/:id" element={<ApplicationConfigEdit />} />
        </Route>
        
        {/* Rotas de Attachment */}
        <Route path="attachments">
          <Route index element={<AttachmentList />} />
          <Route path="add" element={<AttachmentAdd />} />
          <Route path="edit/:id" element={<AttachmentEdit />} />
        </Route>
        
        {/* Rotas de Audit */}
        <Route path="audits">
          <Route index element={<AuditList />} />
          <Route path="add" element={<AuditAdd />} />
          <Route path="edit/:id" element={<AuditEdit />} />
        </Route>
        
        {/* Rotas de Company */}
        <Route path="companies">
          <Route index element={<CompanyList />} />
          <Route path="add" element={<CompanyAdd />} />
          <Route path="edit/:id" element={<CompanyEdit />} />
        </Route>
        
        {/* Rotas de CompanyContact */}
        <Route path="companyContacts">
          <Route index element={<CompanyContactList />} />
          <Route path="add" element={<CompanyContactAdd />} />
          <Route path="edit/:id" element={<CompanyContactEdit />} />
        </Route>
        
        {/* Rotas de Contact */}
        <Route path="contacts">
          <Route index element={<ContactList />} />
          <Route path="add" element={<ContactAdd />} />
          <Route path="edit/:id" element={<ContactEdit />} />
        </Route>
        
        {/* Rotas de ContactRequest */}
        <Route path="contactRequests">
          <Route index element={<ContactRequestList />} />
          <Route path="add" element={<ContactRequestAdd />} />
          <Route path="edit/:id" element={<ContactRequestEdit />} />
        </Route>
        
        {/* Rotas de Customer */}
        <Route path="customers">
          <Route index element={<CustomerList />} />
          <Route path="add" element={<CustomerAdd />} />
          <Route path="edit/:id" element={<CustomerEdit />} />
        </Route>
        
        {/* Rotas de CustomerOrder */}
        <Route path="customerOrders">
          <Route index element={<CustomerOrderList />} />
          <Route path="add" element={<CustomerOrderAdd />} />
          <Route path="edit/:id" element={<CustomerOrderEdit />} />
        </Route>
        
        {/* Rotas de CustomerType */}
        <Route path="customerTypes">
          <Route index element={<CustomerTypeList />} />
          <Route path="add" element={<CustomerTypeAdd />} />
          <Route path="edit/:id" element={<CustomerTypeEdit />} />
        </Route>
        
        {/* Rotas de Dependent */}
        <Route path="dependents">
          <Route index element={<DependentList />} />
          <Route path="add" element={<DependentAdd />} />
          <Route path="edit/:id" element={<DependentEdit />} />
        </Route>
        
        {/* Rotas de EducationDegree */}
        <Route path="educationDegrees">
          <Route index element={<EducationDegreeList />} />
          <Route path="add" element={<EducationDegreeAdd />} />
          <Route path="edit/:id" element={<EducationDegreeEdit />} />
        </Route>
        
        {/* Rotas de EmailHistory */}
        <Route path="emailHistories">
          <Route index element={<EmailHistoryList />} />
          <Route path="add" element={<EmailHistoryAdd />} />
          <Route path="edit/:id" element={<EmailHistoryEdit />} />
        </Route>
        
        {/* Rota de fallback para páginas não encontradas */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
