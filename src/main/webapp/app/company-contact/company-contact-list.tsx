import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError } from 'app/common/utils';
import { CompanyContactDTO } from 'app/company-contact/company-contact-model';
import useDocumentTitle from 'app/common/use-document-title';
import api from 'app/services/api';

export default function CompanyContactList() {
  const { t } = useTranslation();
  useDocumentTitle(t('companyContact.list.headline'));

  const [companyContacts, setCompanyContacts] = useState<CompanyContactDTO[]>([]);
  const navigate = useNavigate();

  const getAllCompanyContacts = async () => {
    try {
      const response = await api.get("/api/companyContacts");
      setCompanyContacts(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await api.delete("/api/companyContacts/" + id);
      navigate('/companyContacts', {
            state: {
              msgInfo: t('companyContact.delete.success')
            }
          });
      getAllCompanyContacts();
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    getAllCompanyContacts();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('companyContact.list.headline')}</h1>
      <div>
        <Link to="/companyContacts/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('companyContact.list.createNew')}</Link>
      </div>
    </div>
    {!companyContacts || companyContacts.length === 0 ? (
    <div>{t('companyContact.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th scope="col" className="text-left p-2">{t('companyContact.id.label')}</th>
            <th scope="col" className="text-left p-2">{t('companyContact.company.label')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="border-t-2 border-black">
          {companyContacts.map((companyContact) => (
          <tr key={companyContact.id} className="odd:bg-gray-100">
            <td className="p-2">{companyContact.id}</td>
            <td className="p-2">{companyContact.company}</td>
            <td className="p-2">
              <div className="float-right whitespace-nowrap">
                <Link to={'/companyContacts/edit/' + companyContact.id} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm">{t('companyContact.list.edit')}</Link>
                <span> </span>
                <button type="button" onClick={() => confirmDelete(companyContact.id!)} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm cursor-pointer">{t('companyContact.list.delete')}</button>
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
