import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError } from 'app/common/utils';
import { EventEquipamentDTO } from 'app/event-equipament/event-equipament-model';
import useDocumentTitle from 'app/common/use-document-title';
import api from 'app/services/api';

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
      <table className="w-full">
        <thead>
          <tr>
            <th scope="col" className="text-left p-2">{t('eventEquipament.id.label')}</th>
            <th scope="col" className="text-left p-2">{t('eventEquipament.company.label')}</th>
            <th scope="col" className="text-left p-2">{t('eventEquipament.equipament.label')}</th>
            <th scope="col" className="text-left p-2">{t('eventEquipament.eventCustomer.label')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="border-t-2 border-black">
          {eventEquipaments.map((eventEquipament) => (
          <tr key={eventEquipament.id} className="odd:bg-gray-100">
            <td className="p-2">{eventEquipament.id}</td>
            <td className="p-2">{eventEquipament.company}</td>
            <td className="p-2">{eventEquipament.equipament}</td>
            <td className="p-2">{eventEquipament.eventCustomer}</td>
            <td className="p-2">
              <div className="float-right whitespace-nowrap">
                <Link to={'/eventEquipaments/edit/' + eventEquipament.id} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm">{t('eventEquipament.list.edit')}</Link>
                <span> </span>
                <button type="button" onClick={() => confirmDelete(eventEquipament.id!)} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm cursor-pointer">{t('eventEquipament.list.delete')}</button>
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
