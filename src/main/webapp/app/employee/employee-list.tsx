import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError } from 'app/common/utils';
import { EmployeeDTO } from 'app/employee/employee-model';
import useDocumentTitle from 'app/common/use-document-title';
import api from 'app/services/api';

export default function EmployeeList() {
  const { t } = useTranslation();
  useDocumentTitle(t('employee.list.headline'));

  const [employees, setEmployees] = useState<EmployeeDTO[]>([]);
  const navigate = useNavigate();

  const getAllEmployees = async () => {
    try {
      const response = await api.get("/api/employees");
      setEmployees(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await api.delete("/api/employees/" + id);
      navigate('/employees', {
            state: {
              msgInfo: t('employee.delete.success')
            }
          });
      getAllEmployees();
    } catch (error: any) {
      if (error?.response?.data?.code === 'REFERENCED') {
        const messageParts = error.response.data.message.split(',');
        navigate('/employees', {
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
    getAllEmployees();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('employee.list.headline')}</h1>
      <div>
        <Link to="/employees/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('employee.list.createNew')}</Link>
      </div>
    </div>
    {!employees || employees.length === 0 ? (
    <div>{t('employee.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th scope="col" className="text-left p-2">{t('employee.id.label')}</th>
            <th scope="col" className="text-left p-2">{t('employee.isApprentice.label')}</th>
            <th scope="col" className="text-left p-2">{t('employee.customerId.label')}</th>
            <th scope="col" className="text-left p-2">{t('employee.company.label')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="border-t-2 border-black">
          {employees.map((employee) => (
          <tr key={employee.id} className="odd:bg-gray-100">
            <td className="p-2">{employee.id}</td>
            <td className="p-2">{employee.isApprentice?.toString()}</td>
            <td className="p-2">{employee.customerId}</td>
            <td className="p-2">{employee.company}</td>
            <td className="p-2">
              <div className="float-right whitespace-nowrap">
                <Link to={'/employees/edit/' + employee.id} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm">{t('employee.list.edit')}</Link>
                <span> </span>
                <button type="button" onClick={() => confirmDelete(employee.id!)} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm cursor-pointer">{t('employee.list.delete')}</button>
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
