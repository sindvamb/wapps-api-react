import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';
import { handleServerError } from 'app/common/utils';
import { OrderFileControlDTO } from 'app/order-file-control/order-file-control-model';
import axios from 'axios';
import useDocumentTitle from 'app/common/use-document-title';


export default function OrderFileControlList() {
  const { t } = useTranslation();
  useDocumentTitle(t('orderFileControl.list.headline'));

  const [orderFileControls, setOrderFileControls] = useState<OrderFileControlDTO[]>([]);
  const navigate = useNavigate();

  const getAllOrderFileControls = async () => {
    try {
      const response = await axios.get('/api/orderFileControls');
      setOrderFileControls(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await axios.delete('/api/orderFileControls/' + id);
      navigate('/orderFileControls', {
            state: {
              msgInfo: t('orderFileControl.delete.success')
            }
          });
      getAllOrderFileControls();
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    getAllOrderFileControls();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('orderFileControl.list.headline')}</h1>
      <div>
        <Link to="/orderFileControls/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('orderFileControl.list.createNew')}</Link>
      </div>
    </div>
    {!orderFileControls || orderFileControls.length === 0 ? (
    <div>{t('orderFileControl.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th scope="col" className="text-left p-2">{t('orderFileControl.id.label')}</th>
            <th scope="col" className="text-left p-2">{t('orderFileControl.fileControl.label')}</th>
            <th scope="col" className="text-left p-2">{t('orderFileControl.order.label')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="border-t-2 border-black">
          {orderFileControls.map((orderFileControl) => (
          <tr key={orderFileControl.id} className="odd:bg-gray-100">
            <td className="p-2">{orderFileControl.id}</td>
            <td className="p-2">{orderFileControl.fileControl}</td>
            <td className="p-2">{orderFileControl.order}</td>
            <td className="p-2">
              <div className="float-right whitespace-nowrap">
                <Link to={'/orderFileControls/edit/' + orderFileControl.id} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm">{t('orderFileControl.list.edit')}</Link>
                <span> </span>
                <button type="button" onClick={() => confirmDelete(orderFileControl.id!)} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm cursor-pointer">{t('orderFileControl.list.delete')}</button>
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
