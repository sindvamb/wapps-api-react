import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError } from 'app/common/utils';
import { MenuItemDTO } from 'app/menu-item/menu-item-model';
import useDocumentTitle from 'app/common/use-document-title';
import api from 'app/services/api';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {createActionTemplate} from "app/common/data-templates";

export default function MenuItemList() {
  const { t } = useTranslation();
  useDocumentTitle(t('menuItem.list.headline'));

  const [menuItems, setMenuItems] = useState<MenuItemDTO[]>([]);
  const navigate = useNavigate();

  const getAllMenuItems = async () => {
    try {
      const response = await api.get("/api/menuItems");
      setMenuItems(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await api.delete("/api/menuItems/" + id);
      navigate('/menuItems', {
            state: {
              msgInfo: t('menuItem.delete.success')
            }
          });
      getAllMenuItems();
    } catch (error: any) {
      if (error?.response?.data?.code === 'REFERENCED') {
        const messageParts = error.response.data.message.split(',');
        navigate('/menuItems', {
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
    getAllMenuItems();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('menuItem.list.headline')}</h1>
      <div>
        <Link to="/menuItems/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('menuItem.list.createNew')}</Link>
      </div>
    </div>
    {!menuItems || menuItems.length === 0 ? (
    <div>{t('menuItem.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
        <DataTable value={menuItems} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
            <Column field="id" header={t('menuItem.id.label')} />
            <Column field="menu" header={t('menuItem.menu.label')} />
            <Column body={(rowData) => createActionTemplate(confirmDelete, '/menuItems/edit/')(rowData)} />
        </DataTable>
    </div>
    )}
  </>);
}
