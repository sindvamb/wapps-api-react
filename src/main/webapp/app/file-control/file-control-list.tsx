import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';
import { handleServerError } from 'app/common/utils';
import { FileControlDTO } from 'app/file-control/file-control-model';
import axios from 'axios';
import useDocumentTitle from 'app/common/use-document-title';


export default function FileControlList() {
  const { t } = useTranslation();
  useDocumentTitle(t('fileControl.list.headline'));

  const [fileControls, setFileControls] = useState<FileControlDTO[]>([]);
  const navigate = useNavigate();

  const getAllFileControls = async () => {
    try {
      const response = await axios.get('/api/fileControls');
      setFileControls(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await axios.delete('/api/fileControls/' + id);
      navigate('/fileControls', {
            state: {
              msgInfo: t('fileControl.delete.success')
            }
          });
      getAllFileControls();
    } catch (error: any) {
      if (error?.response?.data?.code === 'REFERENCED') {
        const messageParts = error.response.data.message.split(',');
        navigate('/fileControls', {
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
    getAllFileControls();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('fileControl.list.headline')}</h1>
      <div>
        <Link to="/fileControls/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('fileControl.list.createNew')}</Link>
      </div>
    </div>
    {!fileControls || fileControls.length === 0 ? (
    <div>{t('fileControl.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th scope="col" className="text-left p-2">{t('fileControl.id.label')}</th>
            <th scope="col" className="text-left p-2">{t('fileControl.fileSize.label')}</th>
            <th scope="col" className="text-left p-2">{t('fileControl.approved.label')}</th>
            <th scope="col" className="text-left p-2">{t('fileControl.company.label')}</th>
            <th scope="col" className="text-left p-2">{t('fileControl.dependent.label')}</th>
            <th scope="col" className="text-left p-2">{t('fileControl.eventCustomer.label')}</th>
            <th scope="col" className="text-left p-2">{t('fileControl.event.label')}</th>
            <th scope="col" className="text-left p-2">{t('fileControl.layout.label')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="border-t-2 border-black">
          {fileControls.map((fileControl) => (
          <tr key={fileControl.id} className="odd:bg-gray-100">
            <td className="p-2">{fileControl.id}</td>
            <td className="p-2">{fileControl.fileSize}</td>
            <td className="p-2">{fileControl.approved?.toString()}</td>
            <td className="p-2">{fileControl.company}</td>
            <td className="p-2">{fileControl.dependent}</td>
            <td className="p-2">{fileControl.eventCustomer}</td>
            <td className="p-2">{fileControl.event}</td>
            <td className="p-2">{fileControl.layout}</td>
            <td className="p-2">
              <div className="float-right whitespace-nowrap">
                <Link to={'/fileControls/edit/' + fileControl.id} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm">{t('fileControl.list.edit')}</Link>
                <span> </span>
                <button type="button" onClick={() => confirmDelete(fileControl.id!)} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm cursor-pointer">{t('fileControl.list.delete')}</button>
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
