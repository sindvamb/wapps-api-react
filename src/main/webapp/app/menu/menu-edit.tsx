import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { MenuDTO } from 'app/menu/menu-model';
import InputRow from 'app/common/input-row/input-row';
import useDocumentTitle from 'app/common/use-document-title';
import * as yup from 'yup';
import api from 'app/services/api';


function getSchema() {
  setYupDefaults();
  return yup.object({
    name: yup.string().emptyToNull().required(),
    description: yup.string().emptyToNull(),
    company: yup.string().emptyToNull().uuid()
  });
}

export default function MenuEdit() {
  const { t } = useTranslation();
  useDocumentTitle(t('menu.edit.headline'));

  const navigate = useNavigate();
  const [companyValues, setCompanyValues] = useState<Record<string,string>>({});
  const params = useParams();
  const currentId = params.id!;

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const prepareForm = async () => {
    try {
      const companyValuesResponse = await api.get("/api/menus/companyValues");
      setCompanyValues(companyValuesResponse.data);
      const data = (await api.get("/api/menus/" + currentId)).data;
      useFormResult.reset(data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    prepareForm();
  }, []);

  const updateMenu = async (data: MenuDTO) => {
    window.scrollTo(0, 0);
    try {
      await api.put("/api/menus/" + currentId, data);
      navigate('/menus', {
            state: {
              msgSuccess: t('menu.update.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('menu.edit.headline')}</h1>
      <div>
        <Link to="/menus" className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-4 rounded px-5 py-2">{t('menu.edit.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(updateMenu)} noValidate>
      <InputRow useFormResult={useFormResult} object="menu" field="id" disabled={true} />
      <InputRow useFormResult={useFormResult} object="menu" field="name" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="menu" field="description" type="textarea" />
      <InputRow useFormResult={useFormResult} object="menu" field="company" type="select" options={companyValues} />
      <input type="submit" value={t('menu.edit.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6" />
    </form>
  </>);
}
