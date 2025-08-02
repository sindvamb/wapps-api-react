import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { OrderDTO } from 'app/order/order-model';
import axios from 'axios';
import InputRow from 'app/common/input-row/input-row';
import useDocumentTitle from 'app/common/use-document-title';
import * as yup from 'yup';


function getSchema() {
  setYupDefaults();
  return yup.object({
    description: yup.string().emptyToNull(),
    sigla: yup.string().emptyToNull(),
    protocol: yup.string().emptyToNull(),
    dueDate: yup.string().emptyToNull().offsetDateTime(),
    enabled: yup.bool(),
    orderIndex: yup.number().integer().emptyToNull(),
    creatorId: yup.string().emptyToNull().uuid(),
    modifierId: yup.string().emptyToNull().uuid(),
    deleterId: yup.string().emptyToNull().uuid(),
    isDeleted: yup.bool(),
    createdAt: yup.string().emptyToNull().offsetDateTime(),
    updatedAt: yup.string().emptyToNull().offsetDateTime(),
    deletedAt: yup.string().emptyToNull().offsetDateTime(),
    orderStatus: yup.string().emptyToNull().uuid().required(),
    orderType: yup.string().emptyToNull().uuid().required(),
    partnerUnit: yup.string().emptyToNull().uuid().required(),
    productArea: yup.string().emptyToNull().uuid().required(),
    productCategory: yup.string().emptyToNull().uuid().required()
  });
}

export default function OrderAdd() {
  const { t } = useTranslation();
  useDocumentTitle(t('order.add.headline'));

  const navigate = useNavigate();
  const [orderStatusValues, setOrderStatusValues] = useState<Record<string,string>>({});
  const [orderTypeValues, setOrderTypeValues] = useState<Record<string,string>>({});
  const [partnerUnitValues, setPartnerUnitValues] = useState<Record<string,string>>({});
  const [productAreaValues, setProductAreaValues] = useState<Record<string,string>>({});
  const [productCategoryValues, setProductCategoryValues] = useState<Record<string,string>>({});

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const prepareRelations = async () => {
    try {
      const orderStatusValuesResponse = await axios.get('/api/orders/orderStatusValues');
      setOrderStatusValues(orderStatusValuesResponse.data);
      const orderTypeValuesResponse = await axios.get('/api/orders/orderTypeValues');
      setOrderTypeValues(orderTypeValuesResponse.data);
      const partnerUnitValuesResponse = await axios.get('/api/orders/partnerUnitValues');
      setPartnerUnitValues(partnerUnitValuesResponse.data);
      const productAreaValuesResponse = await axios.get('/api/orders/productAreaValues');
      setProductAreaValues(productAreaValuesResponse.data);
      const productCategoryValuesResponse = await axios.get('/api/orders/productCategoryValues');
      setProductCategoryValues(productCategoryValuesResponse.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    prepareRelations();
  }, []);

  const createOrder = async (data: OrderDTO) => {
    window.scrollTo(0, 0);
    try {
      await axios.post('/api/orders', data);
      navigate('/orders', {
            state: {
              msgSuccess: t('order.create.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('order.add.headline')}</h1>
      <div>
        <Link to="/orders" className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-4 rounded px-5 py-2">{t('order.add.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(createOrder)} noValidate>
      <InputRow useFormResult={useFormResult} object="order" field="description" type="textarea" />
      <InputRow useFormResult={useFormResult} object="order" field="sigla" type="textarea" />
      <InputRow useFormResult={useFormResult} object="order" field="protocol" type="textarea" />
      <InputRow useFormResult={useFormResult} object="order" field="dueDate" />
      <InputRow useFormResult={useFormResult} object="order" field="enabled" type="checkbox" />
      <InputRow useFormResult={useFormResult} object="order" field="orderIndex" type="number" />
      <InputRow useFormResult={useFormResult} object="order" field="creatorId" />
      <InputRow useFormResult={useFormResult} object="order" field="modifierId" />
      <InputRow useFormResult={useFormResult} object="order" field="deleterId" />
      <InputRow useFormResult={useFormResult} object="order" field="isDeleted" type="checkbox" />
      <InputRow useFormResult={useFormResult} object="order" field="createdAt" />
      <InputRow useFormResult={useFormResult} object="order" field="updatedAt" />
      <InputRow useFormResult={useFormResult} object="order" field="deletedAt" />
      <InputRow useFormResult={useFormResult} object="order" field="orderStatus" required={true} type="select" options={orderStatusValues} />
      <InputRow useFormResult={useFormResult} object="order" field="orderType" required={true} type="select" options={orderTypeValues} />
      <InputRow useFormResult={useFormResult} object="order" field="partnerUnit" required={true} type="select" options={partnerUnitValues} />
      <InputRow useFormResult={useFormResult} object="order" field="productArea" required={true} type="select" options={productAreaValues} />
      <InputRow useFormResult={useFormResult} object="order" field="productCategory" required={true} type="select" options={productCategoryValues} />
      <input type="submit" value={t('order.add.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6" />
    </form>
  </>);
}
