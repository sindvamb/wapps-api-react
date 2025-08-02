import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CompanyContactDTO } from 'app/company-contact/company-contact-model';
import axios from 'axios';
import InputRow from 'app/common/input-row/input-row';
import useDocumentTitle from 'app/common/use-document-title';
import * as yup from 'yup';


function getSchema() {
  setYupDefaults();
  return yup.object({
    area: yup.string().emptyToNull(),
    name: yup.string().emptyToNull().required(),
    role: yup.string().emptyToNull().required(),
    corporateEmail: yup.string().emptyToNull(),
    phone: yup.string().emptyToNull(),
    corporateCellPhone: yup.string().emptyToNull(),
    personalCellPhone: yup.string().emptyToNull(),
    company: yup.string().emptyToNull().uuid().required()
  });
}

export default function CompanyContactEdit() {
  const { t } = useTranslation();
  useDocumentTitle(t('companyContact.edit.headline'));

  const navigate = useNavigate();
  const [companyValues, setCompanyValues] = useState<Record<string,string>>({});
  const params = useParams();
  const currentId = params.id!;

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const prepareForm = async () => {
    try {
      const companyValuesResponse = await axios.get('/api/companyContacts/companyValues');
      setCompanyValues(companyValuesResponse.data);
      const data = (await axios.get('/api/companyContacts/' + currentId)).data;
      useFormResult.reset(data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    prepareForm();
  }, []);

  const updateCompanyContact = async (data: CompanyContactDTO) => {
    window.scrollTo(0, 0);
    try {
      await axios.put('/api/companyContacts/' + currentId, data);
      navigate('/companyContacts', {
            state: {
              msgSuccess: t('companyContact.update.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('companyContact.edit.headline')}</h1>
      <div>
        <Link to="/companyContacts" className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-4 rounded px-5 py-2">{t('companyContact.edit.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(updateCompanyContact)} noValidate>
      <InputRow useFormResult={useFormResult} object="companyContact" field="id" disabled={true} />
      <InputRow useFormResult={useFormResult} object="companyContact" field="area" type="textarea" />
      <InputRow useFormResult={useFormResult} object="companyContact" field="name" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="companyContact" field="role" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="companyContact" field="corporateEmail" type="textarea" />
      <InputRow useFormResult={useFormResult} object="companyContact" field="phone" type="textarea" />
      <InputRow useFormResult={useFormResult} object="companyContact" field="corporateCellPhone" type="textarea" />
      <InputRow useFormResult={useFormResult} object="companyContact" field="personalCellPhone" type="textarea" />
      <InputRow useFormResult={useFormResult} object="companyContact" field="company" required={true} type="select" options={companyValues} />
      <input type="submit" value={t('companyContact.edit.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6" />
    </form>
  </>);
}
