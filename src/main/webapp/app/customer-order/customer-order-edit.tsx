import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CustomerOrderDTO } from 'app/customer-order/customer-order-model';
import InputRow from 'app/common/input-row/input-row';
import useDocumentTitle from 'app/common/use-document-title';
import * as yup from 'yup';
import api from 'app/services/api';


function getSchema() {
  setYupDefaults();
  return yup.object({
    isWapps: yup.bool(),
    isPresidency: yup.bool(),
    isClient: yup.bool(),
    isDirector: yup.bool(),
    isManager: yup.bool(),
    creatorId: yup.string().emptyToNull().uuid(),
    modifierId: yup.string().emptyToNull().uuid(),
    deleterId: yup.string().emptyToNull().uuid(),
    isDeleted: yup.bool(),
    createdAt: yup.string().emptyToNull().offsetDateTime(),
    updatedAt: yup.string().emptyToNull().offsetDateTime(),
    deletedAt: yup.string().emptyToNull().offsetDateTime(),
    customer: yup.string().emptyToNull().uuid().required(),
    order: yup.string().emptyToNull().uuid().required()
  });
}

export default function CustomerOrderEdit() {
  const { t } = useTranslation();
  useDocumentTitle(t('customerOrder.edit.headline'));

  const navigate = useNavigate();
  const [customerValues, setCustomerValues] = useState<Record<string,string>>({});
  const [orderValues, setOrderValues] = useState<Record<string,string>>({});
  const params = useParams();
  const currentId = params.id!;

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const prepareForm = async () => {
    try {
      const customerValuesResponse = await api.get("/api/customerOrders/customerValues");
      setCustomerValues(customerValuesResponse.data);
      const orderValuesResponse = await api.get("/api/customerOrders/orderValues");
      setOrderValues(orderValuesResponse.data);
      const data = (await api.get("/api/customerOrders/" + currentId)).data;
      useFormResult.reset(data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    prepareForm();
  }, []);

  const updateCustomerOrder = async (data: CustomerOrderDTO) => {
    window.scrollTo(0, 0);
    try {
      await api.put("/api/customerOrders/" + currentId, data);
      navigate('/customerOrders', {
            state: {
              msgSuccess: t('customerOrder.update.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('customerOrder.edit.headline')}</h1>
      <div>
        <Link to="/customerOrders" className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-4 rounded px-5 py-2">{t('customerOrder.edit.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(updateCustomerOrder)} noValidate>
      <input type="submit" value={t('customerOrder.edit.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6 mb-5" />
      <InputRow useFormResult={useFormResult} object="customerOrder" field="id" disabled={true} />
      <InputRow useFormResult={useFormResult} object="customerOrder" field="isWapps" type="checkbox" />
      <InputRow useFormResult={useFormResult} object="customerOrder" field="isPresidency" type="checkbox" />
      <InputRow useFormResult={useFormResult} object="customerOrder" field="isClient" type="checkbox" />
      <InputRow useFormResult={useFormResult} object="customerOrder" field="isDirector" type="checkbox" />
      <InputRow useFormResult={useFormResult} object="customerOrder" field="isManager" type="checkbox" />
      <InputRow useFormResult={useFormResult} object="customerOrder" field="creatorId" />
      <InputRow useFormResult={useFormResult} object="customerOrder" field="modifierId" />
      <InputRow useFormResult={useFormResult} object="customerOrder" field="deleterId" />
      <InputRow useFormResult={useFormResult} object="customerOrder" field="isDeleted" type="checkbox" />
      <InputRow useFormResult={useFormResult} object="customerOrder" field="createdAt" />
      <InputRow useFormResult={useFormResult} object="customerOrder" field="updatedAt" />
      <InputRow useFormResult={useFormResult} object="customerOrder" field="deletedAt" />
      <InputRow useFormResult={useFormResult} object="customerOrder" field="customer" required={true} type="select" options={customerValues} />
      <InputRow useFormResult={useFormResult} object="customerOrder" field="order" required={true} type="select" options={orderValues} />
      <input type="submit" value={t('customerOrder.edit.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6" />
    </form>
  </>);
}
