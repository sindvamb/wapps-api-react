import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError } from 'app/common/utils';
import { ApplicationConfigDTO } from 'app/application-config/application-config-model';
import useDocumentTitle from 'app/common/use-document-title';
import api from 'app/services/api';

export default function ApplicationConfigList() {
  const { t } = useTranslation();
  useDocumentTitle(t('applicationConfig.list.headline'));

  const [applicationConfigs, setApplicationConfigs] = useState<ApplicationConfigDTO[]>([]);
  const navigate = useNavigate();

  const getAllApplicationConfigs = async () => {
    try {
      const response = await api.get("/api/applicationConfigs");
      setApplicationConfigs(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await api.delete("/api/applicationConfigs/" + id);
      navigate('/applicationConfigs', {
            state: {
              msgInfo: t('applicationConfig.delete.success')
            }
          });
      getAllApplicationConfigs();
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    getAllApplicationConfigs();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('applicationConfig.list.headline')}</h1>
      <div>
        <Link to="/applicationConfigs/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('applicationConfig.list.createNew')}</Link>
      </div>
    </div>
    {!applicationConfigs || applicationConfigs.length === 0 ? (
    <div>{t('applicationConfig.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th scope="col" className="text-left p-2">{t('applicationConfig.id.label')}</th>
            <th scope="col" className="text-left p-2">{t('applicationConfig.creatorId.label')}</th>
            <th scope="col" className="text-left p-2">{t('applicationConfig.modifierId.label')}</th>
            <th scope="col" className="text-left p-2">{t('applicationConfig.deleterId.label')}</th>
            <th scope="col" className="text-left p-2">{t('applicationConfig.isDeleted.label')}</th>
            <th scope="col" className="text-left p-2">{t('applicationConfig.createdAt.label')}</th>
            <th scope="col" className="text-left p-2">{t('applicationConfig.updatedAt.label')}</th>
            <th scope="col" className="text-left p-2">{t('applicationConfig.deletedAt.label')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="border-t-2 border-black">
          {applicationConfigs.map((applicationConfig) => (
          <tr key={applicationConfig.id} className="odd:bg-gray-100">
            <td className="p-2">{applicationConfig.id}</td>
            <td className="p-2">{applicationConfig.creatorId}</td>
            <td className="p-2">{applicationConfig.modifierId}</td>
            <td className="p-2">{applicationConfig.deleterId}</td>
            <td className="p-2">{applicationConfig.isDeleted?.toString()}</td>
            <td className="p-2">{applicationConfig.createdAt}</td>
            <td className="p-2">{applicationConfig.updatedAt}</td>
            <td className="p-2">{applicationConfig.deletedAt}</td>
            <td className="p-2">
              <div className="float-right whitespace-nowrap">
                <Link to={'/applicationConfigs/edit/' + applicationConfig.id} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm">{t('applicationConfig.list.edit')}</Link>
                <span> </span>
                <button type="button" onClick={() => confirmDelete(applicationConfig.id!)} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm cursor-pointer">{t('applicationConfig.list.delete')}</button>
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
