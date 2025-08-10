import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError } from 'app/common/utils';
import { CompanyDTO } from 'app/company/company-model';
import useDocumentTitle from 'app/common/use-document-title';
import api from 'app/services/api';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {createActionTemplate} from "app/common/data-templates";

export default function CompanyList() {
  const { t } = useTranslation();
  useDocumentTitle(t('company.list.headline'));

  const [companies, setCompanies] = useState<CompanyDTO[]>([]);
  const navigate = useNavigate();

  const getAllCompanies = async () => {
    try {
      const response = await api.get("/api/companies");
      setCompanies(response.data);
      console.log(response.data[0])
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await api.delete("/api/companies/" + id);
      navigate('/companies', {
            state: {
              msgInfo: t('company.delete.success')
            }
          });
      getAllCompanies();
    } catch (error: any) {
      if (error?.response?.data?.code === 'REFERENCED') {
        const messageParts = error.response.data.message.split(',');
        navigate('/companies', {
              state: {
                msgError: t(messageParts[0]!, { id: messageParts[1]! })
              }
            });
        return;
      }
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    getAllCompanies();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('company.list.headline')}</h1>
      <div>
        <Link to="/companies/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('company.list.createNew')}</Link>
      </div>
    </div>
    {!companies || companies.length === 0 ? (
    <div>{t('company.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">

        <DataTable value={companies}  paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
            <Column field="corporateName" header="Razão Social" />
            <Column field="cpfCnpj" header="CPF ou CNPJ" />
            <Column body={(rowData) => createActionTemplate(confirmDelete, '/companies/edit/')(rowData)} />
        </DataTable>

    </div>
    )}
  </>);
}
