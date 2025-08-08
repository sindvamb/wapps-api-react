import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError } from 'app/common/utils';
import { AttachmentDTO } from 'app/attachment/attachment-model';
import useDocumentTitle from 'app/common/use-document-title';
import api from 'app/services/api';

export default function AttachmentList() {
  const { t } = useTranslation();
  useDocumentTitle(t('attachment.list.headline'));

  const [attachments, setAttachments] = useState<AttachmentDTO[]>([]);
  const navigate = useNavigate();

  const getAllAttachments = async () => {
    try {
      const response = await api.get("/api/attachments");
      setAttachments(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await api.delete("/api/attachments/" + id);
      navigate('/attachments', {
            state: {
              msgInfo: t('attachment.delete.success')
            }
          });
      getAllAttachments();
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    getAllAttachments();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('attachment.list.headline')}</h1>
      <div>
        <Link to="/attachments/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('attachment.list.createNew')}</Link>
      </div>
    </div>
    {!attachments || attachments.length === 0 ? (
    <div>{t('attachment.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th scope="col" className="text-left p-2">{t('attachment.id.label')}</th>
            <th scope="col" className="text-left p-2">{t('attachment.size.label')}</th>
            <th scope="col" className="text-left p-2">{t('attachment.isPublic.label')}</th>
            <th scope="col" className="text-left p-2">{t('attachment.inCloud.label')}</th>
            <th scope="col" className="text-left p-2">{t('attachment.ticket.label')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="border-t-2 border-black">
          {attachments.map((attachment) => (
          <tr key={attachment.id} className="odd:bg-gray-100">
            <td className="p-2">{attachment.id}</td>
            <td className="p-2">{attachment.size}</td>
            <td className="p-2">{attachment.isPublic?.toString()}</td>
            <td className="p-2">{attachment.inCloud?.toString()}</td>
            <td className="p-2">{attachment.ticket}</td>
            <td className="p-2">
              <div className="float-right whitespace-nowrap">
                <Link to={'/attachments/edit/' + attachment.id} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm">{t('attachment.list.edit')}</Link>
                <span> </span>
                <button type="button" onClick={() => confirmDelete(attachment.id!)} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm cursor-pointer">{t('attachment.list.delete')}</button>
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
