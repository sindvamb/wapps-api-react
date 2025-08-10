import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError } from 'app/common/utils';
import { EquipamentDTO } from 'app/equipament/equipament-model';
import useDocumentTitle from 'app/common/use-document-title';
import api from 'app/services/api';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {createActionTemplate} from "app/common/data-templates";

export default function EquipamentList() {
  const { t } = useTranslation();
  useDocumentTitle(t('equipament.list.headline'));

  const [equipaments, setEquipaments] = useState<EquipamentDTO[]>([]);
  const navigate = useNavigate();

  const getAllEquipaments = async () => {
    try {
      const response = await api.get("/api/equipaments");
      setEquipaments(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await api.delete("/api/equipaments/" + id);
      navigate('/equipaments', {
            state: {
              msgInfo: t('equipament.delete.success')
            }
          });
      getAllEquipaments();
    } catch (error: any) {
      if (error?.response?.data?.code === 'REFERENCED') {
        const messageParts = error.response.data.message.split(',');
        navigate('/equipaments', {
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
    getAllEquipaments();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('equipament.list.headline')}</h1>
      <div>
        <Link to="/equipaments/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('equipament.list.createNew')}</Link>
      </div>
    </div>
    {!equipaments || equipaments.length === 0 ? (
    <div>{t('equipament.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
        <DataTable value={equipaments}  paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
            <Column field="id" header={t('equipament.id.label')} />
            <Column field="customerId" header={t('equipament.customerId.label')} />
            <Column field="company" header={t('equipament.company.label')} />
            <Column body={(rowData) => createActionTemplate(confirmDelete, '/equipaments/edit/')(rowData)} />
        </DataTable>
    </div>
    )}
  </>);
}
