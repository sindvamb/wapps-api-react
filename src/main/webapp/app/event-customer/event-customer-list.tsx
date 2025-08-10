import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError } from 'app/common/utils';
import { EventCustomerDTO } from 'app/event-customer/event-customer-model';
import useDocumentTitle from 'app/common/use-document-title';
import api from 'app/services/api';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {createActionTemplate} from "app/common/data-templates";

export default function EventCustomerList() {
  const { t } = useTranslation();
  useDocumentTitle(t('eventCustomer.list.headline'));

  const [eventCustomers, setEventCustomers] = useState<EventCustomerDTO[]>([]);
  const navigate = useNavigate();

  const getAllEventCustomers = async () => {
    try {
      const response = await api.get("/api/eventCustomers");
      setEventCustomers(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await api.delete("/api/eventCustomers/" + id);
      navigate('/eventCustomers', {
            state: {
              msgInfo: t('eventCustomer.delete.success')
            }
          });
      getAllEventCustomers();
    } catch (error: any) {
      if (error?.response?.data?.code === 'REFERENCED') {
        const messageParts = error.response.data.message.split(',');
        navigate('/eventCustomers', {
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
    getAllEventCustomers();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('eventCustomer.list.headline')}</h1>
      <div>
        <Link to="/eventCustomers/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('eventCustomer.list.createNew')}</Link>
      </div>
    </div>
    {!eventCustomers || eventCustomers.length === 0 ? (
    <div>{t('eventCustomer.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
        <DataTable value={eventCustomers}  paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
            <Column field="id" header={t('eventCustomer.id.label')} />
            <Column field="approved" header={t('eventCustomer.approved.label')} />
            <Column field="company" header={t('eventCustomer.company.label')} />
            <Column field="customer" header={t('eventCustomer.customer.label')} />
            <Column field="event" header={t('eventCustomer.event.label')} />
            <Column body={(rowData) => createActionTemplate(confirmDelete, '/eventCustomers/edit/')(rowData)} />
        </DataTable>
    </div>
    )}
  </>);
}
