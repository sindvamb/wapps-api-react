import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError } from 'app/common/utils';
import { CompanyContactDTO } from 'app/company-contact/company-contact-model';
import useDocumentTitle from 'app/common/use-document-title';
import api from 'app/services/api';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {createActionTemplate} from "app/common/data-templates";

export default function CompanyContactList() {
  const { t } = useTranslation();
  useDocumentTitle(t('companyContact.list.headline'));

  const [companyContacts, setCompanyContacts] = useState<CompanyContactDTO[]>([]);
  const navigate = useNavigate();

  const getAllCompanyContacts = async () => {
    try {
      const response = await api.get("/api/companyContacts");
      setCompanyContacts(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await api.delete("/api/companyContacts/" + id);
      navigate('/companyContacts', {
            state: {
              msgInfo: t('companyContact.delete.success')
            }
          });
      getAllCompanyContacts();
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    getAllCompanyContacts();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('companyContact.list.headline')}</h1>
      <div>
        <Link to="/companyContacts/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('companyContact.list.createNew')}</Link>
      </div>
    </div>
    {!companyContacts || companyContacts.length === 0 ? (
    <div>{t('companyContact.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
        <DataTable value={companyContacts}  paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
            <Column field="id" header={t('companyContact.id.label')} />
            <Column field="company" header={t('companyContact.company.label')} />
            <Column body={(rowData) => createActionTemplate(confirmDelete, '/companyContacts/edit/')(rowData)} />
        </DataTable>
    </div>
    )}
  </>);
}
