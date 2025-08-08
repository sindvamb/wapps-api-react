import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { MenuItemDTO } from 'app/menu-item/menu-item-model';
import InputRow from 'app/common/input-row/input-row';
import useDocumentTitle from 'app/common/use-document-title';
import * as yup from 'yup';
import api from 'app/services/api';


function getSchema() {
  setYupDefaults();
  return yup.object({
    name: yup.string().emptyToNull().required(),
    description: yup.string().emptyToNull(),
    quantity: yup.string().emptyToNull(),
    type: yup.string().emptyToNull(),
    gramish: yup.string().emptyToNull(),
    measuredUnit: yup.string().emptyToNull(),
    menu: yup.string().emptyToNull().uuid().required()
  });
}

export default function MenuItemEdit() {
  const { t } = useTranslation();
  useDocumentTitle(t('menuItem.edit.headline'));

  const navigate = useNavigate();
  const [menuValues, setMenuValues] = useState<Record<string,string>>({});
  const params = useParams();
  const currentId = params.id!;

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const prepareForm = async () => {
    try {
      const menuValuesResponse = await api.get("/api/menuItems/menuValues");
      setMenuValues(menuValuesResponse.data);
      const data = (await api.get("/api/menuItems/" + currentId)).data;
      useFormResult.reset(data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    prepareForm();
  }, []);

  const updateMenuItem = async (data: MenuItemDTO) => {
    window.scrollTo(0, 0);
    try {
      await api.put("/api/menuItems/" + currentId, data);
      navigate('/menuItems', {
            state: {
              msgSuccess: t('menuItem.update.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('menuItem.edit.headline')}</h1>
      <div>
        <Link to="/menuItems" className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-4 rounded px-5 py-2">{t('menuItem.edit.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(updateMenuItem)} noValidate>
      <InputRow useFormResult={useFormResult} object="menuItem" field="id" disabled={true} />
      <InputRow useFormResult={useFormResult} object="menuItem" field="name" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="menuItem" field="description" type="textarea" />
      <InputRow useFormResult={useFormResult} object="menuItem" field="quantity" type="textarea" />
      <InputRow useFormResult={useFormResult} object="menuItem" field="type" type="textarea" />
      <InputRow useFormResult={useFormResult} object="menuItem" field="gramish" type="textarea" />
      <InputRow useFormResult={useFormResult} object="menuItem" field="measuredUnit" type="textarea" />
      <InputRow useFormResult={useFormResult} object="menuItem" field="menu" required={true} type="select" options={menuValues} />
      <input type="submit" value={t('menuItem.edit.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6" />
    </form>
  </>);
}
