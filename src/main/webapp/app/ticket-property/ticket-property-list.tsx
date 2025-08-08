import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError } from 'app/common/utils';
import { TicketPropertyDTO } from 'app/ticket-property/ticket-property-model';
import api from 'app/services/api';
import useDocumentTitle from 'app/common/use-document-title';

export default function TicketPropertyList() {
  const { t } = useTranslation();
  useDocumentTitle(t('ticketProperty.list.headline'));

  const [ticketProperties, setTicketProperties] = useState<TicketPropertyDTO[]>([]);
  const navigate = useNavigate();

  const getAllTicketProperties = async () => {
    try {
      const response = await api.get("/api/ticketProperties");
      setTicketProperties(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await api.delete("/api/ticketProperties/" + id);
      navigate('/ticketProperties', {
            state: {
              msgInfo: t('ticketProperty.delete.success')
            }
          });
      getAllTicketProperties();
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    getAllTicketProperties();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('ticketProperty.list.headline')}</h1>
      <div>
        <Link to="/ticketProperties/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('ticketProperty.list.createNew')}</Link>
      </div>
    </div>
    {!ticketProperties || ticketProperties.length === 0 ? (
    <div>{t('ticketProperty.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th scope="col" className="text-left p-2">{t('ticketProperty.id.label')}</th>
            <th scope="col" className="text-left p-2">{t('ticketProperty.ticket.label')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="border-t-2 border-black">
          {ticketProperties.map((ticketProperty) => (
          <tr key={ticketProperty.id} className="odd:bg-gray-100">
            <td className="p-2">{ticketProperty.id}</td>
            <td className="p-2">{ticketProperty.ticket}</td>
            <td className="p-2">
              <div className="float-right whitespace-nowrap">
                <Link to={'/ticketProperties/edit/' + ticketProperty.id} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm">{t('ticketProperty.list.edit')}</Link>
                <span> </span>
                <button type="button" onClick={() => confirmDelete(ticketProperty.id!)} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm cursor-pointer">{t('ticketProperty.list.delete')}</button>
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
