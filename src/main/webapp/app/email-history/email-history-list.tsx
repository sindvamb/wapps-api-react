import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError } from 'app/common/utils';
import { EmailHistoryDTO } from 'app/email-history/email-history-model';
import useDocumentTitle from 'app/common/use-document-title';
import api from 'app/services/api';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {createActionTemplate} from "app/common/data-templates";

export default function EmailHistoryList() {
  const { t } = useTranslation();
  useDocumentTitle(t('emailHistory.list.headline'));

  const [emailHistories, setEmailHistories] = useState<EmailHistoryDTO[]>([]);
  const navigate = useNavigate();

  const getAllEmailHistories = async () => {
    try {
      const response = await api.get("/api/emailHistories");
      setEmailHistories(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await api.delete("/api/emailHistories/" + id);
      navigate('/emailHistories', {
            state: {
              msgInfo: t('emailHistory.delete.success')
            }
          });
      getAllEmailHistories();
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    getAllEmailHistories();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('emailHistory.list.headline')}</h1>
      <div>
        <Link to="/emailHistories/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('emailHistory.list.createNew')}</Link>
      </div>
    </div>
    {!emailHistories || emailHistories.length === 0 ? (
    <div>{t('emailHistory.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
        <DataTable value={emailHistories}  paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
            <Column field="id" header={t('emailHistory.id.label')} />
            <Column field="userId" header={t('emailHistory.userId.label')} />
            <Column field="isSuccess" header={t('emailHistory.isSuccess.label')} />
            <Column field="date" header={t('emailHistory.date.label')} />
            <Column body={(rowData) => createActionTemplate(confirmDelete, '/emailHistories/edit/')(rowData)} />
        </DataTable>
    </div>
    )}
  </>);
}
