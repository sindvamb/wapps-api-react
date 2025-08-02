import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { EventEmployeeDTO } from 'app/event-employee/event-employee-model';
import axios from 'axios';
import InputRow from 'app/common/input-row/input-row';
import useDocumentTitle from 'app/common/use-document-title';
import * as yup from 'yup';


function getSchema() {
  setYupDefaults();
  return yup.object({
    company: yup.string().emptyToNull().uuid(),
    employee: yup.string().emptyToNull().uuid(),
    eventCustomer: yup.string().emptyToNull().uuid()
  });
}

export default function EventEmployeeEdit() {
  const { t } = useTranslation();
  useDocumentTitle(t('eventEmployee.edit.headline'));

  const navigate = useNavigate();
  const [companyValues, setCompanyValues] = useState<Record<string,string>>({});
  const [employeeValues, setEmployeeValues] = useState<Record<string,string>>({});
  const [eventCustomerValues, setEventCustomerValues] = useState<Record<string,string>>({});
  const params = useParams();
  const currentId = params.id!;

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const prepareForm = async () => {
    try {
      const companyValuesResponse = await axios.get('/api/eventEmployees/companyValues');
      setCompanyValues(companyValuesResponse.data);
      const employeeValuesResponse = await axios.get('/api/eventEmployees/employeeValues');
      setEmployeeValues(employeeValuesResponse.data);
      const eventCustomerValuesResponse = await axios.get('/api/eventEmployees/eventCustomerValues');
      setEventCustomerValues(eventCustomerValuesResponse.data);
      const data = (await axios.get('/api/eventEmployees/' + currentId)).data;
      useFormResult.reset(data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    prepareForm();
  }, []);

  const updateEventEmployee = async (data: EventEmployeeDTO) => {
    window.scrollTo(0, 0);
    try {
      await axios.put('/api/eventEmployees/' + currentId, data);
      navigate('/eventEmployees', {
            state: {
              msgSuccess: t('eventEmployee.update.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('eventEmployee.edit.headline')}</h1>
      <div>
        <Link to="/eventEmployees" className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-4 rounded px-5 py-2">{t('eventEmployee.edit.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(updateEventEmployee)} noValidate>
      <InputRow useFormResult={useFormResult} object="eventEmployee" field="id" disabled={true} />
      <InputRow useFormResult={useFormResult} object="eventEmployee" field="company" type="select" options={companyValues} />
      <InputRow useFormResult={useFormResult} object="eventEmployee" field="employee" type="select" options={employeeValues} />
      <InputRow useFormResult={useFormResult} object="eventEmployee" field="eventCustomer" type="select" options={eventCustomerValues} />
      <input type="submit" value={t('eventEmployee.edit.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6" />
    </form>
  </>);
}
