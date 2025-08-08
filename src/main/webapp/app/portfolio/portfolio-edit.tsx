import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PortfolioDTO } from 'app/portfolio/portfolio-model';
import InputRow from 'app/common/input-row/input-row';
import useDocumentTitle from 'app/common/use-document-title';
import * as yup from 'yup';
import api from 'app/services/api';


function getSchema() {
  setYupDefaults();
  return yup.object({
    title: yup.string().emptyToNull().required(),
    filePath: yup.string().emptyToNull(),
    customerId: yup.string().emptyToNull().uuid(),
    company: yup.string().emptyToNull().uuid()
  });
}

export default function PortfolioEdit() {
  const { t } = useTranslation();
  useDocumentTitle(t('portfolio.edit.headline'));

  const navigate = useNavigate();
  const [companyValues, setCompanyValues] = useState<Record<string,string>>({});
  const params = useParams();
  const currentId = params.id!;

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const prepareForm = async () => {
    try {
      const companyValuesResponse = await api.get("/api/portfolios/companyValues");
      setCompanyValues(companyValuesResponse.data);
      const data = (await api.get("/api/portfolios/" + currentId)).data;
      useFormResult.reset(data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    prepareForm();
  }, []);

  const updatePortfolio = async (data: PortfolioDTO) => {
    window.scrollTo(0, 0);
    try {
      await api.put("/api/portfolios/" + currentId, data);
      navigate('/portfolios', {
            state: {
              msgSuccess: t('portfolio.update.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('portfolio.edit.headline')}</h1>
      <div>
        <Link to="/portfolios" className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-4 rounded px-5 py-2">{t('portfolio.edit.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(updatePortfolio)} noValidate>
      <InputRow useFormResult={useFormResult} object="portfolio" field="id" disabled={true} />
      <InputRow useFormResult={useFormResult} object="portfolio" field="title" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="portfolio" field="filePath" type="textarea" />
      <InputRow useFormResult={useFormResult} object="portfolio" field="customerId" />
      <InputRow useFormResult={useFormResult} object="portfolio" field="company" type="select" options={companyValues} />
      <input type="submit" value={t('portfolio.edit.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6" />
    </form>
  </>);
}
