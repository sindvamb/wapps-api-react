import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { EmailHistoryDTO } from 'app/email-history/email-history-model';
import axios from 'axios';
import InputRow from 'app/common/input-row/input-row';
import useDocumentTitle from 'app/common/use-document-title';
import * as yup from 'yup';


function getSchema() {
  setYupDefaults();
  return yup.object({
    userId: yup.string().emptyToNull().uuid(),
    isSuccess: yup.bool(),
    reason: yup.string().emptyToNull().required(),
    email: yup.string().emptyToNull().required(),
    templateKey: yup.string().emptyToNull().required(),
    data: yup.string().emptyToNull().required(),
    ipAddress: yup.string().emptyToNull().required(),
    messageId: yup.string().emptyToNull().required(),
    date: yup.string().emptyToNull().offsetDateTime().required()
  });
}

export default function EmailHistoryAdd() {
  const { t } = useTranslation();
  useDocumentTitle(t('emailHistory.add.headline'));

  const navigate = useNavigate();

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const createEmailHistory = async (data: EmailHistoryDTO) => {
    window.scrollTo(0, 0);
    try {
      await axios.post('/api/emailHistories', data);
      navigate('/emailHistories', {
            state: {
              msgSuccess: t('emailHistory.create.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('emailHistory.add.headline')}</h1>
      <div>
        <Link to="/emailHistories" className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-4 rounded px-5 py-2">{t('emailHistory.add.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(createEmailHistory)} noValidate>
      <InputRow useFormResult={useFormResult} object="emailHistory" field="userId" />
      <InputRow useFormResult={useFormResult} object="emailHistory" field="isSuccess" type="checkbox" />
      <InputRow useFormResult={useFormResult} object="emailHistory" field="reason" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="emailHistory" field="email" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="emailHistory" field="templateKey" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="emailHistory" field="data" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="emailHistory" field="ipAddress" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="emailHistory" field="messageId" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="emailHistory" field="date" required={true} />
      <input type="submit" value={t('emailHistory.add.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6" />
    </form>
  </>);
}
