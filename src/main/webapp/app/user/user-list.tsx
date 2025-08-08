import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError } from 'app/common/utils';
import { UserDTO } from 'app/user/user-model';
import api from 'app/services/api';
import useDocumentTitle from 'app/common/use-document-title';

export default function UserList() {
  const { t } = useTranslation();
  useDocumentTitle(t('user.list.headline'));

  const [users, setUsers] = useState<UserDTO[]>([]);
  const navigate = useNavigate();

  const getAllUsers = async () => {
    try {
      const response = await api.get("/api/users");
      setUsers(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await api.delete("/api/users/" + id);
      navigate('/users', {
            state: {
              msgInfo: t('user.delete.success')
            }
          });
      getAllUsers();
    } catch (error: any) {
      if (error?.response?.data?.code === 'REFERENCED') {
        const messageParts = error.response.data.message.split(',');
        navigate('/users', {
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
    getAllUsers();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('user.list.headline')}</h1>
      <div>
        <Link to="/users/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('user.list.createNew')}</Link>
      </div>
    </div>
    {!users || users.length === 0 ? (
    <div>{t('user.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th scope="col" className="text-left p-2">{t('user.id.label')}</th>
            <th scope="col" className="text-left p-2">{t('user.matricula.label')}</th>
            <th scope="col" className="text-left p-2">{t('user.hasSpecialNeeds.label')}</th>
            <th scope="col" className="text-left p-2">{t('user.isSystem.label')}</th>
            <th scope="col" className="text-left p-2">{t('user.isCustomer.label')}</th>
            <th scope="col" className="text-left p-2">{t('user.loginAttemps.label')}</th>
            <th scope="col" className="text-left p-2">{t('user.passwordPolicyEnabled.label')}</th>
            <th scope="col" className="text-left p-2">{t('user.birthdate.label')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="border-t-2 border-black">
          {users.map((user) => (
          <tr key={user.id} className="odd:bg-gray-100">
            <td className="p-2">{user.id}</td>
            <td className="p-2">{user.matricula}</td>
            <td className="p-2">{user.hasSpecialNeeds?.toString()}</td>
            <td className="p-2">{user.isSystem?.toString()}</td>
            <td className="p-2">{user.isCustomer?.toString()}</td>
            <td className="p-2">{user.loginAttemps}</td>
            <td className="p-2">{user.passwordPolicyEnabled?.toString()}</td>
            <td className="p-2">{user.birthdate}</td>
            <td className="p-2">
              <div className="float-right whitespace-nowrap">
                <Link to={'/users/edit/' + user.id} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm">{t('user.list.edit')}</Link>
                <span> </span>
                <button type="button" onClick={() => confirmDelete(user.id!)} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm cursor-pointer">{t('user.list.delete')}</button>
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
