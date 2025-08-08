import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError } from 'app/common/utils';
import { ProductCategoryDTO } from 'app/product-category/product-category-model';
import useDocumentTitle from 'app/common/use-document-title';
import api from 'app/services/api';

export default function ProductCategoryList() {
  const { t } = useTranslation();
  useDocumentTitle(t('productCategory.list.headline'));

  const [productCategories, setProductCategories] = useState<ProductCategoryDTO[]>([]);
  const navigate = useNavigate();

  const getAllProductCategories = async () => {
    try {
      const response = await api.get("/api/productCategories");
      setProductCategories(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await api.delete("/api/productCategories/" + id);
      navigate('/productCategories', {
            state: {
              msgInfo: t('productCategory.delete.success')
            }
          });
      getAllProductCategories();
    } catch (error: any) {
      if (error?.response?.data?.code === 'REFERENCED') {
        const messageParts = error.response.data.message.split(',');
        navigate('/productCategories', {
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
    getAllProductCategories();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('productCategory.list.headline')}</h1>
      <div>
        <Link to="/productCategories/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('productCategory.list.createNew')}</Link>
      </div>
    </div>
    {!productCategories || productCategories.length === 0 ? (
    <div>{t('productCategory.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th scope="col" className="text-left p-2">{t('productCategory.id.label')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="border-t-2 border-black">
          {productCategories.map((productCategory) => (
          <tr key={productCategory.id} className="odd:bg-gray-100">
            <td className="p-2">{productCategory.id}</td>
            <td className="p-2">
              <div className="float-right whitespace-nowrap">
                <Link to={'/productCategories/edit/' + productCategory.id} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm">{t('productCategory.list.edit')}</Link>
                <span> </span>
                <button type="button" onClick={() => confirmDelete(productCategory.id!)} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm cursor-pointer">{t('productCategory.list.delete')}</button>
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
