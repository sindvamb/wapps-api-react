import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError } from 'app/common/utils';
import { EventMenuItemDTO } from 'app/event-menu-item/event-menu-item-model';
import useDocumentTitle from 'app/common/use-document-title';
import api from 'app/services/api';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {createActionTemplate} from "app/common/data-templates";

export default function EventMenuItemList() {
  const { t } = useTranslation();
  useDocumentTitle(t('eventMenuItem.list.headline'));

  const [eventMenuItems, setEventMenuItems] = useState<EventMenuItemDTO[]>([]);
  const navigate = useNavigate();

  const getAllEventMenuItems = async () => {
    try {
      const response = await api.get("/api/eventMenuItems");
      setEventMenuItems(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await api.delete("/api/eventMenuItems/" + id);
      navigate('/eventMenuItems', {
            state: {
              msgInfo: t('eventMenuItem.delete.success')
            }
          });
      getAllEventMenuItems();
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    getAllEventMenuItems();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('eventMenuItem.list.headline')}</h1>
      <div>
        <Link to="/eventMenuItems/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('eventMenuItem.list.createNew')}</Link>
      </div>
    </div>
    {!eventMenuItems || eventMenuItems.length === 0 ? (
    <div>{t('eventMenuItem.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
        <DataTable value={eventMenuItems}  paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
            <Column field="id" header={t('eventMenuItem.id.label')} />
            <Column field="company" header={t('eventMenuItem.company.label')} />
            <Column field="menuItem" header={t('eventMenuItem.menuItem.label')} />
            <Column field="menu" header={t('eventMenuItem.menu.label')} />
            <Column body={(rowData) => createActionTemplate(confirmDelete, '/eventMenuItems/edit/')(rowData)} />
        </DataTable>
    </div>
    )}
  </>);
}
