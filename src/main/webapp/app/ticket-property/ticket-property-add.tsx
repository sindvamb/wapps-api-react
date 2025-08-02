import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TicketPropertyDTO } from 'app/ticket-property/ticket-property-model';
import axios from 'axios';
import InputRow from 'app/common/input-row/input-row';
import useDocumentTitle from 'app/common/use-document-title';
import * as yup from 'yup';


function getSchema() {
  setYupDefaults();
  return yup.object({
    value: yup.string().emptyToNull(),
    ticket: yup.string().emptyToNull().uuid().required()
  });
}

export default function TicketPropertyAdd() {
  const { t } = useTranslation();
  useDocumentTitle(t('ticketProperty.add.headline'));

  const navigate = useNavigate();
  const [ticketValues, setTicketValues] = useState<Record<string,string>>({});

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const prepareRelations = async () => {
    try {
      const ticketValuesResponse = await axios.get('/api/ticketProperties/ticketValues');
      setTicketValues(ticketValuesResponse.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    prepareRelations();
  }, []);

  const createTicketProperty = async (data: TicketPropertyDTO) => {
    window.scrollTo(0, 0);
    try {
      await axios.post('/api/ticketProperties', data);
      navigate('/ticketProperties', {
            state: {
              msgSuccess: t('ticketProperty.create.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('ticketProperty.add.headline')}</h1>
      <div>
        <Link to="/ticketProperties" className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-4 rounded px-5 py-2">{t('ticketProperty.add.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(createTicketProperty)} noValidate>
      <InputRow useFormResult={useFormResult} object="ticketProperty" field="value" type="textarea" />
      <InputRow useFormResult={useFormResult} object="ticketProperty" field="ticket" required={true} type="select" options={ticketValues} />
      <input type="submit" value={t('ticketProperty.add.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6" />
    </form>
  </>);
}
