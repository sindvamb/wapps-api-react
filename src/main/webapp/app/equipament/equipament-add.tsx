import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { EquipamentDTO } from 'app/equipament/equipament-model';
import axios from 'axios';
import InputRow from 'app/common/input-row/input-row';
import useDocumentTitle from 'app/common/use-document-title';
import * as yup from 'yup';


function getSchema() {
  setYupDefaults();
  return yup.object({
    name: yup.string().emptyToNull().required(),
    description: yup.string().emptyToNull(),
    voltage: yup.string().emptyToNull(),
    type: yup.string().emptyToNull(),
    weight: yup.string().emptyToNull(),
    customerId: yup.string().emptyToNull().uuid(),
    company: yup.string().emptyToNull().uuid()
  });
}

export default function EquipamentAdd() {
  const { t } = useTranslation();
  useDocumentTitle(t('equipament.add.headline'));

  const navigate = useNavigate();
  const [companyValues, setCompanyValues] = useState<Record<string,string>>({});

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const prepareRelations = async () => {
    try {
      const companyValuesResponse = await axios.get('/api/equipaments/companyValues');
      setCompanyValues(companyValuesResponse.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    prepareRelations();
  }, []);

  const createEquipament = async (data: EquipamentDTO) => {
    window.scrollTo(0, 0);
    try {
      await axios.post('/api/equipaments', data);
      navigate('/equipaments', {
            state: {
              msgSuccess: t('equipament.create.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('equipament.add.headline')}</h1>
      <div>
        <Link to="/equipaments" className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-4 rounded px-5 py-2">{t('equipament.add.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(createEquipament)} noValidate>
      <InputRow useFormResult={useFormResult} object="equipament" field="name" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="equipament" field="description" type="textarea" />
      <InputRow useFormResult={useFormResult} object="equipament" field="voltage" type="textarea" />
      <InputRow useFormResult={useFormResult} object="equipament" field="type" type="textarea" />
      <InputRow useFormResult={useFormResult} object="equipament" field="weight" type="textarea" />
      <InputRow useFormResult={useFormResult} object="equipament" field="customerId" />
      <InputRow useFormResult={useFormResult} object="equipament" field="company" type="select" options={companyValues} />
      <input type="submit" value={t('equipament.add.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6" />
    </form>
  </>);
}
