import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { DependentDTO } from 'app/dependent/dependent-model';
import axios from 'axios';
import InputRow from 'app/common/input-row/input-row';
import useDocumentTitle from 'app/common/use-document-title';
import * as yup from 'yup';


function getSchema() {
  setYupDefaults();
  return yup.object({
    name: yup.string().emptyToNull().required(),
    cpfCnpj: yup.string().emptyToNull(),
    email: yup.string().emptyToNull(),
    cellPhone: yup.string().emptyToNull(),
    type: yup.string().emptyToNull(),
    customer: yup.string().emptyToNull().uuid().required()
  });
}

export default function DependentAdd() {
  const { t } = useTranslation();
  useDocumentTitle(t('dependent.add.headline'));

  const navigate = useNavigate();
  const [customerValues, setCustomerValues] = useState<Record<string,string>>({});

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const prepareRelations = async () => {
    try {
      const customerValuesResponse = await axios.get('/api/dependents/customerValues');
      setCustomerValues(customerValuesResponse.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    prepareRelations();
  }, []);

  const createDependent = async (data: DependentDTO) => {
    window.scrollTo(0, 0);
    try {
      await axios.post('/api/dependents', data);
      navigate('/dependents', {
            state: {
              msgSuccess: t('dependent.create.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('dependent.add.headline')}</h1>
      <div>
        <Link to="/dependents" className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-4 rounded px-5 py-2">{t('dependent.add.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(createDependent)} noValidate>
      <InputRow useFormResult={useFormResult} object="dependent" field="name" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="dependent" field="cpfCnpj" type="textarea" />
      <InputRow useFormResult={useFormResult} object="dependent" field="email" type="textarea" />
      <InputRow useFormResult={useFormResult} object="dependent" field="cellPhone" type="textarea" />
      <InputRow useFormResult={useFormResult} object="dependent" field="type" type="textarea" />
      <InputRow useFormResult={useFormResult} object="dependent" field="customer" required={true} type="select" options={customerValues} />
      <input type="submit" value={t('dependent.add.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6" />
    </form>
  </>);
}
