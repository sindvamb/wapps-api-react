import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError } from 'app/common/utils';
import { EfmigrationsHistoryDTO } from 'app/efmigrations-history/efmigrations-history-model';
import useDocumentTitle from 'app/common/use-document-title';
import api from 'app/services/api';


export default function EfmigrationsHistoryList() {
  const { t } = useTranslation();
  useDocumentTitle(t('efmigrationsHistory.list.headline'));

  const [efmigrationsHistories, setEfmigrationsHistories] = useState<EfmigrationsHistoryDTO[]>([]);
  const navigate = useNavigate();

  const getAllEfmigrationsHistories = async () => {
    try {
      const response = await api.get("/api/efmigrationsHistories");
      setEfmigrationsHistories(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (migrationId: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await api.delete("/api/efmigrationsHistories/" + migrationId);
      navigate('/efmigrationsHistories', {
            state: {
              msgInfo: t('efmigrationsHistory.delete.success')
            }
          });
      getAllEfmigrationsHistories();
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    getAllEfmigrationsHistories();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('efmigrationsHistory.list.headline')}</h1>
      <div>
        <Link to="/efmigrationsHistories/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('efmigrationsHistory.list.createNew')}</Link>
      </div>
    </div>
    {!efmigrationsHistories || efmigrationsHistories.length === 0 ? (
    <div>{t('efmigrationsHistory.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th scope="col" className="text-left p-2">{t('efmigrationsHistory.migrationId.label')}</th>
            <th scope="col" className="text-left p-2">{t('efmigrationsHistory.productVersion.label')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="border-t-2 border-black">
          {efmigrationsHistories.map((efmigrationsHistory) => (
          <tr key={efmigrationsHistory.migrationId} className="odd:bg-gray-100">
            <td className="p-2">{efmigrationsHistory.migrationId}</td>
            <td className="p-2">{efmigrationsHistory.productVersion}</td>
            <td className="p-2">
              <div className="float-right whitespace-nowrap">
                <Link to={'/efmigrationsHistories/edit/' + efmigrationsHistory.migrationId} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm">{t('efmigrationsHistory.list.edit')}</Link>
                <span> </span>
                <button type="button" onClick={() => confirmDelete(efmigrationsHistory.migrationId!)} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm cursor-pointer">{t('efmigrationsHistory.list.delete')}</button>
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
