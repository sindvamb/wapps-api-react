import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TicketStatusDTO } from 'app/ticket-status/ticket-status-model';
import axios from 'axios';
import InputRow from 'app/common/input-row/input-row';
import useDocumentTitle from 'app/common/use-document-title';
import * as yup from 'yup';


function getSchema() {
  setYupDefaults();
  return yup.object({
    code: yup.string().emptyToNull(),
    description: yup.string().emptyToNull()
  });
}

export default function TicketStatusEdit() {
  const { t } = useTranslation();
  useDocumentTitle(t('ticketStatus.edit.headline'));

  const navigate = useNavigate();
  const params = useParams();
  const currentId = params.id!;

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const prepareForm = async () => {
    try {
      const data = (await axios.get('/api/ticketStatuses/' + currentId)).data;
      useFormResult.reset(data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    prepareForm();
  }, []);

  const updateTicketStatus = async (data: TicketStatusDTO) => {
    window.scrollTo(0, 0);
    try {
      await axios.put('/api/ticketStatuses/' + currentId, data);
      navigate('/ticketStatuses', {
            state: {
              msgSuccess: t('ticketStatus.update.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('ticketStatus.edit.headline')}</h1>
      <div>
        <Link to="/ticketStatuses" className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-4 rounded px-5 py-2">{t('ticketStatus.edit.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(updateTicketStatus)} noValidate>
      <InputRow useFormResult={useFormResult} object="ticketStatus" field="id" disabled={true} />
      <InputRow useFormResult={useFormResult} object="ticketStatus" field="code" type="textarea" />
      <InputRow useFormResult={useFormResult} object="ticketStatus" field="description" type="textarea" />
      <input type="submit" value={t('ticketStatus.edit.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6" />
    </form>
  </>);
}
