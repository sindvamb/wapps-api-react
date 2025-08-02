import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';
import { handleServerError } from 'app/common/utils';
import { SpecialNeedsDTO } from 'app/special-needs/special-needs-model';
import axios from 'axios';
import useDocumentTitle from 'app/common/use-document-title';


export default function SpecialNeedsList() {
  const { t } = useTranslation();
  useDocumentTitle(t('specialNeeds.list.headline'));

  const [specialNeedses, setSpecialNeedses] = useState<SpecialNeedsDTO[]>([]);
  const navigate = useNavigate();

  const getAllSpecialNeedses = async () => {
    try {
      const response = await axios.get('/api/specialNeedss');
      setSpecialNeedses(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await axios.delete('/api/specialNeedss/' + id);
      navigate('/specialNeedss', {
            state: {
              msgInfo: t('specialNeeds.delete.success')
            }
          });
      getAllSpecialNeedses();
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    getAllSpecialNeedses();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('specialNeeds.list.headline')}</h1>
      <div>
        <Link to="/specialNeedss/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('specialNeeds.list.createNew')}</Link>
      </div>
    </div>
    {!specialNeedses || specialNeedses.length === 0 ? (
    <div>{t('specialNeeds.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th scope="col" className="text-left p-2">{t('specialNeeds.id.label')}</th>
            <th scope="col" className="text-left p-2">{t('specialNeeds.user.label')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="border-t-2 border-black">
          {specialNeedses.map((specialNeeds) => (
          <tr key={specialNeeds.id} className="odd:bg-gray-100">
            <td className="p-2">{specialNeeds.id}</td>
            <td className="p-2">{specialNeeds.user}</td>
            <td className="p-2">
              <div className="float-right whitespace-nowrap">
                <Link to={'/specialNeedss/edit/' + specialNeeds.id} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm">{t('specialNeeds.list.edit')}</Link>
                <span> </span>
                <button type="button" onClick={() => confirmDelete(specialNeeds.id!)} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm cursor-pointer">{t('specialNeeds.list.delete')}</button>
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
