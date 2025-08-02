import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ProductAreaDTO } from 'app/product-area/product-area-model';
import axios from 'axios';
import InputRow from 'app/common/input-row/input-row';
import useDocumentTitle from 'app/common/use-document-title';
import * as yup from 'yup';


function getSchema() {
  setYupDefaults();
  return yup.object({
    code: yup.string().emptyToNull().required(),
    description: yup.string().emptyToNull().required()
  });
}

export default function ProductAreaEdit() {
  const { t } = useTranslation();
  useDocumentTitle(t('productArea.edit.headline'));

  const navigate = useNavigate();
  const params = useParams();
  const currentId = params.id!;

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const prepareForm = async () => {
    try {
      const data = (await axios.get('/api/productAreas/' + currentId)).data;
      useFormResult.reset(data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    prepareForm();
  }, []);

  const updateProductArea = async (data: ProductAreaDTO) => {
    window.scrollTo(0, 0);
    try {
      await axios.put('/api/productAreas/' + currentId, data);
      navigate('/productAreas', {
            state: {
              msgSuccess: t('productArea.update.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('productArea.edit.headline')}</h1>
      <div>
        <Link to="/productAreas" className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-4 rounded px-5 py-2">{t('productArea.edit.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(updateProductArea)} noValidate>
      <InputRow useFormResult={useFormResult} object="productArea" field="id" disabled={true} />
      <InputRow useFormResult={useFormResult} object="productArea" field="code" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="productArea" field="description" required={true} type="textarea" />
      <input type="submit" value={t('productArea.edit.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6" />
    </form>
  </>);
}
