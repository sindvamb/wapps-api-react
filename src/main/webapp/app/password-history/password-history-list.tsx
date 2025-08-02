import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';
import { handleServerError } from 'app/common/utils';
import { PasswordHistoryDTO } from 'app/password-history/password-history-model';
import axios from 'axios';
import useDocumentTitle from 'app/common/use-document-title';


export default function PasswordHistoryList() {
  const { t } = useTranslation();
  useDocumentTitle(t('passwordHistory.list.headline'));

  const [passwordHistories, setPasswordHistories] = useState<PasswordHistoryDTO[]>([]);
  const navigate = useNavigate();

  const getAllPasswordHistories = async () => {
    try {
      const response = await axios.get('/api/passwordHistories');
      setPasswordHistories(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await axios.delete('/api/passwordHistories/' + id);
      navigate('/passwordHistories', {
            state: {
              msgInfo: t('passwordHistory.delete.success')
            }
          });
      getAllPasswordHistories();
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    getAllPasswordHistories();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('passwordHistory.list.headline')}</h1>
      <div>
        <Link to="/passwordHistories/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('passwordHistory.list.createNew')}</Link>
      </div>
    </div>
    {!passwordHistories || passwordHistories.length === 0 ? (
    <div>{t('passwordHistory.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th scope="col" className="text-left p-2">{t('passwordHistory.id.label')}</th>
            <th scope="col" className="text-left p-2">{t('passwordHistory.hasChanged.label')}</th>
            <th scope="col" className="text-left p-2">{t('passwordHistory.creatorId.label')}</th>
            <th scope="col" className="text-left p-2">{t('passwordHistory.modifierId.label')}</th>
            <th scope="col" className="text-left p-2">{t('passwordHistory.deleterId.label')}</th>
            <th scope="col" className="text-left p-2">{t('passwordHistory.isDeleted.label')}</th>
            <th scope="col" className="text-left p-2">{t('passwordHistory.createdAt.label')}</th>
            <th scope="col" className="text-left p-2">{t('passwordHistory.updatedAt.label')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="border-t-2 border-black">
          {passwordHistories.map((passwordHistory) => (
          <tr key={passwordHistory.id} className="odd:bg-gray-100">
            <td className="p-2">{passwordHistory.id}</td>
            <td className="p-2">{passwordHistory.hasChanged?.toString()}</td>
            <td className="p-2">{passwordHistory.creatorId}</td>
            <td className="p-2">{passwordHistory.modifierId}</td>
            <td className="p-2">{passwordHistory.deleterId}</td>
            <td className="p-2">{passwordHistory.isDeleted?.toString()}</td>
            <td className="p-2">{passwordHistory.createdAt}</td>
            <td className="p-2">{passwordHistory.updatedAt}</td>
            <td className="p-2">
              <div className="float-right whitespace-nowrap">
                <Link to={'/passwordHistories/edit/' + passwordHistory.id} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm">{t('passwordHistory.list.edit')}</Link>
                <span> </span>
                <button type="button" onClick={() => confirmDelete(passwordHistory.id!)} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm cursor-pointer">{t('passwordHistory.list.delete')}</button>
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
