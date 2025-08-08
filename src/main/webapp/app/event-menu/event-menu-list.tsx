import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError } from 'app/common/utils';
import { EventMenuDTO } from 'app/event-menu/event-menu-model';
import useDocumentTitle from 'app/common/use-document-title';
import api from 'app/services/api';

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
      <table className="w-full">
        <thead>
          <tr>
            <th scope="col" className="text-left p-2">{t('eventMenu.id.label')}</th>
            <th scope="col" className="text-left p-2">{t('eventMenu.company.label')}</th>
            <th scope="col" className="text-left p-2">{t('eventMenu.eventCustomer.label')}</th>
            <th scope="col" className="text-left p-2">{t('eventMenu.menu.label')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="border-t-2 border-black">
          {eventMenus.map((eventMenu) => (
          <tr key={eventMenu.id} className="odd:bg-gray-100">
            <td className="p-2">{eventMenu.id}</td>
            <td className="p-2">{eventMenu.company}</td>
            <td className="p-2">{eventMenu.eventCustomer}</td>
            <td className="p-2">{eventMenu.menu}</td>
            <td className="p-2">
              <div className="float-right whitespace-nowrap">
                <Link to={'/eventMenus/edit/' + eventMenu.id} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm">{t('eventMenu.list.edit')}</Link>
                <span> </span>
                <button type="button" onClick={() => confirmDelete(eventMenu.id!)} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm cursor-pointer">{t('eventMenu.list.delete')}</button>
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
