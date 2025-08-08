import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError } from 'app/common/utils';
import { PartnerUnitDTO } from 'app/partner-unit/partner-unit-model';
import useDocumentTitle from 'app/common/use-document-title';
import api from 'app/services/api';

export default function PartnerUnitList() {
  const { t } = useTranslation();
  useDocumentTitle(t('partnerUnit.list.headline'));

  const [partnerUnits, setPartnerUnits] = useState<PartnerUnitDTO[]>([]);
  const navigate = useNavigate();

  const getAllPartnerUnits = async () => {
    try {
      const response = await api.get("/api/partnerUnits");
      setPartnerUnits(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await api.delete("/api/partnerUnits/" + id);
      navigate('/partnerUnits', {
            state: {
              msgInfo: t('partnerUnit.delete.success')
            }
          });
      getAllPartnerUnits();
    } catch (error: any) {
      if (error?.response?.data?.code === 'REFERENCED') {
        const messageParts = error.response.data.message.split(',');
        navigate('/partnerUnits', {
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
    getAllPartnerUnits();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('partnerUnit.list.headline')}</h1>
      <div>
        <Link to="/partnerUnits/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('partnerUnit.list.createNew')}</Link>
      </div>
    </div>
    {!partnerUnits || partnerUnits.length === 0 ? (
    <div>{t('partnerUnit.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th scope="col" className="text-left p-2">{t('partnerUnit.id.label')}</th>
            <th scope="col" className="text-left p-2">{t('partnerUnit.enabled.label')}</th>
            <th scope="col" className="text-left p-2">{t('partnerUnit.creatorId.label')}</th>
            <th scope="col" className="text-left p-2">{t('partnerUnit.modifierId.label')}</th>
            <th scope="col" className="text-left p-2">{t('partnerUnit.deleterId.label')}</th>
            <th scope="col" className="text-left p-2">{t('partnerUnit.isDeleted.label')}</th>
            <th scope="col" className="text-left p-2">{t('partnerUnit.createdAt.label')}</th>
            <th scope="col" className="text-left p-2">{t('partnerUnit.updatedAt.label')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="border-t-2 border-black">
          {partnerUnits.map((partnerUnit) => (
          <tr key={partnerUnit.id} className="odd:bg-gray-100">
            <td className="p-2">{partnerUnit.id}</td>
            <td className="p-2">{partnerUnit.enabled?.toString()}</td>
            <td className="p-2">{partnerUnit.creatorId}</td>
            <td className="p-2">{partnerUnit.modifierId}</td>
            <td className="p-2">{partnerUnit.deleterId}</td>
            <td className="p-2">{partnerUnit.isDeleted?.toString()}</td>
            <td className="p-2">{partnerUnit.createdAt}</td>
            <td className="p-2">{partnerUnit.updatedAt}</td>
            <td className="p-2">
              <div className="float-right whitespace-nowrap">
                <Link to={'/partnerUnits/edit/' + partnerUnit.id} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm">{t('partnerUnit.list.edit')}</Link>
                <span> </span>
                <button type="button" onClick={() => confirmDelete(partnerUnit.id!)} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm cursor-pointer">{t('partnerUnit.list.delete')}</button>
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
