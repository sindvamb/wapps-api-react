import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';
import { handleServerError } from 'app/common/utils';
import { UserStatusDTO } from 'app/user-status/user-status-model';
import axios from 'axios';
import useDocumentTitle from 'app/common/use-document-title';


export default function UserStatusList() {
  const { t } = useTranslation();
  useDocumentTitle(t('userStatus.list.headline'));

  const [userStatuses, setUserStatuses] = useState<UserStatusDTO[]>([]);
  const navigate = useNavigate();

  const getAllUserStatuses = async () => {
    try {
      const response = await axios.get('/api/userStatuses');
      setUserStatuses(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await axios.delete('/api/userStatuses/' + id);
      navigate('/userStatuses', {
            state: {
              msgInfo: t('userStatus.delete.success')
            }
          });
      getAllUserStatuses();
    } catch (error: any) {
      if (error?.response?.data?.code === 'REFERENCED') {
        const messageParts = error.response.data.message.split(',');
        navigate('/userStatuses', {
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
    getAllUserStatuses();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('userStatus.list.headline')}</h1>
      <div>
        <Link to="/userStatuses/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('userStatus.list.createNew')}</Link>
      </div>
    </div>
    {!userStatuses || userStatuses.length === 0 ? (
    <div>{t('userStatus.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th scope="col" className="text-left p-2">{t('userStatus.id.label')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="border-t-2 border-black">
          {userStatuses.map((userStatus) => (
          <tr key={userStatus.id} className="odd:bg-gray-100">
            <td className="p-2">{userStatus.id}</td>
            <td className="p-2">
              <div className="float-right whitespace-nowrap">
                <Link to={'/userStatuses/edit/' + userStatus.id} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm">{t('userStatus.list.edit')}</Link>
                <span> </span>
                <button type="button" onClick={() => confirmDelete(userStatus.id!)} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm cursor-pointer">{t('userStatus.list.delete')}</button>
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
