import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PartnerDTO } from 'app/partner/partner-model';
import InputRow from 'app/common/input-row/input-row';
import useDocumentTitle from 'app/common/use-document-title';
import * as yup from 'yup';
import api from 'app/services/api';


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

export default function PartnerAdd() {
  const { t } = useTranslation();
  useDocumentTitle(t('partner.add.headline'));

  const navigate = useNavigate();

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const createPartner = async (data: PartnerDTO) => {
    window.scrollTo(0, 0);
    try {
      await api.post("/api/partners", data);
      navigate('/partners', {
            state: {
              msgSuccess: t('partner.create.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('partner.add.headline')}</h1>
      <div>
        <Link to="/partners" className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-4 rounded px-5 py-2">{t('partner.add.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(createPartner)} noValidate>
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
      <input type="submit" value={t('partner.add.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6" />
    </form>
  </>);
}
