import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { EventMenuItemDTO } from 'app/event-menu-item/event-menu-item-model';
import InputRow from 'app/common/input-row/input-row';
import useDocumentTitle from 'app/common/use-document-title';
import * as yup from 'yup';
import api from 'app/services/api';


function getSchema() {
  setYupDefaults();
  return yup.object({
    company: yup.string().emptyToNull().uuid(),
    menuItem: yup.string().emptyToNull().uuid(),
    menu: yup.string().emptyToNull().uuid()
  });
}

export default function EventMenuItemAdd() {
  const { t } = useTranslation();
  useDocumentTitle(t('eventMenuItem.add.headline'));

  const navigate = useNavigate();
  const [companyValues, setCompanyValues] = useState<Record<string,string>>({});
  const [menuItemValues, setMenuItemValues] = useState<Record<string,string>>({});
  const [menuValues, setMenuValues] = useState<Record<string,string>>({});

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const prepareRelations = async () => {
    try {
      const companyValuesResponse = await api.get("/api/eventMenuItems/companyValues");
      setCompanyValues(companyValuesResponse.data);
      const menuItemValuesResponse = await api.get("/api/eventMenuItems/menuItemValues");
      setMenuItemValues(menuItemValuesResponse.data);
      const menuValuesResponse = await api.get("/api/eventMenuItems/menuValues");
      setMenuValues(menuValuesResponse.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    prepareRelations();
  }, []);

  const createEventMenuItem = async (data: EventMenuItemDTO) => {
    window.scrollTo(0, 0);
    try {
      await api.post("/api/eventMenuItems", data);
      navigate('/eventMenuItems', {
            state: {
              msgSuccess: t('eventMenuItem.create.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('eventMenuItem.add.headline')}</h1>
      <div>
        <Link to="/eventMenuItems" className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-4 rounded px-5 py-2">{t('eventMenuItem.add.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(createEventMenuItem)} noValidate>
      <InputRow useFormResult={useFormResult} object="eventMenuItem" field="company" type="select" options={companyValues} />
      <InputRow useFormResult={useFormResult} object="eventMenuItem" field="menuItem" type="select" options={menuItemValues} />
      <InputRow useFormResult={useFormResult} object="eventMenuItem" field="menu" type="select" options={menuValues} />
      <input type="submit" value={t('eventMenuItem.add.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6" />
    </form>
  </>);
}
