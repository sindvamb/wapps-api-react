import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError } from 'app/common/utils';
import { AddressDTO } from 'app/address/address-model';
import useDocumentTitle from 'app/common/use-document-title';
import api from 'app/services/api';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {createActionTemplate} from "app/common/data-templates";

export default function AddressList() {
  const { t } = useTranslation();
  useDocumentTitle(t('address.list.headline'));

  const [addresses, setAddresses] = useState<AddressDTO[]>([]);
  const navigate = useNavigate();

  const getAllAddresses = async () => {
    try {
      const response = await api.get("/api/addresses");
      setAddresses(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await api.delete("/api/addresses/" + id);
      navigate('/addresses', {
            state: {
              msgInfo: t('address.delete.success')
            }
          });
      getAllAddresses();
    } catch (error: any) {
      if (error?.response?.data?.code === 'REFERENCED') {
        const messageParts = error.response.data.message.split(',');
        navigate('/addresses', {
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
    getAllAddresses();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('address.list.headline')}</h1>
      <div>
        <Link to="/addresses/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('address.list.createNew')}</Link>
      </div>
    </div>
    {!addresses || addresses.length === 0 ? (
    <div>{t('address.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
        <DataTable value={addresses}  paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
            <Column field="addressLine1" header={t('address.addressLine1.label')} />
            <Column field="number" header={t('address.number.label')} />
            <Column body={(rowData) => createActionTemplate(confirmDelete, '/addresses/edit/')(rowData)} />
        </DataTable>
    </div>
    )}
  </>);
}
