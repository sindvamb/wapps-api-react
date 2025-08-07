import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';
import { handleServerError } from 'app/common/utils';
import { AddressDTO } from 'app/address/address-model';
import axios from 'axios';
import useDocumentTitle from 'app/common/use-document-title';


export default function AddressList() {
  const { t } = useTranslation();
  useDocumentTitle(t('address.list.headline'));

  const [addresses, setAddresses] = useState<AddressDTO[]>([]);
  const navigate = useNavigate();

  const getAllAddresses = async () => {
    try {
      const response = await axios.get('/api/addresses');
      setAddresses(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await axios.delete('/api/addresses/' + id);
      navigate('/addresses', {
            state: {
              msgInfo: t('address.delete.success')
            }
          });
      getAllAddresses();
    } catch (error: any) {
      if (error?.response?.data?.code === 'REFERENCED') {
        const messageParts = error.response.data.message.split(',');
        navigate('/addresses', {
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
    getAllAddresses();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('address.list.headline')}</h1>
      <div>
        <Link to="/addresses/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('address.list.createNew')}</Link>
      </div>
    </div>
    {!addresses || addresses.length === 0 ? (
    <div>{t('address.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th scope="col" className="text-left p-2">{t('address.id.label')}</th>
            <th scope="col" className="text-left p-2">{t('address.number.label')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="border-t-2 border-black">
          {addresses.map((address) => (
          <tr key={address.id} className="odd:bg-gray-100">
            <td className="p-2">{address.addressLine1}</td>
            <td className="p-2">{address.number}</td>
            <td className="p-2">
              <div className="float-right whitespace-nowrap">
                <Link to={'/addresses/edit/' + address.id} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm">{t('address.list.edit')}</Link>
                <span> </span>
                <button type="button" onClick={() => confirmDelete(address.id!)} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm cursor-pointer">{t('address.list.delete')}</button>
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
