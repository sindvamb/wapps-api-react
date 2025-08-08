import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CustomerTypeDTO } from 'app/customer-type/customer-type-model';
import InputRow from 'app/common/input-row/input-row';
import useDocumentTitle from 'app/common/use-document-title';
import * as yup from 'yup';
import api from 'app/services/api';


function getSchema() {
  setYupDefaults();
  return yup.object({
    code: yup.string().emptyToNull(),
    description: yup.string().emptyToNull()
  });
}

export default function CustomerTypeAdd() {
  const { t } = useTranslation();
  useDocumentTitle(t('customerType.add.headline'));

  const navigate = useNavigate();

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const createCustomerType = async (data: CustomerTypeDTO) => {
    window.scrollTo(0, 0);
    try {
      await api.post("/api/customerTypes", data);
      navigate('/customerTypes', {
            state: {
              msgSuccess: t('customerType.create.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('customerType.add.headline')}</h1>
      <div>
        <Link to="/customerTypes" className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-4 rounded px-5 py-2">{t('customerType.add.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(createCustomerType)} noValidate>
      <InputRow useFormResult={useFormResult} object="customerType" field="code" type="textarea" />
      <InputRow useFormResult={useFormResult} object="customerType" field="description" type="textarea" />
      <input type="submit" value={t('customerType.add.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6" />
    </form>
  </>);
}
