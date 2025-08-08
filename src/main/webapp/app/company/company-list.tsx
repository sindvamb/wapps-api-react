import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError } from 'app/common/utils';
import { CompanyDTO } from 'app/company/company-model';
import useDocumentTitle from 'app/common/use-document-title';
import api from 'app/services/api';

export default function CompanyList() {
  const { t } = useTranslation();
  useDocumentTitle(t('company.list.headline'));

  const [companies, setCompanies] = useState<CompanyDTO[]>([]);
  const navigate = useNavigate();

  const getAllCompanies = async () => {
    try {
      const response = await api.get("/api/companies");
      setCompanies(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await api.delete("/api/companies/" + id);
      navigate('/companies', {
            state: {
              msgInfo: t('company.delete.success')
            }
          });
      getAllCompanies();
    } catch (error: any) {
      if (error?.response?.data?.code === 'REFERENCED') {
        const messageParts = error.response.data.message.split(',');
        navigate('/companies', {
              state: {
                msgError: t(messageParts[0]!, { id: messageParts[1]! })
              }
            });
        return;
      }
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    getAllCompanies();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('company.list.headline')}</h1>
      <div>
        <Link to="/companies/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('company.list.createNew')}</Link>
      </div>
    </div>
    {!companies || companies.length === 0 ? (
    <div>{t('company.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th scope="col" className="text-left p-2">{t('company.id.label')}</th>
            <th scope="col" className="text-left p-2">{t('company.foundationDate.label')}</th>
            <th scope="col" className="text-left p-2">{t('company.size.label')}</th>
            <th scope="col" className="text-left p-2">{t('company.status.label')}</th>
            <th scope="col" className="text-left p-2">{t('company.hasGovBrRegistration.label')}</th>
            <th scope="col" className="text-left p-2">{t('company.hasDigitalCertificate.label')}</th>
            <th scope="col" className="text-left p-2">{t('company.hasLogo.label')}</th>
            <th scope="col" className="text-left p-2">{t('company.hasVisualIdentity.label')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="border-t-2 border-black">
          {companies.map((company) => (
          <tr key={company.id} className="odd:bg-gray-100">
            <td className="p-2">{company.id}</td>
            <td className="p-2">{company.foundationDate}</td>
            <td className="p-2">{company.size}</td>
            <td className="p-2">{company.status}</td>
            <td className="p-2">{company.hasGovBrRegistration?.toString()}</td>
            <td className="p-2">{company.hasDigitalCertificate?.toString()}</td>
            <td className="p-2">{company.hasLogo?.toString()}</td>
            <td className="p-2">{company.hasVisualIdentity?.toString()}</td>
            <td className="p-2">
              <div className="float-right whitespace-nowrap">
                <Link to={'/companies/edit/' + company.id} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm">{t('company.list.edit')}</Link>
                <span> </span>
                <button type="button" onClick={() => confirmDelete(company.id!)} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm cursor-pointer">{t('company.list.delete')}</button>
              </div>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
    )}
  </>);
}
