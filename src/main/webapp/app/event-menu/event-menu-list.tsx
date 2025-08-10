import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError } from 'app/common/utils';
import { EventMenuDTO } from 'app/event-menu/event-menu-model';
import useDocumentTitle from 'app/common/use-document-title';
import api from 'app/services/api';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {createActionTemplate} from "app/common/data-templates";

export default function EventMenuList() {
  const { t } = useTranslation();
  useDocumentTitle(t('eventMenu.list.headline'));

  const [eventMenus, setEventMenus] = useState<EventMenuDTO[]>([]);
  const navigate = useNavigate();

  const getAllEventMenus = async () => {
    try {
      const response = await api.get("/api/eventMenus");
      setEventMenus(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await api.delete("/api/eventMenus/" + id);
      navigate('/eventMenus', {
            state: {
              msgInfo: t('eventMenu.delete.success')
            }
          });
      getAllEventMenus();
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    getAllEventMenus();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('eventMenu.list.headline')}</h1>
      <div>
        <Link to="/eventMenus/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('eventMenu.list.createNew')}</Link>
      </div>
    </div>
    {!eventMenus || eventMenus.length === 0 ? (
    <div>{t('eventMenu.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
        <DataTable value={eventMenus}  paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
            <Column field="id" header={t('eventMenu.id.label')} />
            <Column field="company" header={t('eventMenu.company.label')} />
            <Column field="eventCustomer" header={t('eventMenu.eventCustomer.label')} />
            <Column field="menu" header={t('eventMenu.menu.label')} />
            <Column body={(rowData) => createActionTemplate(confirmDelete, '/eventMenus/edit/')(rowData)} />
        </DataTable>
    </div>
    )}
  </>);
}
