import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError } from 'app/common/utils';
import { ContactRequestDTO } from 'app/contact-request/contact-request-model';
import useDocumentTitle from 'app/common/use-document-title';
import api from 'app/services/api';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {createActionTemplate} from "app/common/data-templates";

export default function ContactRequestList() {
  const { t } = useTranslation();
  useDocumentTitle(t('contactRequest.list.headline'));

  const [contactRequests, setContactRequests] = useState<ContactRequestDTO[]>([]);
  const navigate = useNavigate();

  const getAllContactRequests = async () => {
    try {
      const response = await api.get("/api/contactRequests");
      setContactRequests(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await api.delete("/api/contactRequests/" + id);
      navigate('/contactRequests', {
            state: {
              msgInfo: t('contactRequest.delete.success')
            }
          });
      getAllContactRequests();
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    getAllContactRequests();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('contactRequest.list.headline')}</h1>
      <div>
        <Link to="/contactRequests/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('contactRequest.list.createNew')}</Link>
      </div>
    </div>
    {!contactRequests || contactRequests.length === 0 ? (
    <div>{t('contactRequest.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
        <DataTable value={contactRequests}  paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
            <Column field="id" header={t('contactRequest.id.label')} />
            <Column field="hasViewd" header={t('contactRequest.hasViewd.label')} />
            <Column field="hasAnswered" header={t('contactRequest.hasAnswered.label')} />
            <Column field="hasPendding" header={t('contactRequest.hasPendding.label')} />
            <Column field="answeredDate" header={t('contactRequest.answeredDate.label')} />
            <Column field="createdAt" header={t('contactRequest.createdAt.label')} />
            <Column field="contact" header={t('contactRequest.contact.label')} />
            <Column body={(rowData) => createActionTemplate(confirmDelete, '/contactRequests/edit/')(rowData)} />
        </DataTable>
    </div>
    )}
  </>);
}
