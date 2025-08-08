import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AccessControlDTO } from 'app/access-control/access-control-model';
import InputRow from 'app/common/input-row/input-row';
import useDocumentTitle from 'app/common/use-document-title';
import * as yup from 'yup';
import api from 'app/services/api';


function getSchema() {
  setYupDefaults();
  return yup.object({
    userId: yup.string().emptyToNull().uuid(),
    userName: yup.string().emptyToNull(),
    connectionTime: yup.string().emptyToNull().offsetDateTime(),
    lastBeatTime: yup.string().emptyToNull().offsetDateTime(),
    dur: yup.string().emptyToNull().max(255),
    ip: yup.string().emptyToNull(),
    city: yup.string().emptyToNull(),
    os: yup.string().emptyToNull(),
    device: yup.string().emptyToNull(),
    browser: yup.string().emptyToNull(),
    language: yup.string().emptyToNull(),
    engine: yup.string().emptyToNull(),
    requestUrl: yup.string().emptyToNull()
  });
}

export default function AccessControlAdd() {
  const { t } = useTranslation();
  useDocumentTitle(t('accessControl.add.headline'));

  const navigate = useNavigate();

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const createAccessControl = async (data: AccessControlDTO) => {
    window.scrollTo(0, 0);
    try {
      await api.post("/api/accessControls", data);
      navigate('/accessControls', {
            state: {
              msgSuccess: t('accessControl.create.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('accessControl.add.headline')}</h1>
      <div>
        <Link to="/accessControls" className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-4 rounded px-5 py-2">{t('accessControl.add.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(createAccessControl)} noValidate>
      <InputRow useFormResult={useFormResult} object="accessControl" field="userId" />
      <InputRow useFormResult={useFormResult} object="accessControl" field="userName" type="textarea" />
      <InputRow useFormResult={useFormResult} object="accessControl" field="connectionTime" />
      <InputRow useFormResult={useFormResult} object="accessControl" field="lastBeatTime" />
      <InputRow useFormResult={useFormResult} object="accessControl" field="dur" />
      <InputRow useFormResult={useFormResult} object="accessControl" field="ip" type="textarea" />
      <InputRow useFormResult={useFormResult} object="accessControl" field="city" type="textarea" />
      <InputRow useFormResult={useFormResult} object="accessControl" field="os" type="textarea" />
      <InputRow useFormResult={useFormResult} object="accessControl" field="device" type="textarea" />
      <InputRow useFormResult={useFormResult} object="accessControl" field="browser" type="textarea" />
      <InputRow useFormResult={useFormResult} object="accessControl" field="language" type="textarea" />
      <InputRow useFormResult={useFormResult} object="accessControl" field="engine" type="textarea" />
      <InputRow useFormResult={useFormResult} object="accessControl" field="requestUrl" type="textarea" />
      <input type="submit" value={t('accessControl.add.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6" />
    </form>
  </>);
}
