import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError } from 'app/common/utils';
import { OrderDTO } from 'app/order/order-model';
import useDocumentTitle from 'app/common/use-document-title';
import api from 'app/services/api';

export default function OrderList() {
  const { t } = useTranslation();
  useDocumentTitle(t('order.list.headline'));

  const [orders, setOrders] = useState<OrderDTO[]>([]);
  const navigate = useNavigate();

  const getAllOrders = async () => {
    try {
      const response = await api.get("/api/orders");
      setOrders(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await api.delete("/api/orders/" + id);
      navigate('/orders', {
            state: {
              msgInfo: t('order.delete.success')
            }
          });
      getAllOrders();
    } catch (error: any) {
      if (error?.response?.data?.code === 'REFERENCED') {
        const messageParts = error.response.data.message.split(',');
        navigate('/orders', {
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
    getAllOrders();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('order.list.headline')}</h1>
      <div>
        <Link to="/orders/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('order.list.createNew')}</Link>
      </div>
    </div>
    {!orders || orders.length === 0 ? (
    <div>{t('order.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th scope="col" className="text-left p-2">{t('order.id.label')}</th>
            <th scope="col" className="text-left p-2">{t('order.dueDate.label')}</th>
            <th scope="col" className="text-left p-2">{t('order.enabled.label')}</th>
            <th scope="col" className="text-left p-2">{t('order.orderIndex.label')}</th>
            <th scope="col" className="text-left p-2">{t('order.creatorId.label')}</th>
            <th scope="col" className="text-left p-2">{t('order.modifierId.label')}</th>
            <th scope="col" className="text-left p-2">{t('order.deleterId.label')}</th>
            <th scope="col" className="text-left p-2">{t('order.isDeleted.label')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="border-t-2 border-black">
          {orders.map((order) => (
          <tr key={order.id} className="odd:bg-gray-100">
            <td className="p-2">{order.id}</td>
            <td className="p-2">{order.dueDate}</td>
            <td className="p-2">{order.enabled?.toString()}</td>
            <td className="p-2">{order.orderIndex}</td>
            <td className="p-2">{order.creatorId}</td>
            <td className="p-2">{order.modifierId}</td>
            <td className="p-2">{order.deleterId}</td>
            <td className="p-2">{order.isDeleted?.toString()}</td>
            <td className="p-2">
              <div className="float-right whitespace-nowrap">
                <Link to={'/orders/edit/' + order.id} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm">{t('order.list.edit')}</Link>
                <span> </span>
                <button type="button" onClick={() => confirmDelete(order.id!)} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm cursor-pointer">{t('order.list.delete')}</button>
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
