import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';
import { handleServerError } from 'app/common/utils';
import { ContactDTO } from 'app/contact/contact-model';
import axios from 'axios';
import useDocumentTitle from 'app/common/use-document-title';


export default function ContactList() {
  const { t } = useTranslation();
  useDocumentTitle(t('contact.list.headline'));

  const [contacts, setContacts] = useState<ContactDTO[]>([]);
  const navigate = useNavigate();

  const getAllContacts = async () => {
    try {
      const response = await axios.get('/api/contacts');
      setContacts(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await axios.delete('/api/contacts/' + id);
      navigate('/contacts', {
            state: {
              msgInfo: t('contact.delete.success')
            }
          });
      getAllContacts();
    } catch (error: any) {
      if (error?.response?.data?.code === 'REFERENCED') {
        const messageParts = error.response.data.message.split(',');
        navigate('/contacts', {
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
    getAllContacts();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('contact.list.headline')}</h1>
      <div>
        <Link to="/contacts/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('contact.list.createNew')}</Link>
      </div>
    </div>
    {!contacts || contacts.length === 0 ? (
    <div>{t('contact.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th scope="col" className="text-left p-2">{t('contact.id.label')}</th>
            <th scope="col" className="text-left p-2">{t('contact.address.label')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="border-t-2 border-black">
          {contacts.map((contact) => (
          <tr key={contact.id} className="odd:bg-gray-100">
            <td className="p-2">{contact.id}</td>
            <td className="p-2">{contact.address}</td>
            <td className="p-2">
              <div className="float-right whitespace-nowrap">
                <Link to={'/contacts/edit/' + contact.id} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm">{t('contact.list.edit')}</Link>
                <span> </span>
                <button type="button" onClick={() => confirmDelete(contact.id!)} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm cursor-pointer">{t('contact.list.delete')}</button>
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
