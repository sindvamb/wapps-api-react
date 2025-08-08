import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError } from 'app/common/utils';
import { OrderTrackingDTO } from 'app/order-tracking/order-tracking-model';
import useDocumentTitle from 'app/common/use-document-title';
import api from 'app/services/api';

export default function OrderTrackingList() {
  const { t } = useTranslation();
  useDocumentTitle(t('orderTracking.list.headline'));

  const [orderTrackings, setOrderTrackings] = useState<OrderTrackingDTO[]>([]);
  const navigate = useNavigate();

  const getAllOrderTrackings = async () => {
    try {
      const response = await api.get("/api/orderTrackings");
      setOrderTrackings(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await api.delete("/api/orderTrackings/" + id);
      navigate('/orderTrackings', {
            state: {
              msgInfo: t('orderTracking.delete.success')
            }
          });
      getAllOrderTrackings();
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    getAllOrderTrackings();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('orderTracking.list.headline')}</h1>
      <div>
        <Link to="/orderTrackings/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('orderTracking.list.createNew')}</Link>
      </div>
    </div>
    {!orderTrackings || orderTrackings.length === 0 ? (
    <div>{t('orderTracking.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th scope="col" className="text-left p-2">{t('orderTracking.id.label')}</th>
            <th scope="col" className="text-left p-2">{t('orderTracking.trackDate.label')}</th>
            <th scope="col" className="text-left p-2">{t('orderTracking.order.label')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="border-t-2 border-black">
          {orderTrackings.map((orderTracking) => (
          <tr key={orderTracking.id} className="odd:bg-gray-100">
            <td className="p-2">{orderTracking.id}</td>
            <td className="p-2">{orderTracking.trackDate}</td>
            <td className="p-2">{orderTracking.order}</td>
            <td className="p-2">
              <div className="float-right whitespace-nowrap">
                <Link to={'/orderTrackings/edit/' + orderTracking.id} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm">{t('orderTracking.list.edit')}</Link>
                <span> </span>
                <button type="button" onClick={() => confirmDelete(orderTracking.id!)} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm cursor-pointer">{t('orderTracking.list.delete')}</button>
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
