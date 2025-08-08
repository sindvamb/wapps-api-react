import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError } from 'app/common/utils';
import { CustomerOrderDTO } from 'app/customer-order/customer-order-model';
import useDocumentTitle from 'app/common/use-document-title';
import api from 'app/services/api';

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
      <table className="w-full">
        <thead>
          <tr>
            <th scope="col" className="text-left p-2">{t('customerOrder.id.label')}</th>
            <th scope="col" className="text-left p-2">{t('customerOrder.isWapps.label')}</th>
            <th scope="col" className="text-left p-2">{t('customerOrder.isPresidency.label')}</th>
            <th scope="col" className="text-left p-2">{t('customerOrder.isClient.label')}</th>
            <th scope="col" className="text-left p-2">{t('customerOrder.isDirector.label')}</th>
            <th scope="col" className="text-left p-2">{t('customerOrder.isManager.label')}</th>
            <th scope="col" className="text-left p-2">{t('customerOrder.creatorId.label')}</th>
            <th scope="col" className="text-left p-2">{t('customerOrder.modifierId.label')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="border-t-2 border-black">
          {customerOrders.map((customerOrder) => (
          <tr key={customerOrder.id} className="odd:bg-gray-100">
            <td className="p-2">{customerOrder.id}</td>
            <td className="p-2">{customerOrder.isWapps?.toString()}</td>
            <td className="p-2">{customerOrder.isPresidency?.toString()}</td>
            <td className="p-2">{customerOrder.isClient?.toString()}</td>
            <td className="p-2">{customerOrder.isDirector?.toString()}</td>
            <td className="p-2">{customerOrder.isManager?.toString()}</td>
            <td className="p-2">{customerOrder.creatorId}</td>
            <td className="p-2">{customerOrder.modifierId}</td>
            <td className="p-2">
              <div className="float-right whitespace-nowrap">
                <Link to={'/customerOrders/edit/' + customerOrder.id} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm">{t('customerOrder.list.edit')}</Link>
                <span> </span>
                <button type="button" onClick={() => confirmDelete(customerOrder.id!)} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm cursor-pointer">{t('customerOrder.list.delete')}</button>
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
