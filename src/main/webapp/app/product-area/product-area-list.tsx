import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';
import { handleServerError } from 'app/common/utils';
import { ProductAreaDTO } from 'app/product-area/product-area-model';
import axios from 'axios';
import useDocumentTitle from 'app/common/use-document-title';


export default function ProductAreaList() {
  const { t } = useTranslation();
  useDocumentTitle(t('productArea.list.headline'));

  const [productAreas, setProductAreas] = useState<ProductAreaDTO[]>([]);
  const navigate = useNavigate();

  const getAllProductAreas = async () => {
    try {
      const response = await axios.get('/api/productAreas');
      setProductAreas(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await axios.delete('/api/productAreas/' + id);
      navigate('/productAreas', {
            state: {
              msgInfo: t('productArea.delete.success')
            }
          });
      getAllProductAreas();
    } catch (error: any) {
      if (error?.response?.data?.code === 'REFERENCED') {
        const messageParts = error.response.data.message.split(',');
        navigate('/productAreas', {
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
    getAllProductAreas();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('productArea.list.headline')}</h1>
      <div>
        <Link to="/productAreas/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('productArea.list.createNew')}</Link>
      </div>
    </div>
    {!productAreas || productAreas.length === 0 ? (
    <div>{t('productArea.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th scope="col" className="text-left p-2">{t('productArea.id.label')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="border-t-2 border-black">
          {productAreas.map((productArea) => (
          <tr key={productArea.id} className="odd:bg-gray-100">
            <td className="p-2">{productArea.id}</td>
            <td className="p-2">
              <div className="float-right whitespace-nowrap">
                <Link to={'/productAreas/edit/' + productArea.id} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm">{t('productArea.list.edit')}</Link>
                <span> </span>
                <button type="button" onClick={() => confirmDelete(productArea.id!)} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm cursor-pointer">{t('productArea.list.delete')}</button>
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
