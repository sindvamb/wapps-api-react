import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ContactRequestDTO } from 'app/contact-request/contact-request-model';
import InputRow from 'app/common/input-row/input-row';
import useDocumentTitle from 'app/common/use-document-title';
import * as yup from 'yup';
import api from 'app/services/api';


function getSchema() {
  setYupDefaults();
  return yup.object({
    subject: yup.string().emptyToNull().required(),
    profile: yup.string().emptyToNull().required(),
    message: yup.string().emptyToNull().required(),
    response: yup.string().emptyToNull(),
    hasViewd: yup.bool(),
    hasAnswered: yup.bool(),
    hasPendding: yup.bool(),
    answeredDate: yup.string().emptyToNull().offsetDateTime(),
    createdAt: yup.string().emptyToNull().offsetDateTime().required(),
    contact: yup.string().emptyToNull().uuid()
  });
}

export default function ContactRequestEdit() {
  const { t } = useTranslation();
  useDocumentTitle(t('contactRequest.edit.headline'));

  const navigate = useNavigate();
  const [contactValues, setContactValues] = useState<Record<string,string>>({});
  const params = useParams();
  const currentId = params.id!;

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const prepareForm = async () => {
    try {
      const contactValuesResponse = await api.get("/api/contactRequests/contactValues");
      setContactValues(contactValuesResponse.data);
      const data = (await api.get("/api/contactRequests/" + currentId)).data;
      useFormResult.reset(data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    prepareForm();
  }, []);

  const updateContactRequest = async (data: ContactRequestDTO) => {
    window.scrollTo(0, 0);
    try {
      await api.put("/api/contactRequests/" + currentId, data);
      navigate('/contactRequests', {
            state: {
              msgSuccess: t('contactRequest.update.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('contactRequest.edit.headline')}</h1>
      <div>
        <Link to="/contactRequests" className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-4 rounded px-5 py-2">{t('contactRequest.edit.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(updateContactRequest)} noValidate>
      <input type="submit" value={t('contactRequest.edit.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6 mb-5" />
      <InputRow useFormResult={useFormResult} object="contactRequest" field="id" disabled={true} />
      <InputRow useFormResult={useFormResult} object="contactRequest" field="subject" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="contactRequest" field="profile" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="contactRequest" field="message" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="contactRequest" field="response" type="textarea" />
      <InputRow useFormResult={useFormResult} object="contactRequest" field="hasViewd" type="checkbox" />
      <InputRow useFormResult={useFormResult} object="contactRequest" field="hasAnswered" type="checkbox" />
      <InputRow useFormResult={useFormResult} object="contactRequest" field="hasPendding" type="checkbox" />
      <InputRow useFormResult={useFormResult} object="contactRequest" field="answeredDate" />
      <InputRow useFormResult={useFormResult} object="contactRequest" field="createdAt" required={true} />
      <InputRow useFormResult={useFormResult} object="contactRequest" field="contact" type="select" options={contactValues} />
      <input type="submit" value={t('contactRequest.edit.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6" />
    </form>
  </>);
}
