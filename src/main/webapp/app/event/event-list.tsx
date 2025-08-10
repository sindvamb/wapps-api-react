import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError } from 'app/common/utils';
import { EventDTO } from 'app/event/event-model';
import useDocumentTitle from 'app/common/use-document-title';
import api from 'app/services/api';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {createActionTemplate} from "app/common/data-templates";

export default function EventList() {
  const { t } = useTranslation();
  useDocumentTitle(t('event.list.headline'));

  const [events, setEvents] = useState<EventDTO[]>([]);
  const navigate = useNavigate();

  const getAllEvents = async () => {
    try {
      const response = await api.get("/api/events");
      setEvents(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await api.delete("/api/events/" + id);
      navigate('/events', {
            state: {
              msgInfo: t('event.delete.success')
            }
          });
      getAllEvents();
    } catch (error: any) {
      if (error?.response?.data?.code === 'REFERENCED') {
        const messageParts = error.response.data.message.split(',');
        navigate('/events', {
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
    getAllEvents();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('event.list.headline')}</h1>
      <div>
        <Link to="/events/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('event.list.createNew')}</Link>
      </div>
    </div>
    {!events || events.length === 0 ? (
    <div>{t('event.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
        <DataTable value={events}  paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
            <Column field="id" header={t('event.id.label')} />
            <Column field="partyPaymentDate" header={t('event.partyPaymentDate.label')} />
            <Column field="partyDate" header={t('event.partyDate.label')} />
            <Column field="timeStart" header={t('event.timeStart.label')} />
            <Column field="timeEnd" header={t('event.timeEnd.label')} />
            <Column field="tentValue" header={t('event.tentValue.label')} />
            <Column field="circulatingValue" header={t('event.circulatingValue.label')} />
            <Column field="creatorId" header={t('event.creatorId.label')} />
            <Column body={(rowData) => createActionTemplate(confirmDelete, '/events/edit/')(rowData)} />
        </DataTable>
    </div>
    )}
  </>);
}
