import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError } from 'app/common/utils';
import { EmployeeDTO } from 'app/employee/employee-model';
import useDocumentTitle from 'app/common/use-document-title';
import api from 'app/services/api';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {createActionTemplate} from "app/common/data-templates";

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
        <DataTable value={employees}  paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
            <Column field="id" header={t('employee.id.label')} />
            <Column field="isApprentice" header={t('employee.isApprentice.label')} />
            <Column field="customerId" header={t('employee.customerId.label')} />
            <Column field="company" header={t('employee.company.label')} />
            <Column body={(rowData) => createActionTemplate(confirmDelete, '/employees/edit/')(rowData)} />
        </DataTable>
    </div>
    )}
  </>);
}
