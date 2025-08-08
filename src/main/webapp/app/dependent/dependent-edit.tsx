import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { DependentDTO } from 'app/dependent/dependent-model';
import InputRow from 'app/common/input-row/input-row';
import useDocumentTitle from 'app/common/use-document-title';
import * as yup from 'yup';
import api from 'app/services/api';


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

export default function DependentEdit() {
  const { t } = useTranslation();
  useDocumentTitle(t('dependent.edit.headline'));

  const navigate = useNavigate();
  const [customerValues, setCustomerValues] = useState<Record<string,string>>({});
  const params = useParams();
  const currentId = params.id!;

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const prepareForm = async () => {
    try {
      const customerValuesResponse = await api.get("/api/dependents/customerValues");
      setCustomerValues(customerValuesResponse.data);
      const data = (await api.get("/api/dependents/" + currentId)).data;
      useFormResult.reset(data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    prepareForm();
  }, []);

  const updateDependent = async (data: DependentDTO) => {
    window.scrollTo(0, 0);
    try {
      await api.put("/api/dependents/" + currentId, data);
      navigate('/dependents', {
            state: {
              msgSuccess: t('dependent.update.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('dependent.edit.headline')}</h1>
      <div>
        <Link to="/dependents" className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-4 rounded px-5 py-2">{t('dependent.edit.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(updateDependent)} noValidate>
      <InputRow useFormResult={useFormResult} object="dependent" field="id" disabled={true} />
      <InputRow useFormResult={useFormResult} object="dependent" field="name" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="dependent" field="cpfCnpj" type="textarea" />
      <InputRow useFormResult={useFormResult} object="dependent" field="email" type="textarea" />
      <InputRow useFormResult={useFormResult} object="dependent" field="cellPhone" type="textarea" />
      <InputRow useFormResult={useFormResult} object="dependent" field="type" type="textarea" />
      <InputRow useFormResult={useFormResult} object="dependent" field="customer" required={true} type="select" options={customerValues} />
      <input type="submit" value={t('dependent.edit.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6" />
    </form>
  </>);
}
