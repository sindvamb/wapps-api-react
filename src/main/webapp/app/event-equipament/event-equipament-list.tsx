import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError } from 'app/common/utils';
import { EventEquipamentDTO } from 'app/event-equipament/event-equipament-model';
import useDocumentTitle from 'app/common/use-document-title';
import api from 'app/services/api';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {createActionTemplate} from "app/common/data-templates";

export default function EventEquipamentList() {
  const { t } = useTranslation();
  useDocumentTitle(t('eventEquipament.list.headline'));

  const [eventEquipaments, setEventEquipaments] = useState<EventEquipamentDTO[]>([]);
  const navigate = useNavigate();

  const getAllEventEquipaments = async () => {
    try {
      const response = await api.get("/api/eventEquipaments");
      setEventEquipaments(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await api.delete("/api/eventEquipaments/" + id);
      navigate('/eventEquipaments', {
            state: {
              msgInfo: t('eventEquipament.delete.success')
            }
          });
      getAllEventEquipaments();
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    getAllEventEquipaments();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('eventEquipament.list.headline')}</h1>
      <div>
        <Link to="/eventEquipaments/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('eventEquipament.list.createNew')}</Link>
      </div>
    </div>
    {!eventEquipaments || eventEquipaments.length === 0 ? (
    <div>{t('eventEquipament.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
        <DataTable value={eventEquipaments}  paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
            <Column field="id" header={t('eventEquipament.id.label')} />
            <Column field="company" header={t('eventEquipament.company.label')} />
            <Column field="equipament" header={t('eventEquipament.equipament.label')} />
            <Column field="eventCustomer" header={t('eventEquipament.eventCustomer.label')} />
            <Column body={(rowData) => createActionTemplate(confirmDelete, '/eventEquipaments/edit/')(rowData)} />
        </DataTable>
    </div>
    )}
  </>);
}
