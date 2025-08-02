import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { MenuDTO } from 'app/menu/menu-model';
import axios from 'axios';
import InputRow from 'app/common/input-row/input-row';
import useDocumentTitle from 'app/common/use-document-title';
import * as yup from 'yup';


function getSchema() {
  setYupDefaults();
  return yup.object({
    name: yup.string().emptyToNull().required(),
    description: yup.string().emptyToNull(),
    company: yup.string().emptyToNull().uuid()
  });
}

export default function MenuAdd() {
  const { t } = useTranslation();
  useDocumentTitle(t('menu.add.headline'));

  const navigate = useNavigate();
  const [companyValues, setCompanyValues] = useState<Record<string,string>>({});

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const prepareRelations = async () => {
    try {
      const companyValuesResponse = await axios.get('/api/menus/companyValues');
      setCompanyValues(companyValuesResponse.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    prepareRelations();
  }, []);

  const createMenu = async (data: MenuDTO) => {
    window.scrollTo(0, 0);
    try {
      await axios.post('/api/menus', data);
      navigate('/menus', {
            state: {
              msgSuccess: t('menu.create.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('menu.add.headline')}</h1>
      <div>
        <Link to="/menus" className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-4 rounded px-5 py-2">{t('menu.add.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(createMenu)} noValidate>
      <InputRow useFormResult={useFormResult} object="menu" field="name" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="menu" field="description" type="textarea" />
      <InputRow useFormResult={useFormResult} object="menu" field="company" type="select" options={companyValues} />
      <input type="submit" value={t('menu.add.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6" />
    </form>
  </>);
}
