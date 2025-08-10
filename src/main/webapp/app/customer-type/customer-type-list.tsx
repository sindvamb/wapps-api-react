import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError } from 'app/common/utils';
import { CustomerTypeDTO } from 'app/customer-type/customer-type-model';
import useDocumentTitle from 'app/common/use-document-title';
import api from 'app/services/api';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {createActionTemplate} from "app/common/data-templates";

export default function CustomerTypeList() {
  const { t } = useTranslation();
  useDocumentTitle(t('customerType.list.headline'));

  const [customerTypes, setCustomerTypes] = useState<CustomerTypeDTO[]>([]);
  const navigate = useNavigate();

  const getAllCustomerTypes = async () => {
    try {
      const response = await api.get("/api/customerTypes");
      setCustomerTypes(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await api.delete("/api/customerTypes/" + id);
      navigate('/customerTypes', {
            state: {
              msgInfo: t('customerType.delete.success')
            }
          });
      getAllCustomerTypes();
    } catch (error: any) {
      if (error?.response?.data?.code === 'REFERENCED') {
        const messageParts = error.response.data.message.split(',');
        navigate('/customerTypes', {
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
    getAllCustomerTypes();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('customerType.list.headline')}</h1>
      <div>
        <Link to="/customerTypes/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('customerType.list.createNew')}</Link>
      </div>
    </div>
    {!customerTypes || customerTypes.length === 0 ? (
    <div>{t('customerType.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
        <DataTable value={customerTypes}  paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
            <Column field="id" header={t('customerType.id.label')} />
            <Column body={(rowData) => createActionTemplate(confirmDelete, '/customerTypes/edit/')(rowData)} />
        </DataTable>
    </div>
    )}
  </>);
}
