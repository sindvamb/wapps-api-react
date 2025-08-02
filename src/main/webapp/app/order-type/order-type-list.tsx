import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';
import { handleServerError } from 'app/common/utils';
import { OrderTypeDTO } from 'app/order-type/order-type-model';
import axios from 'axios';
import useDocumentTitle from 'app/common/use-document-title';


export default function OrderTypeList() {
  const { t } = useTranslation();
  useDocumentTitle(t('orderType.list.headline'));

  const [orderTypes, setOrderTypes] = useState<OrderTypeDTO[]>([]);
  const navigate = useNavigate();

  const getAllOrderTypes = async () => {
    try {
      const response = await axios.get('/api/orderTypes');
      setOrderTypes(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await axios.delete('/api/orderTypes/' + id);
      navigate('/orderTypes', {
            state: {
              msgInfo: t('orderType.delete.success')
            }
          });
      getAllOrderTypes();
    } catch (error: any) {
      if (error?.response?.data?.code === 'REFERENCED') {
        const messageParts = error.response.data.message.split(',');
        navigate('/orderTypes', {
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
    getAllOrderTypes();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('orderType.list.headline')}</h1>
      <div>
        <Link to="/orderTypes/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('orderType.list.createNew')}</Link>
      </div>
    </div>
    {!orderTypes || orderTypes.length === 0 ? (
    <div>{t('orderType.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th scope="col" className="text-left p-2">{t('orderType.id.label')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="border-t-2 border-black">
          {orderTypes.map((orderType) => (
          <tr key={orderType.id} className="odd:bg-gray-100">
            <td className="p-2">{orderType.id}</td>
            <td className="p-2">
              <div className="float-right whitespace-nowrap">
                <Link to={'/orderTypes/edit/' + orderType.id} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm">{t('orderType.list.edit')}</Link>
                <span> </span>
                <button type="button" onClick={() => confirmDelete(orderType.id!)} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm cursor-pointer">{t('orderType.list.delete')}</button>
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
