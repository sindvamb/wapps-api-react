import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError } from 'app/common/utils';
import { DependentDTO } from 'app/dependent/dependent-model';
import useDocumentTitle from 'app/common/use-document-title';
import api from 'app/services/api';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {createActionTemplate} from "app/common/data-templates";

export default function DependentList() {
  const { t } = useTranslation();
  useDocumentTitle(t('dependent.list.headline'));

  const [dependents, setDependents] = useState<DependentDTO[]>([]);
  const navigate = useNavigate();

  const getAllDependents = async () => {
    try {
      const response = await api.get("/api/dependents");
      setDependents(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await api.delete("/api/dependents/" + id);
      navigate('/dependents', {
            state: {
              msgInfo: t('dependent.delete.success')
            }
          });
      getAllDependents();
    } catch (error: any) {
      if (error?.response?.data?.code === 'REFERENCED') {
        const messageParts = error.response.data.message.split(',');
        navigate('/dependents', {
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
    getAllDependents();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('dependent.list.headline')}</h1>
      <div>
        <Link to="/dependents/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('dependent.list.createNew')}</Link>
      </div>
    </div>
    {!dependents || dependents.length === 0 ? (
    <div>{t('dependent.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
        <DataTable value={dependents}  paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
            <Column field="id" header={t('dependent.id.label')} />
            <Column field="customer" header={t('dependent.customer.label')} />
            <Column body={(rowData) => createActionTemplate(confirmDelete, '/dependents/edit/')(rowData)} />
        </DataTable>
    </div>
    )}
  </>);
}
