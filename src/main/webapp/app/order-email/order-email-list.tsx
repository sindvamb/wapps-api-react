import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError } from 'app/common/utils';
import { OrderEmailDTO } from 'app/order-email/order-email-model';
import useDocumentTitle from 'app/common/use-document-title';
import api from 'app/services/api';

export default function OrderEmailList() {
  const { t } = useTranslation();
  useDocumentTitle(t('orderEmail.list.headline'));

  const [orderEmails, setOrderEmails] = useState<OrderEmailDTO[]>([]);
  const navigate = useNavigate();

  const getAllOrderEmails = async () => {
    try {
      const response = await api.get("/api/orderEmails");
      setOrderEmails(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await api.delete("/api/orderEmails/" + id);
      navigate('/orderEmails', {
            state: {
              msgInfo: t('orderEmail.delete.success')
            }
          });
      getAllOrderEmails();
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    getAllOrderEmails();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('orderEmail.list.headline')}</h1>
      <div>
        <Link to="/orderEmails/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('orderEmail.list.createNew')}</Link>
      </div>
    </div>
    {!orderEmails || orderEmails.length === 0 ? (
    <div>{t('orderEmail.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th scope="col" className="text-left p-2">{t('orderEmail.id.label')}</th>
            <th scope="col" className="text-left p-2">{t('orderEmail.order.label')}</th>
            <th scope="col" className="text-left p-2">{t('orderEmail.ticket.label')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="border-t-2 border-black">
          {orderEmails.map((orderEmail) => (
          <tr key={orderEmail.id} className="odd:bg-gray-100">
            <td className="p-2">{orderEmail.id}</td>
            <td className="p-2">{orderEmail.order}</td>
            <td className="p-2">{orderEmail.ticket}</td>
            <td className="p-2">
              <div className="float-right whitespace-nowrap">
                <Link to={'/orderEmails/edit/' + orderEmail.id} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm">{t('orderEmail.list.edit')}</Link>
                <span> </span>
                <button type="button" onClick={() => confirmDelete(orderEmail.id!)} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm cursor-pointer">{t('orderEmail.list.delete')}</button>
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
