import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { OrderTrackingDTO } from 'app/order-tracking/order-tracking-model';
import InputRow from 'app/common/input-row/input-row';
import useDocumentTitle from 'app/common/use-document-title';
import * as yup from 'yup';
import api from 'app/services/api';


function getSchema() {
  setYupDefaults();
  return yup.object({
    trackDate: yup.string().emptyToNull().offsetDateTime().required(),
    history: yup.string().emptyToNull(),
    order: yup.string().emptyToNull().uuid().required()
  });
}

export default function OrderTrackingEdit() {
  const { t } = useTranslation();
  useDocumentTitle(t('orderTracking.edit.headline'));

  const navigate = useNavigate();
  const [orderValues, setOrderValues] = useState<Record<string,string>>({});
  const params = useParams();
  const currentId = params.id!;

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const prepareForm = async () => {
    try {
      const orderValuesResponse = await api.get("/api/orderTrackings/orderValues");
      setOrderValues(orderValuesResponse.data);
      const data = (await api.get("/api/orderTrackings/" + currentId)).data;
      useFormResult.reset(data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    prepareForm();
  }, []);

  const updateOrderTracking = async (data: OrderTrackingDTO) => {
    window.scrollTo(0, 0);
    try {
      await api.put("/api/orderTrackings/" + currentId, data);
      navigate('/orderTrackings', {
            state: {
              msgSuccess: t('orderTracking.update.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('orderTracking.edit.headline')}</h1>
      <div>
        <Link to="/orderTrackings" className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-4 rounded px-5 py-2">{t('orderTracking.edit.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(updateOrderTracking)} noValidate>
      <InputRow useFormResult={useFormResult} object="orderTracking" field="id" disabled={true} />
      <InputRow useFormResult={useFormResult} object="orderTracking" field="trackDate" required={true} />
      <InputRow useFormResult={useFormResult} object="orderTracking" field="history" type="textarea" />
      <InputRow useFormResult={useFormResult} object="orderTracking" field="order" required={true} type="select" options={orderValues} />
      <input type="submit" value={t('orderTracking.edit.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6" />
    </form>
  </>);
}
