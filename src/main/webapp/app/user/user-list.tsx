import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError } from 'app/common/utils';
import { UserDTO } from 'app/user/user-model';
import api from 'app/services/api';
import useDocumentTitle from 'app/common/use-document-title';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {createActionTemplate} from "app/common/data-templates";

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
        <DataTable value={users} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
            <Column field="id" header={t('user.id.label')} />
            <Column field="matricula" header={t('user.matricula.label')} />
            <Column field="hasSpecialNeeds" header={t('user.hasSpecialNeeds.label')} />
            <Column field="isSystem" header={t('user.isSystem.label')} />
            <Column field="isCustomer" header={t('user.isCustomer.label')} />
            <Column field="loginAttemps" header={t('user.loginAttemps.label')} />
            <Column field="passwordPolicyEnabled" header={t('user.passwordPolicyEnabled.label')} />
            <Column field="birthdate" header={t('user.birthdate.label')} />
            <Column body={(rowData) => createActionTemplate(confirmDelete, '/users/edit/')(rowData)} />
        </DataTable>
    </div>
    )}
  </>);
}
