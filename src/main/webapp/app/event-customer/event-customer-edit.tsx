import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { EventCustomerDTO } from 'app/event-customer/event-customer-model';
import axios from 'axios';
import InputRow from 'app/common/input-row/input-row';
import useDocumentTitle from 'app/common/use-document-title';
import * as yup from 'yup';


function getSchema() {
  setYupDefaults();
  return yup.object({
    type: yup.string().emptyToNull().required(),
    approved: yup.bool(),
    company: yup.string().emptyToNull().uuid(),
    customer: yup.string().emptyToNull().uuid(),
    event: yup.string().emptyToNull().uuid().required()
  });
}

export default function EventCustomerEdit() {
  const { t } = useTranslation();
  useDocumentTitle(t('eventCustomer.edit.headline'));

  const navigate = useNavigate();
  const [companyValues, setCompanyValues] = useState<Record<string,string>>({});
  const [customerValues, setCustomerValues] = useState<Record<string,string>>({});
  const [eventValues, setEventValues] = useState<Record<string,string>>({});
  const params = useParams();
  const currentId = params.id!;

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const prepareForm = async () => {
    try {
      const companyValuesResponse = await axios.get('/api/eventCustomers/companyValues');
      setCompanyValues(companyValuesResponse.data);
      const customerValuesResponse = await axios.get('/api/eventCustomers/customerValues');
      setCustomerValues(customerValuesResponse.data);
      const eventValuesResponse = await axios.get('/api/eventCustomers/eventValues');
      setEventValues(eventValuesResponse.data);
      const data = (await axios.get('/api/eventCustomers/' + currentId)).data;
      useFormResult.reset(data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    prepareForm();
  }, []);

  const updateEventCustomer = async (data: EventCustomerDTO) => {
    window.scrollTo(0, 0);
    try {
      await axios.put('/api/eventCustomers/' + currentId, data);
      navigate('/eventCustomers', {
            state: {
              msgSuccess: t('eventCustomer.update.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('eventCustomer.edit.headline')}</h1>
      <div>
        <Link to="/eventCustomers" className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-4 rounded px-5 py-2">{t('eventCustomer.edit.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(updateEventCustomer)} noValidate>
      <InputRow useFormResult={useFormResult} object="eventCustomer" field="id" disabled={true} />
      <InputRow useFormResult={useFormResult} object="eventCustomer" field="type" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="eventCustomer" field="approved" type="checkbox" />
      <InputRow useFormResult={useFormResult} object="eventCustomer" field="company" type="select" options={companyValues} />
      <InputRow useFormResult={useFormResult} object="eventCustomer" field="customer" type="select" options={customerValues} />
      <InputRow useFormResult={useFormResult} object="eventCustomer" field="event" required={true} type="select" options={eventValues} />
      <input type="submit" value={t('eventCustomer.edit.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6" />
    </form>
  </>);
}
