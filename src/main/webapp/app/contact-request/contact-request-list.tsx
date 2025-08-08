import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError } from 'app/common/utils';
import { ContactRequestDTO } from 'app/contact-request/contact-request-model';
import useDocumentTitle from 'app/common/use-document-title';
import api from 'app/services/api';

export default function ContactRequestList() {
  const { t } = useTranslation();
  useDocumentTitle(t('contactRequest.list.headline'));

  const [contactRequests, setContactRequests] = useState<ContactRequestDTO[]>([]);
  const navigate = useNavigate();

  const getAllContactRequests = async () => {
    try {
      const response = await api.get("/api/contactRequests");
      setContactRequests(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await api.delete("/api/contactRequests/" + id);
      navigate('/contactRequests', {
            state: {
              msgInfo: t('contactRequest.delete.success')
            }
          });
      getAllContactRequests();
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    getAllContactRequests();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('contactRequest.list.headline')}</h1>
      <div>
        <Link to="/contactRequests/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('contactRequest.list.createNew')}</Link>
      </div>
    </div>
    {!contactRequests || contactRequests.length === 0 ? (
    <div>{t('contactRequest.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th scope="col" className="text-left p-2">{t('contactRequest.id.label')}</th>
            <th scope="col" className="text-left p-2">{t('contactRequest.hasViewd.label')}</th>
            <th scope="col" className="text-left p-2">{t('contactRequest.hasAnswered.label')}</th>
            <th scope="col" className="text-left p-2">{t('contactRequest.hasPendding.label')}</th>
            <th scope="col" className="text-left p-2">{t('contactRequest.answeredDate.label')}</th>
            <th scope="col" className="text-left p-2">{t('contactRequest.createdAt.label')}</th>
            <th scope="col" className="text-left p-2">{t('contactRequest.contact.label')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="border-t-2 border-black">
          {contactRequests.map((contactRequest) => (
          <tr key={contactRequest.id} className="odd:bg-gray-100">
            <td className="p-2">{contactRequest.id}</td>
            <td className="p-2">{contactRequest.hasViewd?.toString()}</td>
            <td className="p-2">{contactRequest.hasAnswered?.toString()}</td>
            <td className="p-2">{contactRequest.hasPendding?.toString()}</td>
            <td className="p-2">{contactRequest.answeredDate}</td>
            <td className="p-2">{contactRequest.createdAt}</td>
            <td className="p-2">{contactRequest.contact}</td>
            <td className="p-2">
              <div className="float-right whitespace-nowrap">
                <Link to={'/contactRequests/edit/' + contactRequest.id} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm">{t('contactRequest.list.edit')}</Link>
                <span> </span>
                <button type="button" onClick={() => confirmDelete(contactRequest.id!)} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm cursor-pointer">{t('contactRequest.list.delete')}</button>
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
