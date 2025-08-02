import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';
import { handleServerError } from 'app/common/utils';
import { FileLayoutDTO } from 'app/file-layout/file-layout-model';
import axios from 'axios';
import useDocumentTitle from 'app/common/use-document-title';


export default function FileLayoutList() {
  const { t } = useTranslation();
  useDocumentTitle(t('fileLayout.list.headline'));

  const [fileLayouts, setFileLayouts] = useState<FileLayoutDTO[]>([]);
  const navigate = useNavigate();

  const getAllFileLayouts = async () => {
    try {
      const response = await axios.get('/api/fileLayouts');
      setFileLayouts(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await axios.delete('/api/fileLayouts/' + id);
      navigate('/fileLayouts', {
            state: {
              msgInfo: t('fileLayout.delete.success')
            }
          });
      getAllFileLayouts();
    } catch (error: any) {
      if (error?.response?.data?.code === 'REFERENCED') {
        const messageParts = error.response.data.message.split(',');
        navigate('/fileLayouts', {
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
    getAllFileLayouts();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('fileLayout.list.headline')}</h1>
      <div>
        <Link to="/fileLayouts/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('fileLayout.list.createNew')}</Link>
      </div>
    </div>
    {!fileLayouts || fileLayouts.length === 0 ? (
    <div>{t('fileLayout.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th scope="col" className="text-left p-2">{t('fileLayout.id.label')}</th>
            <th scope="col" className="text-left p-2">{t('fileLayout.layoutSize.label')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="border-t-2 border-black">
          {fileLayouts.map((fileLayout) => (
          <tr key={fileLayout.id} className="odd:bg-gray-100">
            <td className="p-2">{fileLayout.id}</td>
            <td className="p-2">{fileLayout.layoutSize}</td>
            <td className="p-2">
              <div className="float-right whitespace-nowrap">
                <Link to={'/fileLayouts/edit/' + fileLayout.id} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm">{t('fileLayout.list.edit')}</Link>
                <span> </span>
                <button type="button" onClick={() => confirmDelete(fileLayout.id!)} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm cursor-pointer">{t('fileLayout.list.delete')}</button>
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
