import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { OrderTypeDTO } from 'app/order-type/order-type-model';
import InputRow from 'app/common/input-row/input-row';
import useDocumentTitle from 'app/common/use-document-title';
import * as yup from 'yup';
import api from 'app/services/api';


function getSchema() {
  setYupDefaults();
  return yup.object({
    code: yup.string().emptyToNull(),
    description: yup.string().emptyToNull()
  });
}

export default function OrderTypeEdit() {
  const { t } = useTranslation();
  useDocumentTitle(t('orderType.edit.headline'));

  const navigate = useNavigate();
  const params = useParams();
  const currentId = params.id!;

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const prepareForm = async () => {
    try {
      const data = (await api.get("/api/orderTypes/" + currentId)).data;
      useFormResult.reset(data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    prepareForm();
  }, []);

  const updateOrderType = async (data: OrderTypeDTO) => {
    window.scrollTo(0, 0);
    try {
      await api.put("/api/orderTypes/" + currentId, data);
      navigate('/orderTypes', {
            state: {
              msgSuccess: t('orderType.update.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('orderType.edit.headline')}</h1>
      <div>
        <Link to="/orderTypes" className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-4 rounded px-5 py-2">{t('orderType.edit.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(updateOrderType)} noValidate>
      <InputRow useFormResult={useFormResult} object="orderType" field="id" disabled={true} />
      <InputRow useFormResult={useFormResult} object="orderType" field="code" type="textarea" />
      <InputRow useFormResult={useFormResult} object="orderType" field="description" type="textarea" />
      <input type="submit" value={t('orderType.edit.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6" />
    </form>
  </>);
}
