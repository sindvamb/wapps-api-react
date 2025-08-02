import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';
import { handleServerError } from 'app/common/utils';
import { OrderStatusDTO } from 'app/order-status/order-status-model';
import axios from 'axios';
import useDocumentTitle from 'app/common/use-document-title';


export default function OrderStatusList() {
  const { t } = useTranslation();
  useDocumentTitle(t('orderStatus.list.headline'));

  const [orderStatuses, setOrderStatuses] = useState<OrderStatusDTO[]>([]);
  const navigate = useNavigate();

  const getAllOrderStatuses = async () => {
    try {
      const response = await axios.get('/api/orderStatuses');
      setOrderStatuses(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await axios.delete('/api/orderStatuses/' + id);
      navigate('/orderStatuses', {
            state: {
              msgInfo: t('orderStatus.delete.success')
            }
          });
      getAllOrderStatuses();
    } catch (error: any) {
      if (error?.response?.data?.code === 'REFERENCED') {
        const messageParts = error.response.data.message.split(',');
        navigate('/orderStatuses', {
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
    getAllOrderStatuses();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('orderStatus.list.headline')}</h1>
      <div>
        <Link to="/orderStatuses/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('orderStatus.list.createNew')}</Link>
      </div>
    </div>
    {!orderStatuses || orderStatuses.length === 0 ? (
    <div>{t('orderStatus.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th scope="col" className="text-left p-2">{t('orderStatus.id.label')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="border-t-2 border-black">
          {orderStatuses.map((orderStatus) => (
          <tr key={orderStatus.id} className="odd:bg-gray-100">
            <td className="p-2">{orderStatus.id}</td>
            <td className="p-2">
              <div className="float-right whitespace-nowrap">
                <Link to={'/orderStatuses/edit/' + orderStatus.id} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm">{t('orderStatus.list.edit')}</Link>
                <span> </span>
                <button type="button" onClick={() => confirmDelete(orderStatus.id!)} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm cursor-pointer">{t('orderStatus.list.delete')}</button>
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
