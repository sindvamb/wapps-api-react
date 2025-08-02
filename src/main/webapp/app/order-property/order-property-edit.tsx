import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { OrderPropertyDTO } from 'app/order-property/order-property-model';
import axios from 'axios';
import InputRow from 'app/common/input-row/input-row';
import useDocumentTitle from 'app/common/use-document-title';
import * as yup from 'yup';


function getSchema() {
  setYupDefaults();
  return yup.object({
    value: yup.string().emptyToNull(),
    order: yup.string().emptyToNull().uuid().required()
  });
}

export default function OrderPropertyEdit() {
  const { t } = useTranslation();
  useDocumentTitle(t('orderProperty.edit.headline'));

  const navigate = useNavigate();
  const [orderValues, setOrderValues] = useState<Record<string,string>>({});
  const params = useParams();
  const currentId = params.id!;

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const prepareForm = async () => {
    try {
      const orderValuesResponse = await axios.get('/api/orderProperties/orderValues');
      setOrderValues(orderValuesResponse.data);
      const data = (await axios.get('/api/orderProperties/' + currentId)).data;
      useFormResult.reset(data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    prepareForm();
  }, []);

  const updateOrderProperty = async (data: OrderPropertyDTO) => {
    window.scrollTo(0, 0);
    try {
      await axios.put('/api/orderProperties/' + currentId, data);
      navigate('/orderProperties', {
            state: {
              msgSuccess: t('orderProperty.update.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('orderProperty.edit.headline')}</h1>
      <div>
        <Link to="/orderProperties" className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-4 rounded px-5 py-2">{t('orderProperty.edit.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(updateOrderProperty)} noValidate>
      <InputRow useFormResult={useFormResult} object="orderProperty" field="id" disabled={true} />
      <InputRow useFormResult={useFormResult} object="orderProperty" field="value" type="textarea" />
      <InputRow useFormResult={useFormResult} object="orderProperty" field="order" required={true} type="select" options={orderValues} />
      <input type="submit" value={t('orderProperty.edit.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6" />
    </form>
  </>);
}
