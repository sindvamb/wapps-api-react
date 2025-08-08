import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError } from 'app/common/utils';
import { AccessControlDTO } from 'app/access-control/access-control-model';
import useDocumentTitle from 'app/common/use-document-title';
import api from 'app/services/api';

export default function AccessControlList() {
  const { t } = useTranslation();
  useDocumentTitle(t('accessControl.list.headline'));

  const [accessControls, setAccessControls] = useState<AccessControlDTO[]>([]);
  const navigate = useNavigate();

  const getAllAccessControls = async () => {
    try {
      const response = await api.get("/api/accessControls");
      setAccessControls(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await api.delete("/api/accessControls/" + id);
      navigate('/accessControls', {
            state: {
              msgInfo: t('accessControl.delete.success')
            }
          });
      getAllAccessControls();
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    getAllAccessControls();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('accessControl.list.headline')}</h1>
      <div>
        <Link to="/accessControls/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('accessControl.list.createNew')}</Link>
      </div>
    </div>
    {!accessControls || accessControls.length === 0 ? (
    <div>{t('accessControl.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th scope="col" className="text-left p-2">{t('accessControl.id.label')}</th>
            <th scope="col" className="text-left p-2">{t('accessControl.userId.label')}</th>
            <th scope="col" className="text-left p-2">{t('accessControl.connectionTime.label')}</th>
            <th scope="col" className="text-left p-2">{t('accessControl.lastBeatTime.label')}</th>
            <th scope="col" className="text-left p-2">{t('accessControl.dur.label')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="border-t-2 border-black">
          {accessControls.map((accessControl) => (
          <tr key={accessControl.id} className="odd:bg-gray-100">
            <td className="p-2">{accessControl.id}</td>
            <td className="p-2">{accessControl.userId}</td>
            <td className="p-2">{accessControl.connectionTime}</td>
            <td className="p-2">{accessControl.lastBeatTime}</td>
            <td className="p-2">{accessControl.dur}</td>
            <td className="p-2">
              <div className="float-right whitespace-nowrap">
                <Link to={'/accessControls/edit/' + accessControl.id} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm">{t('accessControl.list.edit')}</Link>
                <span> </span>
                <button type="button" onClick={() => confirmDelete(accessControl.id!)} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm cursor-pointer">{t('accessControl.list.delete')}</button>
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
