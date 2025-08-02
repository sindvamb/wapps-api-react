import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';
import { handleServerError } from 'app/common/utils';
import { RegistrationRequestDTO } from 'app/registration-request/registration-request-model';
import axios from 'axios';
import useDocumentTitle from 'app/common/use-document-title';


export default function RegistrationRequestList() {
  const { t } = useTranslation();
  useDocumentTitle(t('registrationRequest.list.headline'));

  const [registrationRequests, setRegistrationRequests] = useState<RegistrationRequestDTO[]>([]);
  const navigate = useNavigate();

  const getAllRegistrationRequests = async () => {
    try {
      const response = await axios.get('/api/registrationRequests');
      setRegistrationRequests(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await axios.delete('/api/registrationRequests/' + id);
      navigate('/registrationRequests', {
            state: {
              msgInfo: t('registrationRequest.delete.success')
            }
          });
      getAllRegistrationRequests();
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    getAllRegistrationRequests();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('registrationRequest.list.headline')}</h1>
      <div>
        <Link to="/registrationRequests/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('registrationRequest.list.createNew')}</Link>
      </div>
    </div>
    {!registrationRequests || registrationRequests.length === 0 ? (
    <div>{t('registrationRequest.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th scope="col" className="text-left p-2">{t('registrationRequest.id.label')}</th>
            <th scope="col" className="text-left p-2">{t('registrationRequest.approved.label')}</th>
            <th scope="col" className="text-left p-2">{t('registrationRequest.date.label')}</th>
            <th scope="col" className="text-left p-2">{t('registrationRequest.user.label')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="border-t-2 border-black">
          {registrationRequests.map((registrationRequest) => (
          <tr key={registrationRequest.id} className="odd:bg-gray-100">
            <td className="p-2">{registrationRequest.id}</td>
            <td className="p-2">{registrationRequest.approved?.toString()}</td>
            <td className="p-2">{registrationRequest.date}</td>
            <td className="p-2">{registrationRequest.user}</td>
            <td className="p-2">
              <div className="float-right whitespace-nowrap">
                <Link to={'/registrationRequests/edit/' + registrationRequest.id} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm">{t('registrationRequest.list.edit')}</Link>
                <span> </span>
                <button type="button" onClick={() => confirmDelete(registrationRequest.id!)} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm cursor-pointer">{t('registrationRequest.list.delete')}</button>
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
