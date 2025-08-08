import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CustomerDTO } from 'app/customer/customer-model';
import InputRow from 'app/common/input-row/input-row';
import useDocumentTitle from 'app/common/use-document-title';
import * as yup from 'yup';
import api from 'app/services/api';


function getSchema() {
  setYupDefaults();
  return yup.object({
    creatorId: yup.string().emptyToNull().uuid(),
    modifierId: yup.string().emptyToNull().uuid(),
    deleterId: yup.string().emptyToNull().uuid(),
    isDeleted: yup.bool(),
    createdAt: yup.string().emptyToNull().offsetDateTime(),
    updatedAt: yup.string().emptyToNull().offsetDateTime(),
    deletedAt: yup.string().emptyToNull().offsetDateTime(),
    companyId: yup.string().emptyToNull().uuid(),
    customerType: yup.string().emptyToNull().uuid(),
    partnerUnit: yup.string().emptyToNull().uuid(),
    user: yup.string().emptyToNull().uuid().required()
  });
}

export default function CustomerAdd() {
  const { t } = useTranslation();
  useDocumentTitle(t('customer.add.headline'));

  const navigate = useNavigate();
  const [customerTypeValues, setCustomerTypeValues] = useState<Record<string,string>>({});
  const [partnerUnitValues, setPartnerUnitValues] = useState<Record<string,string>>({});
  const [userValues, setUserValues] = useState<Record<string,string>>({});

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const prepareRelations = async () => {
    try {
      const customerTypeValuesResponse = await api.get("/api/customers/customerTypeValues");
      setCustomerTypeValues(customerTypeValuesResponse.data);
      const partnerUnitValuesResponse = await api.get("/api/customers/partnerUnitValues");
      setPartnerUnitValues(partnerUnitValuesResponse.data);
      const userValuesResponse = await api.get("/api/customers/userValues");
      setUserValues(userValuesResponse.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    prepareRelations();
  }, []);

  const createCustomer = async (data: CustomerDTO) => {
    window.scrollTo(0, 0);
    try {
      await api.post("/api/customers", data);
      navigate('/customers', {
            state: {
              msgSuccess: t('customer.create.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('customer.add.headline')}</h1>
      <div>
        <Link to="/customers" className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-4 rounded px-5 py-2">{t('customer.add.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(createCustomer)} noValidate>
      <InputRow useFormResult={useFormResult} object="customer" field="creatorId" />
      <InputRow useFormResult={useFormResult} object="customer" field="modifierId" />
      <InputRow useFormResult={useFormResult} object="customer" field="deleterId" />
      <InputRow useFormResult={useFormResult} object="customer" field="isDeleted" type="checkbox" />
      <InputRow useFormResult={useFormResult} object="customer" field="createdAt" />
      <InputRow useFormResult={useFormResult} object="customer" field="updatedAt" />
      <InputRow useFormResult={useFormResult} object="customer" field="deletedAt" />
      <InputRow useFormResult={useFormResult} object="customer" field="companyId" />
      <InputRow useFormResult={useFormResult} object="customer" field="customerType" type="select" options={customerTypeValues} />
      <InputRow useFormResult={useFormResult} object="customer" field="partnerUnit" type="select" options={partnerUnitValues} />
      <InputRow useFormResult={useFormResult} object="customer" field="user" required={true} type="select" options={userValues} />
      <input type="submit" value={t('customer.add.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6" />
    </form>
  </>);
}
