import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PartnerDTO } from 'app/partner/partner-model';
import axios from 'axios';
import InputRow from 'app/common/input-row/input-row';
import useDocumentTitle from 'app/common/use-document-title';
import * as yup from 'yup';


function getSchema() {
  setYupDefaults();
  return yup.object({
    name: yup.string().emptyToNull(),
    cpfCnpj: yup.string().emptyToNull(),
    email: yup.string().emptyToNull(),
    enabled: yup.bool(),
    creatorId: yup.string().emptyToNull().uuid(),
    modifierId: yup.string().emptyToNull().uuid(),
    deleterId: yup.string().emptyToNull().uuid(),
    isDeleted: yup.bool(),
    createdAt: yup.string().emptyToNull().offsetDateTime(),
    updatedAt: yup.string().emptyToNull().offsetDateTime(),
    deletedAt: yup.string().emptyToNull().offsetDateTime()
  });
}

export default function PartnerEdit() {
  const { t } = useTranslation();
  useDocumentTitle(t('partner.edit.headline'));

  const navigate = useNavigate();
  const params = useParams();
  const currentId = params.id!;

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const prepareForm = async () => {
    try {
      const data = (await axios.get('/api/partners/' + currentId)).data;
      useFormResult.reset(data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    prepareForm();
  }, []);

  const updatePartner = async (data: PartnerDTO) => {
    window.scrollTo(0, 0);
    try {
      await axios.put('/api/partners/' + currentId, data);
      navigate('/partners', {
            state: {
              msgSuccess: t('partner.update.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('partner.edit.headline')}</h1>
      <div>
        <Link to="/partners" className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-4 rounded px-5 py-2">{t('partner.edit.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(updatePartner)} noValidate>
      <input type="submit" value={t('partner.edit.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6 mb-5" />
      <InputRow useFormResult={useFormResult} object="partner" field="id" disabled={true} />
      <InputRow useFormResult={useFormResult} object="partner" field="name" type="textarea" />
      <InputRow useFormResult={useFormResult} object="partner" field="cpfCnpj" type="textarea" />
      <InputRow useFormResult={useFormResult} object="partner" field="email" type="textarea" />
      <InputRow useFormResult={useFormResult} object="partner" field="enabled" type="checkbox" />
      <InputRow useFormResult={useFormResult} object="partner" field="creatorId" />
      <InputRow useFormResult={useFormResult} object="partner" field="modifierId" />
      <InputRow useFormResult={useFormResult} object="partner" field="deleterId" />
      <InputRow useFormResult={useFormResult} object="partner" field="isDeleted" type="checkbox" />
      <InputRow useFormResult={useFormResult} object="partner" field="createdAt" />
      <InputRow useFormResult={useFormResult} object="partner" field="updatedAt" />
      <InputRow useFormResult={useFormResult} object="partner" field="deletedAt" />
      <input type="submit" value={t('partner.edit.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6" />
    </form>
  </>);
}
