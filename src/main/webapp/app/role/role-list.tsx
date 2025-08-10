import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError } from 'app/common/utils';
import { RoleDTO } from 'app/role/role-model';
import api from 'app/services/api';
import useDocumentTitle from 'app/common/use-document-title';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {createActionTemplate} from "app/common/data-templates";

export default function RoleList() {
  const { t } = useTranslation();
  useDocumentTitle(t('role.list.headline'));

  const [roles, setRoles] = useState<RoleDTO[]>([]);
  const navigate = useNavigate();

  const getAllRoles = async () => {
    try {
      const response = await api.get("/api/roles");
      setRoles(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await api.delete("/api/roles/" + id);
      navigate('/roles', {
            state: {
              msgInfo: t('role.delete.success')
            }
          });
      getAllRoles();
    } catch (error: any) {
      if (error?.response?.data?.code === 'REFERENCED') {
        const messageParts = error.response.data.message.split(',');
        navigate('/roles', {
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
    getAllRoles();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('role.list.headline')}</h1>
      <div>
        <Link to="/roles/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('role.list.createNew')}</Link>
      </div>
    </div>
    {!roles || roles.length === 0 ? (
    <div>{t('role.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
        <DataTable value={roles} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
            <Column field="id" header={t('role.id.label')} />
            <Column body={(rowData) => createActionTemplate(confirmDelete, '/roles/edit/')(rowData)} />
        </DataTable>
    </div>
    )}
  </>);
}
