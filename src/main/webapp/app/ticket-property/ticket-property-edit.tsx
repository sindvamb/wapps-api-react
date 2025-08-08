import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TicketPropertyDTO } from 'app/ticket-property/ticket-property-model';
import api from 'app/services/api';
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

export default function TicketPropertyEdit() {
  const { t } = useTranslation();
  useDocumentTitle(t('ticketProperty.edit.headline'));

  const navigate = useNavigate();
  const [ticketValues, setTicketValues] = useState<Record<string,string>>({});
  const params = useParams();
  const currentId = params.id!;

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const prepareForm = async () => {
    try {
      const ticketValuesResponse = await api.get("/api/ticketProperties/ticketValues");
      setTicketValues(ticketValuesResponse.data);
      const data = (await api.get("/api/ticketProperties/" + currentId)).data;
      useFormResult.reset(data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    prepareForm();
  }, []);

  const updateTicketProperty = async (data: TicketPropertyDTO) => {
    window.scrollTo(0, 0);
    try {
      await api.put("/api/ticketProperties/" + currentId, data);
      navigate('/ticketProperties', {
            state: {
              msgSuccess: t('ticketProperty.update.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('ticketProperty.edit.headline')}</h1>
      <div>
        <Link to="/ticketProperties" className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-4 rounded px-5 py-2">{t('ticketProperty.edit.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(updateTicketProperty)} noValidate>
      <InputRow useFormResult={useFormResult} object="ticketProperty" field="id" disabled={true} />
      <InputRow useFormResult={useFormResult} object="ticketProperty" field="value" type="textarea" />
      <InputRow useFormResult={useFormResult} object="ticketProperty" field="ticket" required={true} type="select" options={ticketValues} />
      <input type="submit" value={t('ticketProperty.edit.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6" />
    </form>
  </>);
}
