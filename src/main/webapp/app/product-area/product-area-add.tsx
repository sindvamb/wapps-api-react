import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ProductAreaDTO } from 'app/product-area/product-area-model';
import InputRow from 'app/common/input-row/input-row';
import useDocumentTitle from 'app/common/use-document-title';
import * as yup from 'yup';
import api from 'app/services/api';


function getSchema() {
  setYupDefaults();
  return yup.object({
    code: yup.string().emptyToNull().required(),
    description: yup.string().emptyToNull().required()
  });
}

export default function ProductAreaAdd() {
  const { t } = useTranslation();
  useDocumentTitle(t('productArea.add.headline'));

  const navigate = useNavigate();

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const createProductArea = async (data: ProductAreaDTO) => {
    window.scrollTo(0, 0);
    try {
      await api.post("/api/productAreas", data);
      navigate('/productAreas', {
            state: {
              msgSuccess: t('productArea.create.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('productArea.add.headline')}</h1>
      <div>
        <Link to="/productAreas" className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-4 rounded px-5 py-2">{t('productArea.add.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(createProductArea)} noValidate>
      <InputRow useFormResult={useFormResult} object="productArea" field="code" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="productArea" field="description" required={true} type="textarea" />
      <input type="submit" value={t('productArea.add.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6" />
    </form>
  </>);
}
