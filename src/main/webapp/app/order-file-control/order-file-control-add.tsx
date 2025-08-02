import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { OrderFileControlDTO } from 'app/order-file-control/order-file-control-model';
import axios from 'axios';
import InputRow from 'app/common/input-row/input-row';
import useDocumentTitle from 'app/common/use-document-title';
import * as yup from 'yup';


function getSchema() {
  setYupDefaults();
  return yup.object({
    fileControl: yup.string().emptyToNull().uuid().required(),
    order: yup.string().emptyToNull().uuid().required()
  });
}

export default function OrderFileControlAdd() {
  const { t } = useTranslation();
  useDocumentTitle(t('orderFileControl.add.headline'));

  const navigate = useNavigate();
  const [fileControlValues, setFileControlValues] = useState<Record<string,string>>({});
  const [orderValues, setOrderValues] = useState<Record<string,string>>({});

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const prepareRelations = async () => {
    try {
      const fileControlValuesResponse = await axios.get('/api/orderFileControls/fileControlValues');
      setFileControlValues(fileControlValuesResponse.data);
      const orderValuesResponse = await axios.get('/api/orderFileControls/orderValues');
      setOrderValues(orderValuesResponse.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    prepareRelations();
  }, []);

  const createOrderFileControl = async (data: OrderFileControlDTO) => {
    window.scrollTo(0, 0);
    try {
      await axios.post('/api/orderFileControls', data);
      navigate('/orderFileControls', {
            state: {
              msgSuccess: t('orderFileControl.create.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('orderFileControl.add.headline')}</h1>
      <div>
        <Link to="/orderFileControls" className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-4 rounded px-5 py-2">{t('orderFileControl.add.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(createOrderFileControl)} noValidate>
      <InputRow useFormResult={useFormResult} object="orderFileControl" field="fileControl" required={true} type="select" options={fileControlValues} />
      <InputRow useFormResult={useFormResult} object="orderFileControl" field="order" required={true} type="select" options={orderValues} />
      <input type="submit" value={t('orderFileControl.add.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6" />
    </form>
  </>);
}
