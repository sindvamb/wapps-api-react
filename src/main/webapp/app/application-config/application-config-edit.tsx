import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ApplicationConfigDTO } from 'app/application-config/application-config-model';
import axios from 'axios';
import InputRow from 'app/common/input-row/input-row';
import useDocumentTitle from 'app/common/use-document-title';
import * as yup from 'yup';


function getSchema() {
  setYupDefaults();
  return yup.object({
    value: yup.string().emptyToNull().required(),
    description: yup.string().emptyToNull().required(),
    creatorId: yup.string().emptyToNull().uuid(),
    modifierId: yup.string().emptyToNull().uuid(),
    deleterId: yup.string().emptyToNull().uuid(),
    isDeleted: yup.bool(),
    createdAt: yup.string().emptyToNull().offsetDateTime(),
    updatedAt: yup.string().emptyToNull().offsetDateTime(),
    deletedAt: yup.string().emptyToNull().offsetDateTime()
  });
}

export default function ApplicationConfigEdit() {
  const { t } = useTranslation();
  useDocumentTitle(t('applicationConfig.edit.headline'));

  const navigate = useNavigate();
  const params = useParams();
  const currentId = params.id!;

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const prepareForm = async () => {
    try {
      const data = (await axios.get('/api/applicationConfigs/' + currentId)).data;
      useFormResult.reset(data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    prepareForm();
  }, []);

  const updateApplicationConfig = async (data: ApplicationConfigDTO) => {
    window.scrollTo(0, 0);
    try {
      await axios.put('/api/applicationConfigs/' + currentId, data);
      navigate('/applicationConfigs', {
            state: {
              msgSuccess: t('applicationConfig.update.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('applicationConfig.edit.headline')}</h1>
      <div>
        <Link to="/applicationConfigs" className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-4 rounded px-5 py-2">{t('applicationConfig.edit.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(updateApplicationConfig)} noValidate>
      <InputRow useFormResult={useFormResult} object="applicationConfig" field="id" disabled={true} />
      <InputRow useFormResult={useFormResult} object="applicationConfig" field="value" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="applicationConfig" field="description" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="applicationConfig" field="creatorId" />
      <InputRow useFormResult={useFormResult} object="applicationConfig" field="modifierId" />
      <InputRow useFormResult={useFormResult} object="applicationConfig" field="deleterId" />
      <InputRow useFormResult={useFormResult} object="applicationConfig" field="isDeleted" type="checkbox" />
      <InputRow useFormResult={useFormResult} object="applicationConfig" field="createdAt" />
      <InputRow useFormResult={useFormResult} object="applicationConfig" field="updatedAt" />
      <InputRow useFormResult={useFormResult} object="applicationConfig" field="deletedAt" />
      <input type="submit" value={t('applicationConfig.edit.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6" />
    </form>
  </>);
}
