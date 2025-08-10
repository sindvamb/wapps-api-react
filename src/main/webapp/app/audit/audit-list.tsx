import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError } from 'app/common/utils';
import { AuditDTO } from 'app/audit/audit-model';
import useDocumentTitle from 'app/common/use-document-title';
import api from 'app/services/api';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {createActionTemplate} from "app/common/data-templates";

export default function AuditList() {
  const { t } = useTranslation();
  useDocumentTitle(t('audit.list.headline'));

  const [audits, setAudits] = useState<AuditDTO[]>([]);
  const navigate = useNavigate();

  const getAllAudits = async () => {
    try {
      const response = await api.get("/api/audits");
      setAudits(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await api.delete("/api/audits/" + id);
      navigate('/audits', {
            state: {
              msgInfo: t('audit.delete.success')
            }
          });
      getAllAudits();
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    getAllAudits();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('audit.list.headline')}</h1>
      <div>
        <Link to="/audits/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('audit.list.createNew')}</Link>
      </div>
    </div>
    {!audits || audits.length === 0 ? (
    <div>{t('audit.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
        <DataTable value={audits}  paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
            <Column field="id" header={t('audit.id.label')} />
            <Column field="user" header={t('audit.user.label')} />
            <Column body={(rowData) => createActionTemplate(confirmDelete, '/audits/edit/')(rowData)} />
        </DataTable>
    </div>
    )}
  </>);
}
