import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError } from 'app/common/utils';
import { AttachmentDTO } from 'app/attachment/attachment-model';
import useDocumentTitle from 'app/common/use-document-title';
import api from 'app/services/api';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {createActionTemplate} from "app/common/data-templates";

export default function AttachmentList() {
  const { t } = useTranslation();
  useDocumentTitle(t('attachment.list.headline'));

  const [attachments, setAttachments] = useState<AttachmentDTO[]>([]);
  const navigate = useNavigate();

  const getAllAttachments = async () => {
    try {
      const response = await api.get("/api/attachments");
      setAttachments(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await api.delete("/api/attachments/" + id);
      navigate('/attachments', {
            state: {
              msgInfo: t('attachment.delete.success')
            }
          });
      getAllAttachments();
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    getAllAttachments();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('attachment.list.headline')}</h1>
      <div>
        <Link to="/attachments/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('attachment.list.createNew')}</Link>
      </div>
    </div>
    {!attachments || attachments.length === 0 ? (
    <div>{t('attachment.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
        <DataTable value={attachments}  paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
            <Column field="id" header={t('attachment.id.label')} />
            <Column field="size" header={t('attachment.size.label')} />
            <Column field="isPublic" header={t('attachment.isPublic.label')} />
            <Column field="inCloud" header={t('attachment.inCloud.label')} />
            <Column field="ticket" header={t('attachment.ticket.label')} />
            <Column body={(rowData) => createActionTemplate(confirmDelete, '/attachments/edit/')(rowData)} />
        </DataTable>
    </div>
    )}
  </>);
}
