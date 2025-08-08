import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError } from 'app/common/utils';
import { EventMenuItemDTO } from 'app/event-menu-item/event-menu-item-model';
import useDocumentTitle from 'app/common/use-document-title';
import api from 'app/services/api';

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
      <table className="w-full">
        <thead>
          <tr>
            <th scope="col" className="text-left p-2">{t('eventMenuItem.id.label')}</th>
            <th scope="col" className="text-left p-2">{t('eventMenuItem.company.label')}</th>
            <th scope="col" className="text-left p-2">{t('eventMenuItem.menuItem.label')}</th>
            <th scope="col" className="text-left p-2">{t('eventMenuItem.menu.label')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="border-t-2 border-black">
          {eventMenuItems.map((eventMenuItem) => (
          <tr key={eventMenuItem.id} className="odd:bg-gray-100">
            <td className="p-2">{eventMenuItem.id}</td>
            <td className="p-2">{eventMenuItem.company}</td>
            <td className="p-2">{eventMenuItem.menuItem}</td>
            <td className="p-2">{eventMenuItem.menu}</td>
            <td className="p-2">
              <div className="float-right whitespace-nowrap">
                <Link to={'/eventMenuItems/edit/' + eventMenuItem.id} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm">{t('eventMenuItem.list.edit')}</Link>
                <span> </span>
                <button type="button" onClick={() => confirmDelete(eventMenuItem.id!)} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm cursor-pointer">{t('eventMenuItem.list.delete')}</button>
              </div>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
    )}
  </>);
}
