import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ContactDTO } from 'app/contact/contact-model';
import InputRow from 'app/common/input-row/input-row';
import useDocumentTitle from 'app/common/use-document-title';
import * as yup from 'yup';
import api from 'app/services/api';


function getSchema() {
  setYupDefaults();
  return yup.object({
    name: yup.string().emptyToNull().required(),
    cpfCnpj: yup.string().emptyToNull(),
    email: yup.string().emptyToNull(),
    phone: yup.string().emptyToNull(),
    cellPhone: yup.string().emptyToNull(),
    fax: yup.string().emptyToNull(),
    mainActivityCode: yup.string().emptyToNull(),
    economicActivity: yup.string().emptyToNull(),
    address: yup.string().emptyToNull().uuid()
  });
}

export default function ContactAdd() {
  const { t } = useTranslation();
  useDocumentTitle(t('contact.add.headline'));

  const navigate = useNavigate();
  const [addressValues, setAddressValues] = useState<Record<string,string>>({});

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const prepareRelations = async () => {
    try {
      const addressValuesResponse = await api.get("/api/contacts/addressValues");
      setAddressValues(addressValuesResponse.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    prepareRelations();
  }, []);

  const createContact = async (data: ContactDTO) => {
    window.scrollTo(0, 0);
    try {
      await api.post("/api/contacts", data);
      navigate('/contacts', {
            state: {
              msgSuccess: t('contact.create.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('contact.add.headline')}</h1>
      <div>
        <Link to="/contacts" className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-4 rounded px-5 py-2">{t('contact.add.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(createContact)} noValidate>
      <InputRow useFormResult={useFormResult} object="contact" field="name" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="contact" field="cpfCnpj" type="textarea" />
      <InputRow useFormResult={useFormResult} object="contact" field="email" type="textarea" />
      <InputRow useFormResult={useFormResult} object="contact" field="phone" type="textarea" />
      <InputRow useFormResult={useFormResult} object="contact" field="cellPhone" type="textarea" />
      <InputRow useFormResult={useFormResult} object="contact" field="fax" type="textarea" />
      <InputRow useFormResult={useFormResult} object="contact" field="mainActivityCode" type="textarea" />
      <InputRow useFormResult={useFormResult} object="contact" field="economicActivity" type="textarea" />
      <InputRow useFormResult={useFormResult} object="contact" field="address" type="select" options={addressValues} />
      <input type="submit" value={t('contact.add.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6" />
    </form>
  </>);
}
