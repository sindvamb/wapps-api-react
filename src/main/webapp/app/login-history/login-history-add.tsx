import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginHistoryDTO } from 'app/login-history/login-history-model';
import InputRow from 'app/common/input-row/input-row';
import useDocumentTitle from 'app/common/use-document-title';
import * as yup from 'yup';
import api from 'app/services/api';


function getSchema() {
  setYupDefaults();
  return yup.object({
    isSuccess: yup.bool(),
    reason: yup.string().emptyToNull().required(),
    ipAddress: yup.string().emptyToNull().required(),
    date: yup.string().emptyToNull().offsetDateTime().required(),
    user: yup.string().emptyToNull().uuid().required()
  });
}

export default function LoginHistoryAdd() {
  const { t } = useTranslation();
  useDocumentTitle(t('loginHistory.add.headline'));

  const navigate = useNavigate();
  const [userValues, setUserValues] = useState<Record<string,string>>({});

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const prepareRelations = async () => {
    try {
      const userValuesResponse = await api.get("/api/loginHistories/userValues");
      setUserValues(userValuesResponse.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    prepareRelations();
  }, []);

  const createLoginHistory = async (data: LoginHistoryDTO) => {
    window.scrollTo(0, 0);
    try {
      await api.post("/api/loginHistories", data);
      navigate('/loginHistories', {
            state: {
              msgSuccess: t('loginHistory.create.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('loginHistory.add.headline')}</h1>
      <div>
        <Link to="/loginHistories" className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-4 rounded px-5 py-2">{t('loginHistory.add.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(createLoginHistory)} noValidate>
      <InputRow useFormResult={useFormResult} object="loginHistory" field="isSuccess" type="checkbox" />
      <InputRow useFormResult={useFormResult} object="loginHistory" field="reason" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="loginHistory" field="ipAddress" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="loginHistory" field="date" required={true} />
      <InputRow useFormResult={useFormResult} object="loginHistory" field="user" required={true} type="select" options={userValues} />
      <input type="submit" value={t('loginHistory.add.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6" />
    </form>
  </>);
}
