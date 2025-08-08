import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError } from 'app/common/utils';
import { LoginHistoryDTO } from 'app/login-history/login-history-model';
import useDocumentTitle from 'app/common/use-document-title';
import api from 'app/services/api';

export default function LoginHistoryList() {
  const { t } = useTranslation();
  useDocumentTitle(t('loginHistory.list.headline'));

  const [loginHistories, setLoginHistories] = useState<LoginHistoryDTO[]>([]);
  const navigate = useNavigate();

  const getAllLoginHistories = async () => {
    try {
      const response = await api.get("/api/loginHistories");
      setLoginHistories(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await api.delete("/api/loginHistories/" + id);
      navigate('/loginHistories', {
            state: {
              msgInfo: t('loginHistory.delete.success')
            }
          });
      getAllLoginHistories();
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    getAllLoginHistories();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('loginHistory.list.headline')}</h1>
      <div>
        <Link to="/loginHistories/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('loginHistory.list.createNew')}</Link>
      </div>
    </div>
    {!loginHistories || loginHistories.length === 0 ? (
    <div>{t('loginHistory.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th scope="col" className="text-left p-2">{t('loginHistory.id.label')}</th>
            <th scope="col" className="text-left p-2">{t('loginHistory.isSuccess.label')}</th>
            <th scope="col" className="text-left p-2">{t('loginHistory.date.label')}</th>
            <th scope="col" className="text-left p-2">{t('loginHistory.user.label')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="border-t-2 border-black">
          {loginHistories.map((loginHistory) => (
          <tr key={loginHistory.id} className="odd:bg-gray-100">
            <td className="p-2">{loginHistory.id}</td>
            <td className="p-2">{loginHistory.isSuccess?.toString()}</td>
            <td className="p-2">{loginHistory.date}</td>
            <td className="p-2">{loginHistory.user}</td>
            <td className="p-2">
              <div className="float-right whitespace-nowrap">
                <Link to={'/loginHistories/edit/' + loginHistory.id} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm">{t('loginHistory.list.edit')}</Link>
                <span> </span>
                <button type="button" onClick={() => confirmDelete(loginHistory.id!)} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm cursor-pointer">{t('loginHistory.list.delete')}</button>
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
