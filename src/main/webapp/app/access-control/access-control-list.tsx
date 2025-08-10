import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError } from 'app/common/utils';
import { AccessControlDTO } from 'app/access-control/access-control-model';
import useDocumentTitle from 'app/common/use-document-title';
import api from 'app/services/api';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {createActionTemplate} from "app/common/data-templates";

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
        <DataTable value={accessControls}  paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
            <Column field="id" header={t('accessControl.id.label')} />
            <Column field="userId" header={t('accessControl.userId.label')} />
            <Column field="connectionTime" header={t('accessControl.connectionTime.label')} />
            <Column field="lastBeatTime" header={t('accessControl.lastBeatTime.label')} />
            <Column field="dur" header={t('accessControl.dur.label')} />
            <Column body={(rowData) => createActionTemplate(confirmDelete, '/accessControls/edit/')(rowData)} />
        </DataTable>
    </div>
    )}
  </>);
}
