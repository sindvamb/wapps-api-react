import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';
import { handleServerError } from 'app/common/utils';
import { EventCustomerDTO } from 'app/event-customer/event-customer-model';
import axios from 'axios';
import useDocumentTitle from 'app/common/use-document-title';


export default function EventCustomerList() {
  const { t } = useTranslation();
  useDocumentTitle(t('eventCustomer.list.headline'));

  const [eventCustomers, setEventCustomers] = useState<EventCustomerDTO[]>([]);
  const navigate = useNavigate();

  const getAllEventCustomers = async () => {
    try {
      const response = await axios.get('/api/eventCustomers');
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
      await axios.delete('/api/eventCustomers/' + id);
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
      <table className="w-full">
        <thead>
          <tr>
            <th scope="col" className="text-left p-2">{t('eventCustomer.id.label')}</th>
            <th scope="col" className="text-left p-2">{t('eventCustomer.approved.label')}</th>
            <th scope="col" className="text-left p-2">{t('eventCustomer.company.label')}</th>
            <th scope="col" className="text-left p-2">{t('eventCustomer.customer.label')}</th>
            <th scope="col" className="text-left p-2">{t('eventCustomer.event.label')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="border-t-2 border-black">
          {eventCustomers.map((eventCustomer) => (
          <tr key={eventCustomer.id} className="odd:bg-gray-100">
            <td className="p-2">{eventCustomer.id}</td>
            <td className="p-2">{eventCustomer.approved?.toString()}</td>
            <td className="p-2">{eventCustomer.company}</td>
            <td className="p-2">{eventCustomer.customer}</td>
            <td className="p-2">{eventCustomer.event}</td>
            <td className="p-2">
              <div className="float-right whitespace-nowrap">
                <Link to={'/eventCustomers/edit/' + eventCustomer.id} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm">{t('eventCustomer.list.edit')}</Link>
                <span> </span>
                <button type="button" onClick={() => confirmDelete(eventCustomer.id!)} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm cursor-pointer">{t('eventCustomer.list.delete')}</button>
              </div>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
    )}
  </>);
}
