import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FileLayoutDTO } from 'app/file-layout/file-layout-model';
import InputRow from 'app/common/input-row/input-row';
import useDocumentTitle from 'app/common/use-document-title';
import * as yup from 'yup';
import api from 'app/services/api';


function getSchema() {
  setYupDefaults();
  return yup.object({
    layoutName: yup.string().emptyToNull().required(),
    layoutSize: yup.number().integer().emptyToNull().required()
  });
}

export default function FileLayoutEdit() {
  const { t } = useTranslation();
  useDocumentTitle(t('fileLayout.edit.headline'));

  const navigate = useNavigate();
  const params = useParams();
  const currentId = params.id!;

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const prepareForm = async () => {
    try {
      const data = (await api.get("/api/fileLayouts/" + currentId)).data;
      useFormResult.reset(data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    prepareForm();
  }, []);

  const updateFileLayout = async (data: FileLayoutDTO) => {
    window.scrollTo(0, 0);
    try {
      await api.put("/api/fileLayouts/" + currentId, data);
      navigate('/fileLayouts', {
            state: {
              msgSuccess: t('fileLayout.update.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('fileLayout.edit.headline')}</h1>
      <div>
        <Link to="/fileLayouts" className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-4 rounded px-5 py-2">{t('fileLayout.edit.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(updateFileLayout)} noValidate>
      <InputRow useFormResult={useFormResult} object="fileLayout" field="id" disabled={true} />
      <InputRow useFormResult={useFormResult} object="fileLayout" field="layoutName" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="fileLayout" field="layoutSize" required={true} type="number" />
      <input type="submit" value={t('fileLayout.edit.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6" />
    </form>
  </>);
}
