import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { OrderEmailDTO } from 'app/order-email/order-email-model';
import InputRow from 'app/common/input-row/input-row';
import useDocumentTitle from 'app/common/use-document-title';
import * as yup from 'yup';
import api from 'app/services/api';


function getSchema() {
  setYupDefaults();
  return yup.object({
    email: yup.string().emptyToNull().required(),
    order: yup.string().emptyToNull().uuid().required(),
    ticket: yup.string().emptyToNull().uuid()
  });
}

export default function OrderEmailAdd() {
  const { t } = useTranslation();
  useDocumentTitle(t('orderEmail.add.headline'));

  const navigate = useNavigate();
  const [orderValues, setOrderValues] = useState<Record<string,string>>({});
  const [ticketValues, setTicketValues] = useState<Record<string,string>>({});

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const prepareRelations = async () => {
    try {
      const orderValuesResponse = await api.get("/api/orderEmails/orderValues");
      setOrderValues(orderValuesResponse.data);
      const ticketValuesResponse = await api.get("/api/orderEmails/ticketValues");
      setTicketValues(ticketValuesResponse.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    prepareRelations();
  }, []);

  const createOrderEmail = async (data: OrderEmailDTO) => {
    window.scrollTo(0, 0);
    try {
      await api.post("/api/orderEmails", data);
      navigate('/orderEmails', {
            state: {
              msgSuccess: t('orderEmail.create.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('orderEmail.add.headline')}</h1>
      <div>
        <Link to="/orderEmails" className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-4 rounded px-5 py-2">{t('orderEmail.add.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(createOrderEmail)} noValidate>
      <InputRow useFormResult={useFormResult} object="orderEmail" field="email" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="orderEmail" field="order" required={true} type="select" options={orderValues} />
      <InputRow useFormResult={useFormResult} object="orderEmail" field="ticket" type="select" options={ticketValues} />
      <input type="submit" value={t('orderEmail.add.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6" />
    </form>
  </>);
}
