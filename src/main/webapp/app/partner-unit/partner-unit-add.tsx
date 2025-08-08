import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PartnerUnitDTO } from 'app/partner-unit/partner-unit-model';
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
    deletedAt: yup.string().emptyToNull().offsetDateTime(),
    partner: yup.string().emptyToNull().uuid().required()
  });
}

export default function PartnerUnitAdd() {
  const { t } = useTranslation();
  useDocumentTitle(t('partnerUnit.add.headline'));

  const navigate = useNavigate();
  const [partnerValues, setPartnerValues] = useState<Record<string,string>>({});

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const prepareRelations = async () => {
    try {
      const partnerValuesResponse = await api.get("/api/partnerUnits/partnerValues");
      setPartnerValues(partnerValuesResponse.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    prepareRelations();
  }, []);

  const createPartnerUnit = async (data: PartnerUnitDTO) => {
    window.scrollTo(0, 0);
    try {
      await api.post("/api/partnerUnits", data);
      navigate('/partnerUnits', {
            state: {
              msgSuccess: t('partnerUnit.create.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('partnerUnit.add.headline')}</h1>
      <div>
        <Link to="/partnerUnits" className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-4 rounded px-5 py-2">{t('partnerUnit.add.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(createPartnerUnit)} noValidate>
      <InputRow useFormResult={useFormResult} object="partnerUnit" field="name" type="textarea" />
      <InputRow useFormResult={useFormResult} object="partnerUnit" field="cpfCnpj" type="textarea" />
      <InputRow useFormResult={useFormResult} object="partnerUnit" field="email" type="textarea" />
      <InputRow useFormResult={useFormResult} object="partnerUnit" field="enabled" type="checkbox" />
      <InputRow useFormResult={useFormResult} object="partnerUnit" field="creatorId" />
      <InputRow useFormResult={useFormResult} object="partnerUnit" field="modifierId" />
      <InputRow useFormResult={useFormResult} object="partnerUnit" field="deleterId" />
      <InputRow useFormResult={useFormResult} object="partnerUnit" field="isDeleted" type="checkbox" />
      <InputRow useFormResult={useFormResult} object="partnerUnit" field="createdAt" />
      <InputRow useFormResult={useFormResult} object="partnerUnit" field="updatedAt" />
      <InputRow useFormResult={useFormResult} object="partnerUnit" field="deletedAt" />
      <InputRow useFormResult={useFormResult} object="partnerUnit" field="partner" required={true} type="select" options={partnerValues} />
      <input type="submit" value={t('partnerUnit.add.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6" />
    </form>
  </>);
}
