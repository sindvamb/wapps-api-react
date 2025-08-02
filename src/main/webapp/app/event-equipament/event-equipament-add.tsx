import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { EventEquipamentDTO } from 'app/event-equipament/event-equipament-model';
import axios from 'axios';
import InputRow from 'app/common/input-row/input-row';
import useDocumentTitle from 'app/common/use-document-title';
import * as yup from 'yup';


function getSchema() {
  setYupDefaults();
  return yup.object({
    company: yup.string().emptyToNull().uuid(),
    equipament: yup.string().emptyToNull().uuid(),
    eventCustomer: yup.string().emptyToNull().uuid()
  });
}

export default function EventEquipamentAdd() {
  const { t } = useTranslation();
  useDocumentTitle(t('eventEquipament.add.headline'));

  const navigate = useNavigate();
  const [companyValues, setCompanyValues] = useState<Record<string,string>>({});
  const [equipamentValues, setEquipamentValues] = useState<Record<string,string>>({});
  const [eventCustomerValues, setEventCustomerValues] = useState<Record<string,string>>({});

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const prepareRelations = async () => {
    try {
      const companyValuesResponse = await axios.get('/api/eventEquipaments/companyValues');
      setCompanyValues(companyValuesResponse.data);
      const equipamentValuesResponse = await axios.get('/api/eventEquipaments/equipamentValues');
      setEquipamentValues(equipamentValuesResponse.data);
      const eventCustomerValuesResponse = await axios.get('/api/eventEquipaments/eventCustomerValues');
      setEventCustomerValues(eventCustomerValuesResponse.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    prepareRelations();
  }, []);

  const createEventEquipament = async (data: EventEquipamentDTO) => {
    window.scrollTo(0, 0);
    try {
      await axios.post('/api/eventEquipaments', data);
      navigate('/eventEquipaments', {
            state: {
              msgSuccess: t('eventEquipament.create.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('eventEquipament.add.headline')}</h1>
      <div>
        <Link to="/eventEquipaments" className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-4 rounded px-5 py-2">{t('eventEquipament.add.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(createEventEquipament)} noValidate>
      <InputRow useFormResult={useFormResult} object="eventEquipament" field="company" type="select" options={companyValues} />
      <InputRow useFormResult={useFormResult} object="eventEquipament" field="equipament" type="select" options={equipamentValues} />
      <InputRow useFormResult={useFormResult} object="eventEquipament" field="eventCustomer" type="select" options={eventCustomerValues} />
      <input type="submit" value={t('eventEquipament.add.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6" />
    </form>
  </>);
}
