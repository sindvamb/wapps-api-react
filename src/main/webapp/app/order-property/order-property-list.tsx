import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError } from 'app/common/utils';
import { OrderPropertyDTO } from 'app/order-property/order-property-model';
import useDocumentTitle from 'app/common/use-document-title';
import api from 'app/services/api';

export default function OrderPropertyList() {
  const { t } = useTranslation();
  useDocumentTitle(t('orderProperty.list.headline'));

  const [orderProperties, setOrderProperties] = useState<OrderPropertyDTO[]>([]);
  const navigate = useNavigate();

  const getAllOrderProperties = async () => {
    try {
      const response = await api.get("/api/orderProperties");
      setOrderProperties(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await api.delete("/api/orderProperties/" + id);
      navigate('/orderProperties', {
            state: {
              msgInfo: t('orderProperty.delete.success')
            }
          });
      getAllOrderProperties();
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    getAllOrderProperties();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('orderProperty.list.headline')}</h1>
      <div>
        <Link to="/orderProperties/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('orderProperty.list.createNew')}</Link>
      </div>
    </div>
    {!orderProperties || orderProperties.length === 0 ? (
    <div>{t('orderProperty.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th scope="col" className="text-left p-2">{t('orderProperty.id.label')}</th>
            <th scope="col" className="text-left p-2">{t('orderProperty.order.label')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="border-t-2 border-black">
          {orderProperties.map((orderProperty) => (
          <tr key={orderProperty.id} className="odd:bg-gray-100">
            <td className="p-2">{orderProperty.id}</td>
            <td className="p-2">{orderProperty.order}</td>
            <td className="p-2">
              <div className="float-right whitespace-nowrap">
                <Link to={'/orderProperties/edit/' + orderProperty.id} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm">{t('orderProperty.list.edit')}</Link>
                <span> </span>
                <button type="button" onClick={() => confirmDelete(orderProperty.id!)} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm cursor-pointer">{t('orderProperty.list.delete')}</button>
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
