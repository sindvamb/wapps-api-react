import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError } from 'app/common/utils';
import { PartnerDTO } from 'app/partner/partner-model';
import useDocumentTitle from 'app/common/use-document-title';
import api from 'app/services/api';

export default function PartnerList() {
  const { t } = useTranslation();
  useDocumentTitle(t('partner.list.headline'));

  const [partners, setPartners] = useState<PartnerDTO[]>([]);
  const navigate = useNavigate();

  const getAllPartners = async () => {
    try {
      const response = await api.get("/api/partners");
      setPartners(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await api.delete("/api/partners/" + id);
      navigate('/partners', {
            state: {
              msgInfo: t('partner.delete.success')
            }
          });
      getAllPartners();
    } catch (error: any) {
      if (error?.response?.data?.code === 'REFERENCED') {
        const messageParts = error.response.data.message.split(',');
        navigate('/partners', {
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
    getAllPartners();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('partner.list.headline')}</h1>
      <div>
        <Link to="/partners/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('partner.list.createNew')}</Link>
      </div>
    </div>
    {!partners || partners.length === 0 ? (
    <div>{t('partner.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th scope="col" className="text-left p-2">{t('partner.id.label')}</th>
            <th scope="col" className="text-left p-2">{t('partner.enabled.label')}</th>
            <th scope="col" className="text-left p-2">{t('partner.creatorId.label')}</th>
            <th scope="col" className="text-left p-2">{t('partner.modifierId.label')}</th>
            <th scope="col" className="text-left p-2">{t('partner.deleterId.label')}</th>
            <th scope="col" className="text-left p-2">{t('partner.isDeleted.label')}</th>
            <th scope="col" className="text-left p-2">{t('partner.createdAt.label')}</th>
            <th scope="col" className="text-left p-2">{t('partner.updatedAt.label')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="border-t-2 border-black">
          {partners.map((partner) => (
          <tr key={partner.id} className="odd:bg-gray-100">
            <td className="p-2">{partner.id}</td>
            <td className="p-2">{partner.enabled?.toString()}</td>
            <td className="p-2">{partner.creatorId}</td>
            <td className="p-2">{partner.modifierId}</td>
            <td className="p-2">{partner.deleterId}</td>
            <td className="p-2">{partner.isDeleted?.toString()}</td>
            <td className="p-2">{partner.createdAt}</td>
            <td className="p-2">{partner.updatedAt}</td>
            <td className="p-2">
              <div className="float-right whitespace-nowrap">
                <Link to={'/partners/edit/' + partner.id} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm">{t('partner.list.edit')}</Link>
                <span> </span>
                <button type="button" onClick={() => confirmDelete(partner.id!)} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm cursor-pointer">{t('partner.list.delete')}</button>
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
