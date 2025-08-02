import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ContactDTO } from 'app/contact/contact-model';
import axios from 'axios';
import InputRow from 'app/common/input-row/input-row';
import useDocumentTitle from 'app/common/use-document-title';
import * as yup from 'yup';


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

export default function ContactEdit() {
  const { t } = useTranslation();
  useDocumentTitle(t('contact.edit.headline'));

  const navigate = useNavigate();
  const [addressValues, setAddressValues] = useState<Record<string,string>>({});
  const params = useParams();
  const currentId = params.id!;

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const prepareForm = async () => {
    try {
      const addressValuesResponse = await axios.get('/api/contacts/addressValues');
      setAddressValues(addressValuesResponse.data);
      const data = (await axios.get('/api/contacts/' + currentId)).data;
      useFormResult.reset(data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    prepareForm();
  }, []);

  const updateContact = async (data: ContactDTO) => {
    window.scrollTo(0, 0);
    try {
      await axios.put('/api/contacts/' + currentId, data);
      navigate('/contacts', {
            state: {
              msgSuccess: t('contact.update.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('contact.edit.headline')}</h1>
      <div>
        <Link to="/contacts" className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-4 rounded px-5 py-2">{t('contact.edit.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(updateContact)} noValidate>
      <InputRow useFormResult={useFormResult} object="contact" field="id" disabled={true} />
      <InputRow useFormResult={useFormResult} object="contact" field="name" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="contact" field="cpfCnpj" type="textarea" />
      <InputRow useFormResult={useFormResult} object="contact" field="email" type="textarea" />
      <InputRow useFormResult={useFormResult} object="contact" field="phone" type="textarea" />
      <InputRow useFormResult={useFormResult} object="contact" field="cellPhone" type="textarea" />
      <InputRow useFormResult={useFormResult} object="contact" field="fax" type="textarea" />
      <InputRow useFormResult={useFormResult} object="contact" field="mainActivityCode" type="textarea" />
      <InputRow useFormResult={useFormResult} object="contact" field="economicActivity" type="textarea" />
      <InputRow useFormResult={useFormResult} object="contact" field="address" type="select" options={addressValues} />
      <input type="submit" value={t('contact.edit.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6" />
    </form>
  </>);
}
