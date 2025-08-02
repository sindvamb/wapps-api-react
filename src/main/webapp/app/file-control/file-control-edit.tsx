import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FileControlDTO } from 'app/file-control/file-control-model';
import axios from 'axios';
import InputRow from 'app/common/input-row/input-row';
import useDocumentTitle from 'app/common/use-document-title';
import * as yup from 'yup';


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

export default function FileControlEdit() {
  const { t } = useTranslation();
  useDocumentTitle(t('fileControl.edit.headline'));

  const navigate = useNavigate();
  const [companyValues, setCompanyValues] = useState<Record<string,string>>({});
  const [dependentValues, setDependentValues] = useState<Record<string,string>>({});
  const [eventCustomerValues, setEventCustomerValues] = useState<Record<string,string>>({});
  const [eventValues, setEventValues] = useState<Record<string,string>>({});
  const [layoutValues, setLayoutValues] = useState<Record<string,string>>({});
  const [portfolioValues, setPortfolioValues] = useState<Record<string,string>>({});
  const [userValues, setUserValues] = useState<Record<string,string>>({});
  const params = useParams();
  const currentId = params.id!;

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const prepareForm = async () => {
    try {
      const companyValuesResponse = await axios.get('/api/fileControls/companyValues');
      setCompanyValues(companyValuesResponse.data);
      const dependentValuesResponse = await axios.get('/api/fileControls/dependentValues');
      setDependentValues(dependentValuesResponse.data);
      const eventCustomerValuesResponse = await axios.get('/api/fileControls/eventCustomerValues');
      setEventCustomerValues(eventCustomerValuesResponse.data);
      const eventValuesResponse = await axios.get('/api/fileControls/eventValues');
      setEventValues(eventValuesResponse.data);
      const layoutValuesResponse = await axios.get('/api/fileControls/layoutValues');
      setLayoutValues(layoutValuesResponse.data);
      const portfolioValuesResponse = await axios.get('/api/fileControls/portfolioValues');
      setPortfolioValues(portfolioValuesResponse.data);
      const userValuesResponse = await axios.get('/api/fileControls/userValues');
      setUserValues(userValuesResponse.data);
      const data = (await axios.get('/api/fileControls/' + currentId)).data;
      useFormResult.reset(data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    prepareForm();
  }, []);

  const updateFileControl = async (data: FileControlDTO) => {
    window.scrollTo(0, 0);
    try {
      await axios.put('/api/fileControls/' + currentId, data);
      navigate('/fileControls', {
            state: {
              msgSuccess: t('fileControl.update.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('fileControl.edit.headline')}</h1>
      <div>
        <Link to="/fileControls" className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-4 rounded px-5 py-2">{t('fileControl.edit.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(updateFileControl)} noValidate>
      <input type="submit" value={t('fileControl.edit.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6 mb-5" />
      <InputRow useFormResult={useFormResult} object="fileControl" field="id" disabled={true} />
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
      <input type="submit" value={t('fileControl.edit.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6" />
    </form>
  </>);
}
