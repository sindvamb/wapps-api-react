import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegistrationRequestDTO } from 'app/registration-request/registration-request-model';
import axios from 'axios';
import InputRow from 'app/common/input-row/input-row';
import useDocumentTitle from 'app/common/use-document-title';
import * as yup from 'yup';


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

export default function RegistrationRequestAdd() {
  const { t } = useTranslation();
  useDocumentTitle(t('registrationRequest.add.headline'));

  const navigate = useNavigate();
  const [userValues, setUserValues] = useState<Record<string,string>>({});

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const prepareRelations = async () => {
    try {
      const userValuesResponse = await axios.get('/api/registrationRequests/userValues');
      setUserValues(userValuesResponse.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    prepareRelations();
  }, []);

  const createRegistrationRequest = async (data: RegistrationRequestDTO) => {
    window.scrollTo(0, 0);
    try {
      await axios.post('/api/registrationRequests', data);
      navigate('/registrationRequests', {
            state: {
              msgSuccess: t('registrationRequest.create.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('registrationRequest.add.headline')}</h1>
      <div>
        <Link to="/registrationRequests" className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-4 rounded px-5 py-2">{t('registrationRequest.add.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(createRegistrationRequest)} noValidate>
      <InputRow useFormResult={useFormResult} object="registrationRequest" field="approved" type="checkbox" />
      <InputRow useFormResult={useFormResult} object="registrationRequest" field="reason" type="textarea" />
      <InputRow useFormResult={useFormResult} object="registrationRequest" field="protocol" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="registrationRequest" field="date" required={true} />
      <InputRow useFormResult={useFormResult} object="registrationRequest" field="user" required={true} type="select" options={userValues} />
      <input type="submit" value={t('registrationRequest.add.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6" />
    </form>
  </>);
}
