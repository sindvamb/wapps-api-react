import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SpecialNeedsDTO } from 'app/special-needs/special-needs-model';
import axios from 'axios';
import InputRow from 'app/common/input-row/input-row';
import useDocumentTitle from 'app/common/use-document-title';
import * as yup from 'yup';


function getSchema() {
  setYupDefaults();
  return yup.object({
    description: yup.string().emptyToNull().required(),
    user: yup.string().emptyToNull().uuid().required()
  });
}

export default function SpecialNeedsAdd() {
  const { t } = useTranslation();
  useDocumentTitle(t('specialNeeds.add.headline'));

  const navigate = useNavigate();
  const [userValues, setUserValues] = useState<Record<string,string>>({});

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const prepareRelations = async () => {
    try {
      const userValuesResponse = await axios.get('/api/specialNeedss/userValues');
      setUserValues(userValuesResponse.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    prepareRelations();
  }, []);

  const createSpecialNeeds = async (data: SpecialNeedsDTO) => {
    window.scrollTo(0, 0);
    try {
      await axios.post('/api/specialNeedss', data);
      navigate('/specialNeedss', {
            state: {
              msgSuccess: t('specialNeeds.create.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('specialNeeds.add.headline')}</h1>
      <div>
        <Link to="/specialNeedss" className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-4 rounded px-5 py-2">{t('specialNeeds.add.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(createSpecialNeeds)} noValidate>
      <InputRow useFormResult={useFormResult} object="specialNeeds" field="description" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="specialNeeds" field="user" required={true} type="select" options={userValues} />
      <input type="submit" value={t('specialNeeds.add.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6" />
    </form>
  </>);
}
