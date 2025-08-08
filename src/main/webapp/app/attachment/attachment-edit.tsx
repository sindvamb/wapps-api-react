import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AttachmentDTO } from 'app/attachment/attachment-model';
import InputRow from 'app/common/input-row/input-row';
import useDocumentTitle from 'app/common/use-document-title';
import * as yup from 'yup';
import api from 'app/services/api';


function getSchema() {
  setYupDefaults();
  return yup.object({
    size: yup.string().emptyToNull().numeric(18, 4).required(),
    name: yup.string().emptyToNull().required(),
    contentType: yup.string().emptyToNull().required(),
    isPublic: yup.bool(),
    description: yup.string().emptyToNull().required(),
    path: yup.string().emptyToNull().required(),
    absoluteUrl: yup.string().emptyToNull().required(),
    inCloud: yup.bool(),
    fileData: yup.string().emptyToNull().required(),
    ticket: yup.string().emptyToNull().uuid()
  });
}

export default function AttachmentEdit() {
  const { t } = useTranslation();
  useDocumentTitle(t('attachment.edit.headline'));

  const navigate = useNavigate();
  const [ticketValues, setTicketValues] = useState<Record<string,string>>({});
  const params = useParams();
  const currentId = params.id!;

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const prepareForm = async () => {
    try {
      const ticketValuesResponse = await api.get("/api/attachments/ticketValues");
      setTicketValues(ticketValuesResponse.data);
      const data = (await api.get("/api/attachments/" + currentId)).data;
      useFormResult.reset(data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    prepareForm();
  }, []);

  const updateAttachment = async (data: AttachmentDTO) => {
    window.scrollTo(0, 0);
    try {
      await api.put("/api/attachments/" + currentId, data);
      navigate('/attachments', {
            state: {
              msgSuccess: t('attachment.update.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('attachment.edit.headline')}</h1>
      <div>
        <Link to="/attachments" className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-4 rounded px-5 py-2">{t('attachment.edit.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(updateAttachment)} noValidate>
      <input type="submit" value={t('attachment.edit.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6 mb-5" />
      <InputRow useFormResult={useFormResult} object="attachment" field="id" disabled={true} />
      <InputRow useFormResult={useFormResult} object="attachment" field="size" required={true} />
      <InputRow useFormResult={useFormResult} object="attachment" field="name" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="attachment" field="contentType" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="attachment" field="isPublic" type="checkbox" />
      <InputRow useFormResult={useFormResult} object="attachment" field="description" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="attachment" field="path" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="attachment" field="absoluteUrl" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="attachment" field="inCloud" type="checkbox" />
      <InputRow useFormResult={useFormResult} object="attachment" field="fileData" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="attachment" field="ticket" type="select" options={ticketValues} />
      <input type="submit" value={t('attachment.edit.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6" />
    </form>
  </>);
}
