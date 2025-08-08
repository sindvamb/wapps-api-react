import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PasswordHistoryDTO } from 'app/password-history/password-history-model';
import InputRow from 'app/common/input-row/input-row';
import useDocumentTitle from 'app/common/use-document-title';
import * as yup from 'yup';
import api from 'app/services/api';


function getSchema() {
  setYupDefaults();
  return yup.object({
    oldPassword: yup.string().emptyToNull(),
    newPassword: yup.string().emptyToNull().required(),
    securityCode: yup.string().emptyToNull().required(),
    hasChanged: yup.bool(),
    creatorId: yup.string().emptyToNull().uuid(),
    modifierId: yup.string().emptyToNull().uuid(),
    deleterId: yup.string().emptyToNull().uuid(),
    isDeleted: yup.bool(),
    createdAt: yup.string().emptyToNull().offsetDateTime(),
    updatedAt: yup.string().emptyToNull().offsetDateTime(),
    deletedAt: yup.string().emptyToNull().offsetDateTime(),
    user: yup.string().emptyToNull().uuid().required()
  });
}

export default function PasswordHistoryAdd() {
  const { t } = useTranslation();
  useDocumentTitle(t('passwordHistory.add.headline'));

  const navigate = useNavigate();
  const [userValues, setUserValues] = useState<Record<string,string>>({});

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const prepareRelations = async () => {
    try {
      const userValuesResponse = await api.get("/api/passwordHistories/userValues");
      setUserValues(userValuesResponse.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    prepareRelations();
  }, []);

  const createPasswordHistory = async (data: PasswordHistoryDTO) => {
    window.scrollTo(0, 0);
    try {
      await api.post("/api/passwordHistories", data);
      navigate('/passwordHistories', {
            state: {
              msgSuccess: t('passwordHistory.create.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('passwordHistory.add.headline')}</h1>
      <div>
        <Link to="/passwordHistories" className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-4 rounded px-5 py-2">{t('passwordHistory.add.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(createPasswordHistory)} noValidate>
      <InputRow useFormResult={useFormResult} object="passwordHistory" field="oldPassword" type="textarea" />
      <InputRow useFormResult={useFormResult} object="passwordHistory" field="newPassword" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="passwordHistory" field="securityCode" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="passwordHistory" field="hasChanged" type="checkbox" />
      <InputRow useFormResult={useFormResult} object="passwordHistory" field="creatorId" />
      <InputRow useFormResult={useFormResult} object="passwordHistory" field="modifierId" />
      <InputRow useFormResult={useFormResult} object="passwordHistory" field="deleterId" />
      <InputRow useFormResult={useFormResult} object="passwordHistory" field="isDeleted" type="checkbox" />
      <InputRow useFormResult={useFormResult} object="passwordHistory" field="createdAt" />
      <InputRow useFormResult={useFormResult} object="passwordHistory" field="updatedAt" />
      <InputRow useFormResult={useFormResult} object="passwordHistory" field="deletedAt" />
      <InputRow useFormResult={useFormResult} object="passwordHistory" field="user" required={true} type="select" options={userValues} />
      <input type="submit" value={t('passwordHistory.add.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6" />
    </form>
  </>);
}
