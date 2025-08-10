import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError } from 'app/common/utils';
import { EfmigrationsHistoryDTO } from 'app/efmigrations-history/efmigrations-history-model';
import useDocumentTitle from 'app/common/use-document-title';
import api from 'app/services/api';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";


export default function EfmigrationsHistoryList() {
  const { t } = useTranslation();
  useDocumentTitle(t('efmigrationsHistory.list.headline'));

  const [efmigrationsHistories, setEfmigrationsHistories] = useState<EfmigrationsHistoryDTO[]>([]);
  const navigate = useNavigate();

  const getAllEfmigrationsHistories = async () => {
    try {
      const response = await api.get("/api/efmigrationsHistories");
      setEfmigrationsHistories(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (migrationId: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await api.delete("/api/efmigrationsHistories/" + migrationId);
      navigate('/efmigrationsHistories', {
            state: {
              msgInfo: t('efmigrationsHistory.delete.success')
            }
          });
      getAllEfmigrationsHistories();
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    getAllEfmigrationsHistories();
  }, []);

  const actionBodyTemplate = (rowData: EfmigrationsHistoryDTO) => {
    return (
        <div className="float-right whitespace-nowrap">
            <Link to={'/efmigrationsHistories/edit/' + rowData.migrationId} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm">{t('efmigrationsHistory.list.edit')}</Link>
            <span> </span>
            <button type="button" onClick={() => confirmDelete(rowData.migrationId!)} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm cursor-pointer">{t('efmigrationsHistory.list.delete')}</button>
        </div>
    );
  }

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('efmigrationsHistory.list.headline')}</h1>
      <div>
        <Link to="/efmigrationsHistories/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('efmigrationsHistory.list.createNew')}</Link>
      </div>
    </div>
    {!efmigrationsHistories || efmigrationsHistories.length === 0 ? (
    <div>{t('efmigrationsHistory.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
      <DataTable value={efmigrationsHistories} dataKey="migrationId" paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
        <Column field="migrationId" header={t('efmigrationsHistory.migrationId.label')}></Column>
        <Column field="productVersion" header={t('efmigrationsHistory.productVersion.label')}></Column>
        <Column body={actionBodyTemplate} />
      </DataTable>
    </div>
    )}
  </>);
}
