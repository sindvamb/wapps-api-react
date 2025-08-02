import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AddressDTO } from 'app/address/address-model';
import axios from 'axios';
import InputRow from 'app/common/input-row/input-row';
import useDocumentTitle from 'app/common/use-document-title';
import * as yup from 'yup';


function getSchema() {
  setYupDefaults();
  return yup.object({
    zipCode: yup.string().emptyToNull(),
    neighborhood: yup.string().emptyToNull(),
    addressLine1: yup.string().emptyToNull(),
    addressLine2: yup.string().emptyToNull(),
    complement: yup.string().emptyToNull(),
    number: yup.number().integer().emptyToNull(),
    city: yup.string().emptyToNull(),
    district: yup.string().emptyToNull(),
    uf: yup.string().emptyToNull(),
    housing: yup.string().emptyToNull()
  });
}

export default function AddressEdit() {
  const { t } = useTranslation();
  useDocumentTitle(t('address.edit.headline'));

  const navigate = useNavigate();
  const params = useParams();
  const currentId = params.id!;

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const prepareForm = async () => {
    try {
      const data = (await axios.get('/api/addresses/' + currentId)).data;
      useFormResult.reset(data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    prepareForm();
  }, []);

  const updateAddress = async (data: AddressDTO) => {
    window.scrollTo(0, 0);
    try {
      await axios.put('/api/addresses/' + currentId, data);
      navigate('/addresses', {
            state: {
              msgSuccess: t('address.update.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('address.edit.headline')}</h1>
      <div>
        <Link to="/addresses" className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-4 rounded px-5 py-2">{t('address.edit.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(updateAddress)} noValidate>
      <input type="submit" value={t('address.edit.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6 mb-5" />
      <InputRow useFormResult={useFormResult} object="address" field="id" disabled={true} />
      <InputRow useFormResult={useFormResult} object="address" field="zipCode" type="textarea" />
      <InputRow useFormResult={useFormResult} object="address" field="neighborhood" type="textarea" />
      <InputRow useFormResult={useFormResult} object="address" field="addressLine1" type="textarea" />
      <InputRow useFormResult={useFormResult} object="address" field="addressLine2" type="textarea" />
      <InputRow useFormResult={useFormResult} object="address" field="complement" type="textarea" />
      <InputRow useFormResult={useFormResult} object="address" field="number" type="number" />
      <InputRow useFormResult={useFormResult} object="address" field="city" type="textarea" />
      <InputRow useFormResult={useFormResult} object="address" field="district" type="textarea" />
      <InputRow useFormResult={useFormResult} object="address" field="uf" type="textarea" />
      <InputRow useFormResult={useFormResult} object="address" field="housing" type="textarea" />
      <input type="submit" value={t('address.edit.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6" />
    </form>
  </>);
}
