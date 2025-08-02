import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';
import { handleServerError } from 'app/common/utils';
import { DependentDTO } from 'app/dependent/dependent-model';
import axios from 'axios';
import useDocumentTitle from 'app/common/use-document-title';


export default function DependentList() {
  const { t } = useTranslation();
  useDocumentTitle(t('dependent.list.headline'));

  const [dependents, setDependents] = useState<DependentDTO[]>([]);
  const navigate = useNavigate();

  const getAllDependents = async () => {
    try {
      const response = await axios.get('/api/dependents');
      setDependents(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await axios.delete('/api/dependents/' + id);
      navigate('/dependents', {
            state: {
              msgInfo: t('dependent.delete.success')
            }
          });
      getAllDependents();
    } catch (error: any) {
      if (error?.response?.data?.code === 'REFERENCED') {
        const messageParts = error.response.data.message.split(',');
        navigate('/dependents', {
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
    getAllDependents();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('dependent.list.headline')}</h1>
      <div>
        <Link to="/dependents/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('dependent.list.createNew')}</Link>
      </div>
    </div>
    {!dependents || dependents.length === 0 ? (
    <div>{t('dependent.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th scope="col" className="text-left p-2">{t('dependent.id.label')}</th>
            <th scope="col" className="text-left p-2">{t('dependent.customer.label')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="border-t-2 border-black">
          {dependents.map((dependent) => (
          <tr key={dependent.id} className="odd:bg-gray-100">
            <td className="p-2">{dependent.id}</td>
            <td className="p-2">{dependent.customer}</td>
            <td className="p-2">
              <div className="float-right whitespace-nowrap">
                <Link to={'/dependents/edit/' + dependent.id} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm">{t('dependent.list.edit')}</Link>
                <span> </span>
                <button type="button" onClick={() => confirmDelete(dependent.id!)} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm cursor-pointer">{t('dependent.list.delete')}</button>
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
