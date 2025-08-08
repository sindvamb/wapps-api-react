import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError } from 'app/common/utils';
import { EducationDegreeDTO } from 'app/education-degree/education-degree-model';
import useDocumentTitle from 'app/common/use-document-title';
import api from 'app/services/api';

export default function EducationDegreeList() {
  const { t } = useTranslation();
  useDocumentTitle(t('educationDegree.list.headline'));

  const [educationDegrees, setEducationDegrees] = useState<EducationDegreeDTO[]>([]);
  const navigate = useNavigate();

  const getAllEducationDegrees = async () => {
    try {
      const response = await api.get("/api/educationDegrees");
      setEducationDegrees(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await api.delete("/api/educationDegrees/" + id);
      navigate('/educationDegrees', {
            state: {
              msgInfo: t('educationDegree.delete.success')
            }
          });
      getAllEducationDegrees();
    } catch (error: any) {
      if (error?.response?.data?.code === 'REFERENCED') {
        const messageParts = error.response.data.message.split(',');
        navigate('/educationDegrees', {
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
    getAllEducationDegrees();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('educationDegree.list.headline')}</h1>
      <div>
        <Link to="/educationDegrees/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('educationDegree.list.createNew')}</Link>
      </div>
    </div>
    {!educationDegrees || educationDegrees.length === 0 ? (
    <div>{t('educationDegree.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th scope="col" className="text-left p-2">{t('educationDegree.id.label')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="border-t-2 border-black">
          {educationDegrees.map((educationDegree) => (
          <tr key={educationDegree.id} className="odd:bg-gray-100">
            <td className="p-2">{educationDegree.id}</td>
            <td className="p-2">
              <div className="float-right whitespace-nowrap">
                <Link to={'/educationDegrees/edit/' + educationDegree.id} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm">{t('educationDegree.list.edit')}</Link>
                <span> </span>
                <button type="button" onClick={() => confirmDelete(educationDegree.id!)} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm cursor-pointer">{t('educationDegree.list.delete')}</button>
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
