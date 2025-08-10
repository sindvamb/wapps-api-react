import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError } from 'app/common/utils';
import { CustomerDTO } from 'app/customer/customer-model';
import useDocumentTitle from 'app/common/use-document-title';
import api from 'app/services/api';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {createActionTemplate} from "app/common/data-templates";

export default function CustomerList() {
  const { t } = useTranslation();
  useDocumentTitle(t('customer.list.headline'));

  const [customers, setCustomers] = useState<CustomerDTO[]>([]);
  const navigate = useNavigate();

  const getAllCustomers = async () => {
    try {
      const response = await api.get("/api/customers");
      setCustomers(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await api.delete("/api/customers/" + id);
      navigate('/customers', {
            state: {
              msgInfo: t('customer.delete.success')
            }
          });
      getAllCustomers();
    } catch (error: any) {
      if (error?.response?.data?.code === 'REFERENCED') {
        const messageParts = error.response.data.message.split(',');
        navigate('/customers', {
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
    getAllCustomers();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('customer.list.headline')}</h1>
      <div>
        <Link to="/customers/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('customer.list.createNew')}</Link>
      </div>
    </div>
    {!customers || customers.length === 0 ? (
    <div>{t('customer.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
        <DataTable value={customers}  paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
            <Column field="id" header={t('customer.id.label')} />
            <Column field="creatorId" header={t('customer.creatorId.label')} />
            <Column field="modifierId" header={t('customer.modifierId.label')} />
            <Column field="deleterId" header={t('customer.deleterId.label')} />
            <Column field="isDeleted" header={t('customer.isDeleted.label')} />
            <Column field="createdAt" header={t('customer.createdAt.label')} />
            <Column field="updatedAt" header={t('customer.updatedAt.label')} />
            <Column field="deletedAt" header={t('customer.deletedAt.label')} />
            <Column body={(rowData) => createActionTemplate(confirmDelete, '/customers/edit/')(rowData)} />
        </DataTable>
    </div>
    )}
  </>);
}
