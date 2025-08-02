import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router';
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

export default function SpecialNeedsEdit() {
  const { t } = useTranslation();
  useDocumentTitle(t('specialNeeds.edit.headline'));

  const navigate = useNavigate();
  const [userValues, setUserValues] = useState<Record<string,string>>({});
  const params = useParams();
  const currentId = params.id!;

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const prepareForm = async () => {
    try {
      const userValuesResponse = await axios.get('/api/specialNeedss/userValues');
      setUserValues(userValuesResponse.data);
      const data = (await axios.get('/api/specialNeedss/' + currentId)).data;
      useFormResult.reset(data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    prepareForm();
  }, []);

  const updateSpecialNeeds = async (data: SpecialNeedsDTO) => {
    window.scrollTo(0, 0);
    try {
      await axios.put('/api/specialNeedss/' + currentId, data);
      navigate('/specialNeedss', {
            state: {
              msgSuccess: t('specialNeeds.update.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('specialNeeds.edit.headline')}</h1>
      <div>
        <Link to="/specialNeedss" className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-4 rounded px-5 py-2">{t('specialNeeds.edit.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(updateSpecialNeeds)} noValidate>
      <InputRow useFormResult={useFormResult} object="specialNeeds" field="id" disabled={true} />
      <InputRow useFormResult={useFormResult} object="specialNeeds" field="description" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="specialNeeds" field="user" required={true} type="select" options={userValues} />
      <input type="submit" value={t('specialNeeds.edit.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6" />
    </form>
  </>);
}
