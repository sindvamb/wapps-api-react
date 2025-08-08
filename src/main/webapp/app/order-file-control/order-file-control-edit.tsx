import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { OrderFileControlDTO } from 'app/order-file-control/order-file-control-model';
import InputRow from 'app/common/input-row/input-row';
import useDocumentTitle from 'app/common/use-document-title';
import * as yup from 'yup';
import api from 'app/services/api';


function getSchema() {
  setYupDefaults();
  return yup.object({
    fileControl: yup.string().emptyToNull().uuid().required(),
    order: yup.string().emptyToNull().uuid().required()
  });
}

export default function OrderFileControlEdit() {
  const { t } = useTranslation();
  useDocumentTitle(t('orderFileControl.edit.headline'));

  const navigate = useNavigate();
  const [fileControlValues, setFileControlValues] = useState<Record<string,string>>({});
  const [orderValues, setOrderValues] = useState<Record<string,string>>({});
  const params = useParams();
  const currentId = params.id!;

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const prepareForm = async () => {
    try {
      const fileControlValuesResponse = await api.get("/api/orderFileControls/fileControlValues");
      setFileControlValues(fileControlValuesResponse.data);
      const orderValuesResponse = await api.get("/api/orderFileControls/orderValues");
      setOrderValues(orderValuesResponse.data);
      const data = (await api.get("/api/orderFileControls/" + currentId)).data;
      useFormResult.reset(data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    prepareForm();
  }, []);

  const updateOrderFileControl = async (data: OrderFileControlDTO) => {
    window.scrollTo(0, 0);
    try {
      await api.put("/api/orderFileControls/" + currentId, data);
      navigate('/orderFileControls', {
            state: {
              msgSuccess: t('orderFileControl.update.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('orderFileControl.edit.headline')}</h1>
      <div>
        <Link to="/orderFileControls" className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-4 rounded px-5 py-2">{t('orderFileControl.edit.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(updateOrderFileControl)} noValidate>
      <InputRow useFormResult={useFormResult} object="orderFileControl" field="id" disabled={true} />
      <InputRow useFormResult={useFormResult} object="orderFileControl" field="fileControl" required={true} type="select" options={fileControlValues} />
      <InputRow useFormResult={useFormResult} object="orderFileControl" field="order" required={true} type="select" options={orderValues} />
      <input type="submit" value={t('orderFileControl.edit.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6" />
    </form>
  </>);
}
