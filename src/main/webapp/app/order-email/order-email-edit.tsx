import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { OrderEmailDTO } from 'app/order-email/order-email-model';
import axios from 'axios';
import InputRow from 'app/common/input-row/input-row';
import useDocumentTitle from 'app/common/use-document-title';
import * as yup from 'yup';


function getSchema() {
  setYupDefaults();
  return yup.object({
    email: yup.string().emptyToNull().required(),
    order: yup.string().emptyToNull().uuid().required(),
    ticket: yup.string().emptyToNull().uuid()
  });
}

export default function OrderEmailEdit() {
  const { t } = useTranslation();
  useDocumentTitle(t('orderEmail.edit.headline'));

  const navigate = useNavigate();
  const [orderValues, setOrderValues] = useState<Record<string,string>>({});
  const [ticketValues, setTicketValues] = useState<Record<string,string>>({});
  const params = useParams();
  const currentId = params.id!;

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const prepareForm = async () => {
    try {
      const orderValuesResponse = await axios.get('/api/orderEmails/orderValues');
      setOrderValues(orderValuesResponse.data);
      const ticketValuesResponse = await axios.get('/api/orderEmails/ticketValues');
      setTicketValues(ticketValuesResponse.data);
      const data = (await axios.get('/api/orderEmails/' + currentId)).data;
      useFormResult.reset(data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    prepareForm();
  }, []);

  const updateOrderEmail = async (data: OrderEmailDTO) => {
    window.scrollTo(0, 0);
    try {
      await axios.put('/api/orderEmails/' + currentId, data);
      navigate('/orderEmails', {
            state: {
              msgSuccess: t('orderEmail.update.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('orderEmail.edit.headline')}</h1>
      <div>
        <Link to="/orderEmails" className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-4 rounded px-5 py-2">{t('orderEmail.edit.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(updateOrderEmail)} noValidate>
      <InputRow useFormResult={useFormResult} object="orderEmail" field="id" disabled={true} />
      <InputRow useFormResult={useFormResult} object="orderEmail" field="email" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="orderEmail" field="order" required={true} type="select" options={orderValues} />
      <InputRow useFormResult={useFormResult} object="orderEmail" field="ticket" type="select" options={ticketValues} />
      <input type="submit" value={t('orderEmail.edit.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6" />
    </form>
  </>);
}
