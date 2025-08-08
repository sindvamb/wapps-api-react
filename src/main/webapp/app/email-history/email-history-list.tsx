import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError } from 'app/common/utils';
import { EmailHistoryDTO } from 'app/email-history/email-history-model';
import useDocumentTitle from 'app/common/use-document-title';
import api from 'app/services/api';

export default function EmailHistoryList() {
  const { t } = useTranslation();
  useDocumentTitle(t('emailHistory.list.headline'));

  const [emailHistories, setEmailHistories] = useState<EmailHistoryDTO[]>([]);
  const navigate = useNavigate();

  const getAllEmailHistories = async () => {
    try {
      const response = await api.get("/api/emailHistories");
      setEmailHistories(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await api.delete("/api/emailHistories/" + id);
      navigate('/emailHistories', {
            state: {
              msgInfo: t('emailHistory.delete.success')
            }
          });
      getAllEmailHistories();
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    getAllEmailHistories();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('emailHistory.list.headline')}</h1>
      <div>
        <Link to="/emailHistories/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('emailHistory.list.createNew')}</Link>
      </div>
    </div>
    {!emailHistories || emailHistories.length === 0 ? (
    <div>{t('emailHistory.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th scope="col" className="text-left p-2">{t('emailHistory.id.label')}</th>
            <th scope="col" className="text-left p-2">{t('emailHistory.userId.label')}</th>
            <th scope="col" className="text-left p-2">{t('emailHistory.isSuccess.label')}</th>
            <th scope="col" className="text-left p-2">{t('emailHistory.date.label')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="border-t-2 border-black">
          {emailHistories.map((emailHistory) => (
          <tr key={emailHistory.id} className="odd:bg-gray-100">
            <td className="p-2">{emailHistory.id}</td>
            <td className="p-2">{emailHistory.userId}</td>
            <td className="p-2">{emailHistory.isSuccess?.toString()}</td>
            <td className="p-2">{emailHistory.date}</td>
            <td className="p-2">
              <div className="float-right whitespace-nowrap">
                <Link to={'/emailHistories/edit/' + emailHistory.id} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm">{t('emailHistory.list.edit')}</Link>
                <span> </span>
                <button type="button" onClick={() => confirmDelete(emailHistory.id!)} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm cursor-pointer">{t('emailHistory.list.delete')}</button>
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
