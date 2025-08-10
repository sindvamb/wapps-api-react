import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError } from 'app/common/utils';
import { FileControlDTO } from 'app/file-control/file-control-model';
import useDocumentTitle from 'app/common/use-document-title';
import api from 'app/services/api';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {createActionTemplate} from "app/common/data-templates";

export default function FileControlList() {
  const { t } = useTranslation();
  useDocumentTitle(t('fileControl.list.headline'));

  const [fileControls, setFileControls] = useState<FileControlDTO[]>([]);
  const navigate = useNavigate();

  const getAllFileControls = async () => {
    try {
      const response = await api.get("/api/fileControls");
      setFileControls(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await api.delete("/api/fileControls/" + id);
      navigate('/fileControls', {
            state: {
              msgInfo: t('fileControl.delete.success')
            }
          });
      getAllFileControls();
    } catch (error: any) {
      if (error?.response?.data?.code === 'REFERENCED') {
        const messageParts = error.response.data.message.split(',');
        navigate('/fileControls', {
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
    getAllFileControls();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('fileControl.list.headline')}</h1>
      <div>
        <Link to="/fileControls/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('fileControl.list.createNew')}</Link>
      </div>
    </div>
    {!fileControls || fileControls.length === 0 ? (
    <div>{t('fileControl.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
        <DataTable value={fileControls}  paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
            <Column field="id" header={t('fileControl.id.label')} />
            <Column field="fileSize" header={t('fileControl.fileSize.label')} />
            <Column field="approved" header={t('fileControl.approved.label')} />
            <Column field="company" header={t('fileControl.company.label')} />
            <Column field="dependent" header={t('fileControl.dependent.label')} />
            <Column field="eventCustomer" header={t('fileControl.eventCustomer.label')} />
            <Column field="event" header={t('fileControl.event.label')} />
            <Column field="layout" header={t('fileControl.layout.label')} />
            <Column body={(rowData) => createActionTemplate(confirmDelete, '/fileControls/edit/')(rowData)} />
        </DataTable>
    </div>
    )}
  </>);
}
