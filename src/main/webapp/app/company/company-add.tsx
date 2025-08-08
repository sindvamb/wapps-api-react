import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CompanyDTO } from 'app/company/company-model';
import InputRow from 'app/common/input-row/input-row';
import useDocumentTitle from 'app/common/use-document-title';
import * as yup from 'yup';
import api from 'app/services/api';


function getSchema() {
  setYupDefaults();
  return yup.object({
    foundationDate: yup.string().emptyToNull().offsetDateTime(),
    cpfCnpj: yup.string().emptyToNull().required(),
    size: yup.number().integer().emptyToNull().required(),
    corporateName: yup.string().emptyToNull().required(),
    stateRegistration: yup.string().emptyToNull(),
    municipalRegistration: yup.string().emptyToNull(),
    mainCnaeCode: yup.string().emptyToNull(),
    mainCnaeDescription: yup.string().emptyToNull(),
    legalNatureCode: yup.string().emptyToNull(),
    legalNatureDescription: yup.string().emptyToNull(),
    status: yup.number().integer().emptyToNull().required(),
    hasGovBrRegistration: yup.bool(),
    hasDigitalCertificate: yup.bool(),
    tradeName: yup.string().emptyToNull(),
    hasLogo: yup.bool(),
    hasVisualIdentity: yup.bool(),
    inpiRegistration: yup.string().emptyToNull(),
    businessLaw: yup.string().emptyToNull(),
    employeesCount: yup.number().integer().emptyToNull(),
    youngApprenticesCount: yup.number().integer().emptyToNull(),
    usesESocial: yup.bool(),
    sebraeTraining: yup.string().emptyToNull(),
    senacTraining: yup.string().emptyToNull(),
    anvisaTraining: yup.string().emptyToNull(),
    civilDefenseTraining: yup.string().emptyToNull(),
    website: yup.string().emptyToNull(),
    email: yup.string().emptyToNull(),
    creatorId: yup.string().emptyToNull().uuid(),
    modifierId: yup.string().emptyToNull().uuid(),
    deleterId: yup.string().emptyToNull().uuid(),
    isDeleted: yup.bool(),
    createdAt: yup.string().emptyToNull().offsetDateTime(),
    updatedAt: yup.string().emptyToNull().offsetDateTime(),
    deletedAt: yup.string().emptyToNull().offsetDateTime(),
    paymentDate: yup.string().emptyToNull().offsetDateTime(),
    address: yup.string().emptyToNull().uuid(),
    customer: yup.string().emptyToNull().uuid()
  });
}

export default function CompanyAdd() {
  const { t } = useTranslation();
  useDocumentTitle(t('company.add.headline'));

  const navigate = useNavigate();
  const [addressValues, setAddressValues] = useState<Record<string,string>>({});
  const [customerValues, setCustomerValues] = useState<Record<string,string>>({});

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const prepareRelations = async () => {
    try {
      const addressValuesResponse = await api.get("/api/companies/addressValues");
      setAddressValues(addressValuesResponse.data);
      const customerValuesResponse = await api.get("/api/companies/customerValues");
      setCustomerValues(customerValuesResponse.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    prepareRelations();
  }, []);

  const createCompany = async (data: CompanyDTO) => {
    window.scrollTo(0, 0);
    try {
      await api.post("/api/companies", data);
      navigate('/companies', {
            state: {
              msgSuccess: t('company.create.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('company.add.headline')}</h1>
      <div>
        <Link to="/companies" className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-4 rounded px-5 py-2">{t('company.add.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(createCompany)} noValidate>
      <InputRow useFormResult={useFormResult} object="company" field="foundationDate" />
      <InputRow useFormResult={useFormResult} object="company" field="cpfCnpj" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="company" field="size" required={true} type="number" />
      <InputRow useFormResult={useFormResult} object="company" field="corporateName" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="company" field="stateRegistration" type="textarea" />
      <InputRow useFormResult={useFormResult} object="company" field="municipalRegistration" type="textarea" />
      <InputRow useFormResult={useFormResult} object="company" field="mainCnaeCode" type="textarea" />
      <InputRow useFormResult={useFormResult} object="company" field="mainCnaeDescription" type="textarea" />
      <InputRow useFormResult={useFormResult} object="company" field="legalNatureCode" type="textarea" />
      <InputRow useFormResult={useFormResult} object="company" field="legalNatureDescription" type="textarea" />
      <InputRow useFormResult={useFormResult} object="company" field="status" required={true} type="number" />
      <InputRow useFormResult={useFormResult} object="company" field="hasGovBrRegistration" type="checkbox" />
      <InputRow useFormResult={useFormResult} object="company" field="hasDigitalCertificate" type="checkbox" />
      <InputRow useFormResult={useFormResult} object="company" field="tradeName" type="textarea" />
      <InputRow useFormResult={useFormResult} object="company" field="hasLogo" type="checkbox" />
      <InputRow useFormResult={useFormResult} object="company" field="hasVisualIdentity" type="checkbox" />
      <InputRow useFormResult={useFormResult} object="company" field="inpiRegistration" type="textarea" />
      <InputRow useFormResult={useFormResult} object="company" field="businessLaw" type="textarea" />
      <InputRow useFormResult={useFormResult} object="company" field="employeesCount" type="number" />
      <InputRow useFormResult={useFormResult} object="company" field="youngApprenticesCount" type="number" />
      <InputRow useFormResult={useFormResult} object="company" field="usesESocial" type="checkbox" />
      <InputRow useFormResult={useFormResult} object="company" field="sebraeTraining" type="textarea" />
      <InputRow useFormResult={useFormResult} object="company" field="senacTraining" type="textarea" />
      <InputRow useFormResult={useFormResult} object="company" field="anvisaTraining" type="textarea" />
      <InputRow useFormResult={useFormResult} object="company" field="civilDefenseTraining" type="textarea" />
      <InputRow useFormResult={useFormResult} object="company" field="website" type="textarea" />
      <InputRow useFormResult={useFormResult} object="company" field="email" type="textarea" />
      <InputRow useFormResult={useFormResult} object="company" field="creatorId" />
      <InputRow useFormResult={useFormResult} object="company" field="modifierId" />
      <InputRow useFormResult={useFormResult} object="company" field="deleterId" />
      <InputRow useFormResult={useFormResult} object="company" field="isDeleted" type="checkbox" />
      <InputRow useFormResult={useFormResult} object="company" field="createdAt" />
      <InputRow useFormResult={useFormResult} object="company" field="updatedAt" />
      <InputRow useFormResult={useFormResult} object="company" field="deletedAt" />
      <InputRow useFormResult={useFormResult} object="company" field="paymentDate" />
      <InputRow useFormResult={useFormResult} object="company" field="address" type="select" options={addressValues} />
      <InputRow useFormResult={useFormResult} object="company" field="customer" type="select" options={customerValues} />
      <input type="submit" value={t('company.add.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6" />
    </form>
  </>);
}
