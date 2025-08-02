import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { EfmigrationsHistoryDTO } from 'app/efmigrations-history/efmigrations-history-model';
import axios from 'axios';
import InputRow from 'app/common/input-row/input-row';
import useDocumentTitle from 'app/common/use-document-title';
import * as yup from 'yup';


function getSchema() {
  setYupDefaults();
  return yup.object({
    productVersion: yup.string().emptyToNull().max(32).required()
  });
}

export default function EfmigrationsHistoryEdit() {
  const { t } = useTranslation();
  useDocumentTitle(t('efmigrationsHistory.edit.headline'));

  const navigate = useNavigate();
  const params = useParams();
  const currentMigrationId = params.migrationId!;

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const prepareForm = async () => {
    try {
      const data = (await axios.get('/api/efmigrationsHistories/' + currentMigrationId)).data;
      useFormResult.reset(data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    prepareForm();
  }, []);

  const updateEfmigrationsHistory = async (data: EfmigrationsHistoryDTO) => {
    window.scrollTo(0, 0);
    try {
      await axios.put('/api/efmigrationsHistories/' + currentMigrationId, data);
      navigate('/efmigrationsHistories', {
            state: {
              msgSuccess: t('efmigrationsHistory.update.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('efmigrationsHistory.edit.headline')}</h1>
      <div>
        <Link to="/efmigrationsHistories" className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-4 rounded px-5 py-2">{t('efmigrationsHistory.edit.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(updateEfmigrationsHistory)} noValidate>
      <InputRow useFormResult={useFormResult} object="efmigrationsHistory" field="migrationId" disabled={true} />
      <InputRow useFormResult={useFormResult} object="efmigrationsHistory" field="productVersion" required={true} />
      <input type="submit" value={t('efmigrationsHistory.edit.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6" />
    </form>
  </>);
}
