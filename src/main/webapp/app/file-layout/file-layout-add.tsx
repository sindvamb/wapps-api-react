import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FileLayoutDTO } from 'app/file-layout/file-layout-model';
import axios from 'axios';
import InputRow from 'app/common/input-row/input-row';
import useDocumentTitle from 'app/common/use-document-title';
import * as yup from 'yup';


function getSchema() {
  setYupDefaults();
  return yup.object({
    layoutName: yup.string().emptyToNull().required(),
    layoutSize: yup.number().integer().emptyToNull().required()
  });
}

export default function FileLayoutAdd() {
  const { t } = useTranslation();
  useDocumentTitle(t('fileLayout.add.headline'));

  const navigate = useNavigate();

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const createFileLayout = async (data: FileLayoutDTO) => {
    window.scrollTo(0, 0);
    try {
      await axios.post('/api/fileLayouts', data);
      navigate('/fileLayouts', {
            state: {
              msgSuccess: t('fileLayout.create.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('fileLayout.add.headline')}</h1>
      <div>
        <Link to="/fileLayouts" className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-4 rounded px-5 py-2">{t('fileLayout.add.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(createFileLayout)} noValidate>
      <InputRow useFormResult={useFormResult} object="fileLayout" field="layoutName" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="fileLayout" field="layoutSize" required={true} type="number" />
      <input type="submit" value={t('fileLayout.add.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6" />
    </form>
  </>);
}
