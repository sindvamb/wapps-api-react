import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ProductCategoryDTO } from 'app/product-category/product-category-model';
import axios from 'axios';
import InputRow from 'app/common/input-row/input-row';
import useDocumentTitle from 'app/common/use-document-title';
import * as yup from 'yup';


function getSchema() {
  setYupDefaults();
  return yup.object({
    code: yup.string().emptyToNull(),
    description: yup.string().emptyToNull()
  });
}

export default function ProductCategoryAdd() {
  const { t } = useTranslation();
  useDocumentTitle(t('productCategory.add.headline'));

  const navigate = useNavigate();

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const createProductCategory = async (data: ProductCategoryDTO) => {
    window.scrollTo(0, 0);
    try {
      await axios.post('/api/productCategories', data);
      navigate('/productCategories', {
            state: {
              msgSuccess: t('productCategory.create.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('productCategory.add.headline')}</h1>
      <div>
        <Link to="/productCategories" className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-4 rounded px-5 py-2">{t('productCategory.add.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(createProductCategory)} noValidate>
      <InputRow useFormResult={useFormResult} object="productCategory" field="code" type="textarea" />
      <InputRow useFormResult={useFormResult} object="productCategory" field="description" type="textarea" />
      <input type="submit" value={t('productCategory.add.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6" />
    </form>
  </>);
}
