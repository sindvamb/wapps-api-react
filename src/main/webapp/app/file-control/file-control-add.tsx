import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FileControlDTO } from 'app/file-control/file-control-model';
import InputRow from 'app/common/input-row/input-row';
import useDocumentTitle from 'app/common/use-document-title';
import * as yup from 'yup';
import api from 'app/services/api';


function getSchema() {
  setYupDefaults();
  return yup.object({
    fileName: yup.string().emptyToNull().required(),
    fileSize: yup.string().emptyToNull().numeric(18, 4).required(),
    fileArray: yup.string().emptyToNull().required(),
    targetPath: yup.string().emptyToNull(),
    contentType: yup.string().emptyToNull().required(),
    description: yup.string().emptyToNull(),
    approved: yup.bool(),
    company: yup.string().emptyToNull().uuid(),
    dependent: yup.string().emptyToNull().uuid(),
    eventCustomer: yup.string().emptyToNull().uuid(),
    event: yup.string().emptyToNull().uuid(),
    layout: yup.string().emptyToNull().uuid(),
    portfolio: yup.string().emptyToNull().uuid(),
    user: yup.string().emptyToNull().uuid()
  });
}

export default function FileControlAdd() {
  const { t } = useTranslation();
  useDocumentTitle(t('fileControl.add.headline'));

  const navigate = useNavigate();
  const [companyValues, setCompanyValues] = useState<Record<string,string>>({});
  const [dependentValues, setDependentValues] = useState<Record<string,string>>({});
  const [eventCustomerValues, setEventCustomerValues] = useState<Record<string,string>>({});
  const [eventValues, setEventValues] = useState<Record<string,string>>({});
  const [layoutValues, setLayoutValues] = useState<Record<string,string>>({});
  const [portfolioValues, setPortfolioValues] = useState<Record<string,string>>({});
  const [userValues, setUserValues] = useState<Record<string,string>>({});

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const prepareRelations = async () => {
    try {
      const companyValuesResponse = await api.get("/api/fileControls/companyValues");
      setCompanyValues(companyValuesResponse.data);
      const dependentValuesResponse = await api.get("/api/fileControls/dependentValues");
      setDependentValues(dependentValuesResponse.data);
      const eventCustomerValuesResponse = await api.get("/api/fileControls/eventCustomerValues");
      setEventCustomerValues(eventCustomerValuesResponse.data);
      const eventValuesResponse = await api.get("/api/fileControls/eventValues");
      setEventValues(eventValuesResponse.data);
      const layoutValuesResponse = await api.get("/api/fileControls/layoutValues");
      setLayoutValues(layoutValuesResponse.data);
      const portfolioValuesResponse = await api.get("/api/fileControls/portfolioValues");
      setPortfolioValues(portfolioValuesResponse.data);
      const userValuesResponse = await api.get("/api/fileControls/userValues");
      setUserValues(userValuesResponse.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    prepareRelations();
  }, []);

  const createFileControl = async (data: FileControlDTO) => {
    window.scrollTo(0, 0);
    try {
      await api.post("/api/fileControls", data);
      navigate('/fileControls', {
            state: {
              msgSuccess: t('fileControl.create.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('fileControl.add.headline')}</h1>
      <div>
        <Link to="/fileControls" className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-4 rounded px-5 py-2">{t('fileControl.add.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(createFileControl)} noValidate>
      <InputRow useFormResult={useFormResult} object="fileControl" field="fileName" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="fileControl" field="fileSize" required={true} />
      <InputRow useFormResult={useFormResult} object="fileControl" field="fileArray" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="fileControl" field="targetPath" type="textarea" />
      <InputRow useFormResult={useFormResult} object="fileControl" field="contentType" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="fileControl" field="description" type="textarea" />
      <InputRow useFormResult={useFormResult} object="fileControl" field="approved" type="checkbox" />
      <InputRow useFormResult={useFormResult} object="fileControl" field="company" type="select" options={companyValues} />
      <InputRow useFormResult={useFormResult} object="fileControl" field="dependent" type="select" options={dependentValues} />
      <InputRow useFormResult={useFormResult} object="fileControl" field="eventCustomer" type="select" options={eventCustomerValues} />
      <InputRow useFormResult={useFormResult} object="fileControl" field="event" type="select" options={eventValues} />
      <InputRow useFormResult={useFormResult} object="fileControl" field="layout" type="select" options={layoutValues} />
      <InputRow useFormResult={useFormResult} object="fileControl" field="portfolio" type="select" options={portfolioValues} />
      <InputRow useFormResult={useFormResult} object="fileControl" field="user" type="select" options={userValues} />
      <input type="submit" value={t('fileControl.add.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6" />
    </form>
  </>);
}
