import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { EmployeeDTO } from 'app/employee/employee-model';
import axios from 'axios';
import InputRow from 'app/common/input-row/input-row';
import useDocumentTitle from 'app/common/use-document-title';
import * as yup from 'yup';


function getSchema() {
  setYupDefaults();
  return yup.object({
    name: yup.string().emptyToNull().required(),
    cpfCnpj: yup.string().emptyToNull().required(),
    description: yup.string().emptyToNull(),
    cellPhone: yup.string().emptyToNull(),
    position: yup.string().emptyToNull().required(),
    isApprentice: yup.bool(),
    customerId: yup.string().emptyToNull().uuid(),
    address: yup.string().emptyToNull(),
    company: yup.string().emptyToNull().uuid()
  });
}

export default function EmployeeEdit() {
  const { t } = useTranslation();
  useDocumentTitle(t('employee.edit.headline'));

  const navigate = useNavigate();
  const [companyValues, setCompanyValues] = useState<Record<string,string>>({});
  const params = useParams();
  const currentId = params.id!;

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const prepareForm = async () => {
    try {
      const companyValuesResponse = await axios.get('/api/employees/companyValues');
      setCompanyValues(companyValuesResponse.data);
      const data = (await axios.get('/api/employees/' + currentId)).data;
      useFormResult.reset(data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    prepareForm();
  }, []);

  const updateEmployee = async (data: EmployeeDTO) => {
    window.scrollTo(0, 0);
    try {
      await axios.put('/api/employees/' + currentId, data);
      navigate('/employees', {
            state: {
              msgSuccess: t('employee.update.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('employee.edit.headline')}</h1>
      <div>
        <Link to="/employees" className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-4 rounded px-5 py-2">{t('employee.edit.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(updateEmployee)} noValidate>
      <InputRow useFormResult={useFormResult} object="employee" field="id" disabled={true} />
      <InputRow useFormResult={useFormResult} object="employee" field="name" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="employee" field="cpfCnpj" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="employee" field="description" type="textarea" />
      <InputRow useFormResult={useFormResult} object="employee" field="cellPhone" type="textarea" />
      <InputRow useFormResult={useFormResult} object="employee" field="position" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="employee" field="isApprentice" type="checkbox" />
      <InputRow useFormResult={useFormResult} object="employee" field="customerId" />
      <InputRow useFormResult={useFormResult} object="employee" field="address" type="textarea" />
      <InputRow useFormResult={useFormResult} object="employee" field="company" type="select" options={companyValues} />
      <input type="submit" value={t('employee.edit.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6" />
    </form>
  </>);
}
