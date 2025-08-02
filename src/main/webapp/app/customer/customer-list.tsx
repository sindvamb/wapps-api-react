import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';
import { handleServerError } from 'app/common/utils';
import { CustomerDTO } from 'app/customer/customer-model';
import axios from 'axios';
import useDocumentTitle from 'app/common/use-document-title';


export default function CustomerList() {
  const { t } = useTranslation();
  useDocumentTitle(t('customer.list.headline'));

  const [customers, setCustomers] = useState<CustomerDTO[]>([]);
  const navigate = useNavigate();

  const getAllCustomers = async () => {
    try {
      const response = await axios.get('/api/customers');
      setCustomers(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await axios.delete('/api/customers/' + id);
      navigate('/customers', {
            state: {
              msgInfo: t('customer.delete.success')
            }
          });
      getAllCustomers();
    } catch (error: any) {
      if (error?.response?.data?.code === 'REFERENCED') {
        const messageParts = error.response.data.message.split(',');
        navigate('/customers', {
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
    getAllCustomers();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('customer.list.headline')}</h1>
      <div>
        <Link to="/customers/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('customer.list.createNew')}</Link>
      </div>
    </div>
    {!customers || customers.length === 0 ? (
    <div>{t('customer.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th scope="col" className="text-left p-2">{t('customer.id.label')}</th>
            <th scope="col" className="text-left p-2">{t('customer.creatorId.label')}</th>
            <th scope="col" className="text-left p-2">{t('customer.modifierId.label')}</th>
            <th scope="col" className="text-left p-2">{t('customer.deleterId.label')}</th>
            <th scope="col" className="text-left p-2">{t('customer.isDeleted.label')}</th>
            <th scope="col" className="text-left p-2">{t('customer.createdAt.label')}</th>
            <th scope="col" className="text-left p-2">{t('customer.updatedAt.label')}</th>
            <th scope="col" className="text-left p-2">{t('customer.deletedAt.label')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="border-t-2 border-black">
          {customers.map((customer) => (
          <tr key={customer.id} className="odd:bg-gray-100">
            <td className="p-2">{customer.id}</td>
            <td className="p-2">{customer.creatorId}</td>
            <td className="p-2">{customer.modifierId}</td>
            <td className="p-2">{customer.deleterId}</td>
            <td className="p-2">{customer.isDeleted?.toString()}</td>
            <td className="p-2">{customer.createdAt}</td>
            <td className="p-2">{customer.updatedAt}</td>
            <td className="p-2">{customer.deletedAt}</td>
            <td className="p-2">
              <div className="float-right whitespace-nowrap">
                <Link to={'/customers/edit/' + customer.id} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm">{t('customer.list.edit')}</Link>
                <span> </span>
                <button type="button" onClick={() => confirmDelete(customer.id!)} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm cursor-pointer">{t('customer.list.delete')}</button>
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
