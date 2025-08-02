import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';
import { handleServerError } from 'app/common/utils';
import { AuditDTO } from 'app/audit/audit-model';
import axios from 'axios';
import useDocumentTitle from 'app/common/use-document-title';


export default function AuditList() {
  const { t } = useTranslation();
  useDocumentTitle(t('audit.list.headline'));

  const [audits, setAudits] = useState<AuditDTO[]>([]);
  const navigate = useNavigate();

  const getAllAudits = async () => {
    try {
      const response = await axios.get('/api/audits');
      setAudits(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await axios.delete('/api/audits/' + id);
      navigate('/audits', {
            state: {
              msgInfo: t('audit.delete.success')
            }
          });
      getAllAudits();
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    getAllAudits();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('audit.list.headline')}</h1>
      <div>
        <Link to="/audits/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('audit.list.createNew')}</Link>
      </div>
    </div>
    {!audits || audits.length === 0 ? (
    <div>{t('audit.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th scope="col" className="text-left p-2">{t('audit.id.label')}</th>
            <th scope="col" className="text-left p-2">{t('audit.user.label')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="border-t-2 border-black">
          {audits.map((audit) => (
          <tr key={audit.id} className="odd:bg-gray-100">
            <td className="p-2">{audit.id}</td>
            <td className="p-2">{audit.user}</td>
            <td className="p-2">
              <div className="float-right whitespace-nowrap">
                <Link to={'/audits/edit/' + audit.id} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm">{t('audit.list.edit')}</Link>
                <span> </span>
                <button type="button" onClick={() => confirmDelete(audit.id!)} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm cursor-pointer">{t('audit.list.delete')}</button>
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
