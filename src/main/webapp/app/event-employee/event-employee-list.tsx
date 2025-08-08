import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError } from 'app/common/utils';
import { EventEmployeeDTO } from 'app/event-employee/event-employee-model';
import useDocumentTitle from 'app/common/use-document-title';
import api from 'app/services/api';

export default function EventEmployeeList() {
  const { t } = useTranslation();
  useDocumentTitle(t('eventEmployee.list.headline'));

  const [eventEmployees, setEventEmployees] = useState<EventEmployeeDTO[]>([]);
  const navigate = useNavigate();

  const getAllEventEmployees = async () => {
    try {
      const response = await api.get("/api/eventEmployees");
      setEventEmployees(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await api.delete("/api/eventEmployees/" + id);
      navigate('/eventEmployees', {
            state: {
              msgInfo: t('eventEmployee.delete.success')
            }
          });
      getAllEventEmployees();
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    getAllEventEmployees();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('eventEmployee.list.headline')}</h1>
      <div>
        <Link to="/eventEmployees/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('eventEmployee.list.createNew')}</Link>
      </div>
    </div>
    {!eventEmployees || eventEmployees.length === 0 ? (
    <div>{t('eventEmployee.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th scope="col" className="text-left p-2">{t('eventEmployee.id.label')}</th>
            <th scope="col" className="text-left p-2">{t('eventEmployee.company.label')}</th>
            <th scope="col" className="text-left p-2">{t('eventEmployee.employee.label')}</th>
            <th scope="col" className="text-left p-2">{t('eventEmployee.eventCustomer.label')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="border-t-2 border-black">
          {eventEmployees.map((eventEmployee) => (
          <tr key={eventEmployee.id} className="odd:bg-gray-100">
            <td className="p-2">{eventEmployee.id}</td>
            <td className="p-2">{eventEmployee.company}</td>
            <td className="p-2">{eventEmployee.employee}</td>
            <td className="p-2">{eventEmployee.eventCustomer}</td>
            <td className="p-2">
              <div className="float-right whitespace-nowrap">
                <Link to={'/eventEmployees/edit/' + eventEmployee.id} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm">{t('eventEmployee.list.edit')}</Link>
                <span> </span>
                <button type="button" onClick={() => confirmDelete(eventEmployee.id!)} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm cursor-pointer">{t('eventEmployee.list.delete')}</button>
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
