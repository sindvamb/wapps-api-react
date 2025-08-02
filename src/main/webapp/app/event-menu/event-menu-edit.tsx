import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { EventMenuDTO } from 'app/event-menu/event-menu-model';
import axios from 'axios';
import InputRow from 'app/common/input-row/input-row';
import useDocumentTitle from 'app/common/use-document-title';
import * as yup from 'yup';


function getSchema() {
  setYupDefaults();
  return yup.object({
    company: yup.string().emptyToNull().uuid(),
    eventCustomer: yup.string().emptyToNull().uuid(),
    menu: yup.string().emptyToNull().uuid()
  });
}

export default function EventMenuEdit() {
  const { t } = useTranslation();
  useDocumentTitle(t('eventMenu.edit.headline'));

  const navigate = useNavigate();
  const [companyValues, setCompanyValues] = useState<Record<string,string>>({});
  const [eventCustomerValues, setEventCustomerValues] = useState<Record<string,string>>({});
  const [menuValues, setMenuValues] = useState<Record<string,string>>({});
  const params = useParams();
  const currentId = params.id!;

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const prepareForm = async () => {
    try {
      const companyValuesResponse = await axios.get('/api/eventMenus/companyValues');
      setCompanyValues(companyValuesResponse.data);
      const eventCustomerValuesResponse = await axios.get('/api/eventMenus/eventCustomerValues');
      setEventCustomerValues(eventCustomerValuesResponse.data);
      const menuValuesResponse = await axios.get('/api/eventMenus/menuValues');
      setMenuValues(menuValuesResponse.data);
      const data = (await axios.get('/api/eventMenus/' + currentId)).data;
      useFormResult.reset(data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    prepareForm();
  }, []);

  const updateEventMenu = async (data: EventMenuDTO) => {
    window.scrollTo(0, 0);
    try {
      await axios.put('/api/eventMenus/' + currentId, data);
      navigate('/eventMenus', {
            state: {
              msgSuccess: t('eventMenu.update.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('eventMenu.edit.headline')}</h1>
      <div>
        <Link to="/eventMenus" className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-4 rounded px-5 py-2">{t('eventMenu.edit.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(updateEventMenu)} noValidate>
      <InputRow useFormResult={useFormResult} object="eventMenu" field="id" disabled={true} />
      <InputRow useFormResult={useFormResult} object="eventMenu" field="company" type="select" options={companyValues} />
      <InputRow useFormResult={useFormResult} object="eventMenu" field="eventCustomer" type="select" options={eventCustomerValues} />
      <InputRow useFormResult={useFormResult} object="eventMenu" field="menu" type="select" options={menuValues} />
      <input type="submit" value={t('eventMenu.edit.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6" />
    </form>
  </>);
}
