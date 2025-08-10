import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError } from 'app/common/utils';
import { CustomerOrderDTO } from 'app/customer-order/customer-order-model';
import useDocumentTitle from 'app/common/use-document-title';
import api from 'app/services/api';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {createActionTemplate} from "app/common/data-templates";

export default function CustomerOrderList() {
  const { t } = useTranslation();
  useDocumentTitle(t('customerOrder.list.headline'));

  const [customerOrders, setCustomerOrders] = useState<CustomerOrderDTO[]>([]);
  const navigate = useNavigate();

  const getAllCustomerOrders = async () => {
    try {
      const response = await api.get("/api/customerOrders");
      setCustomerOrders(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await api.delete("/api/customerOrders/" + id);
      navigate('/customerOrders', {
            state: {
              msgInfo: t('customerOrder.delete.success')
            }
          });
      getAllCustomerOrders();
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    getAllCustomerOrders();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('customerOrder.list.headline')}</h1>
      <div>
        <Link to="/customerOrders/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('customerOrder.list.createNew')}</Link>
      </div>
    </div>
    {!customerOrders || customerOrders.length === 0 ? (
    <div>{t('customerOrder.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
        <DataTable value={customerOrders}  paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
            <Column field="id" header={t('customerOrder.id.label')} />
            <Column field="isWapps" header={t('customerOrder.isWapps.label')} />
            <Column field="isPresidency" header={t('customerOrder.isPresidency.label')} />
            <Column field="isClient" header={t('customerOrder.isClient.label')} />
            <Column field="isDirector" header={t('customerOrder.isDirector.label')} />
            <Column field="isManager" header={t('customerOrder.isManager.label')} />
            <Column field="creatorId" header={t('customerOrder.creatorId.label')} />
            <Column field="modifierId" header={t('customerOrder.modifierId.label')} />
            <Column body={(rowData) => createActionTemplate(confirmDelete, '/customerOrders/edit/')(rowData)} />
        </DataTable>
    </div>
    )}
  </>);
}
