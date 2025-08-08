import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegistrationRequestDTO } from 'app/registration-request/registration-request-model';
import InputRow from 'app/common/input-row/input-row';
import useDocumentTitle from 'app/common/use-document-title';
import * as yup from 'yup';
import api from 'app/services/api';


function getSchema() {
  setYupDefaults();
  return yup.object({
    approved: yup.bool(),
    reason: yup.string().emptyToNull(),
    protocol: yup.string().emptyToNull().required(),
    date: yup.string().emptyToNull().offsetDateTime().required(),
    user: yup.string().emptyToNull().uuid().required()
  });
}

export default function RegistrationRequestEdit() {
  const { t } = useTranslation();
  useDocumentTitle(t('registrationRequest.edit.headline'));

  const navigate = useNavigate();
  const [userValues, setUserValues] = useState<Record<string,string>>({});
  const params = useParams();
  const currentId = params.id!;

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const prepareForm = async () => {
    try {
      const userValuesResponse = await api.get("/api/registrationRequests/userValues");
      setUserValues(userValuesResponse.data);
      const data = (await api.get("/api/registrationRequests/" + currentId)).data;
      useFormResult.reset(data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    prepareForm();
  }, []);

  const updateRegistrationRequest = async (data: RegistrationRequestDTO) => {
    window.scrollTo(0, 0);
    try {
      await api.put("/api/registrationRequests/" + currentId, data);
      navigate('/registrationRequests', {
            state: {
              msgSuccess: t('registrationRequest.update.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('registrationRequest.edit.headline')}</h1>
      <div>
        <Link to="/registrationRequests" className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-4 rounded px-5 py-2">{t('registrationRequest.edit.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(updateRegistrationRequest)} noValidate>
      <InputRow useFormResult={useFormResult} object="registrationRequest" field="id" disabled={true} />
      <InputRow useFormResult={useFormResult} object="registrationRequest" field="approved" type="checkbox" />
      <InputRow useFormResult={useFormResult} object="registrationRequest" field="reason" type="textarea" />
      <InputRow useFormResult={useFormResult} object="registrationRequest" field="protocol" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="registrationRequest" field="date" required={true} />
      <InputRow useFormResult={useFormResult} object="registrationRequest" field="user" required={true} type="select" options={userValues} />
      <input type="submit" value={t('registrationRequest.edit.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6" />
    </form>
  </>);
}
