import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';
import { handleServerError } from 'app/common/utils';
import { TicketStatusDTO } from 'app/ticket-status/ticket-status-model';
import axios from 'axios';
import useDocumentTitle from 'app/common/use-document-title';


export default function TicketStatusList() {
  const { t } = useTranslation();
  useDocumentTitle(t('ticketStatus.list.headline'));

  const [ticketStatuses, setTicketStatuses] = useState<TicketStatusDTO[]>([]);
  const navigate = useNavigate();

  const getAllTicketStatuses = async () => {
    try {
      const response = await axios.get('/api/ticketStatuses');
      setTicketStatuses(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await axios.delete('/api/ticketStatuses/' + id);
      navigate('/ticketStatuses', {
            state: {
              msgInfo: t('ticketStatus.delete.success')
            }
          });
      getAllTicketStatuses();
    } catch (error: any) {
      if (error?.response?.data?.code === 'REFERENCED') {
        const messageParts = error.response.data.message.split(',');
        navigate('/ticketStatuses', {
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
    getAllTicketStatuses();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('ticketStatus.list.headline')}</h1>
      <div>
        <Link to="/ticketStatuses/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('ticketStatus.list.createNew')}</Link>
      </div>
    </div>
    {!ticketStatuses || ticketStatuses.length === 0 ? (
    <div>{t('ticketStatus.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th scope="col" className="text-left p-2">{t('ticketStatus.id.label')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="border-t-2 border-black">
          {ticketStatuses.map((ticketStatus) => (
          <tr key={ticketStatus.id} className="odd:bg-gray-100">
            <td className="p-2">{ticketStatus.id}</td>
            <td className="p-2">
              <div className="float-right whitespace-nowrap">
                <Link to={'/ticketStatuses/edit/' + ticketStatus.id} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm">{t('ticketStatus.list.edit')}</Link>
                <span> </span>
                <button type="button" onClick={() => confirmDelete(ticketStatus.id!)} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm cursor-pointer">{t('ticketStatus.list.delete')}</button>
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
