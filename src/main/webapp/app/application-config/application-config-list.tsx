import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError } from 'app/common/utils';
import { ApplicationConfigDTO } from 'app/application-config/application-config-model';
import useDocumentTitle from 'app/common/use-document-title';
import api from 'app/services/api';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {createActionTemplate} from "app/common/data-templates";

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
        <DataTable value={applicationConfigs}  paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
            <Column field="id" header={t('applicationConfig.id.label')} />
            <Column field="creatorId" header={t('applicationConfig.creatorId.label')} />
            <Column field="modifierId" header={t('applicationConfig.modifierId.label')} />
            <Column field="deleterId" header={t('applicationConfig.deleterId.label')} />
            <Column field="isDeleted" header={t('applicationConfig.isDeleted.label')} />
            <Column field="createdAt" header={t('applicationConfig.createdAt.label')} />
            <Column field="updatedAt" header={t('applicationConfig.updatedAt.label')} />
            <Column field="deletedAt" header={t('applicationConfig.deletedAt.label')} />
            <Column body={(rowData) => createActionTemplate(confirmDelete, '/applicationConfigs/edit/')(rowData)} />
        </DataTable>
    </div>
    )}
  </>);
}
