import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError } from 'app/common/utils';
import { ContactDTO } from 'app/contact/contact-model';
import useDocumentTitle from 'app/common/use-document-title';
import api from 'app/services/api';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {createActionTemplate} from "app/common/data-templates";

export default function ContactList() {
  const { t } = useTranslation();
  useDocumentTitle(t('contact.list.headline'));

  const [contacts, setContacts] = useState<ContactDTO[]>([]);
  const navigate = useNavigate();

  const getAllContacts = async () => {
    try {
      const response = await api.get("/api/contacts");
      setContacts(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await api.delete("/api/contacts/" + id);
      navigate('/contacts', {
            state: {
              msgInfo: t('contact.delete.success')
            }
          });
      getAllContacts();
    } catch (error: any) {
      if (error?.response?.data?.code === 'REFERENCED') {
        const messageParts = error.response.data.message.split(',');
        navigate('/contacts', {
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
    getAllContacts();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('contact.list.headline')}</h1>
      <div>
        <Link to="/contacts/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('contact.list.createNew')}</Link>
      </div>
    </div>
    {!contacts || contacts.length === 0 ? (
    <div>{t('contact.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
        <DataTable value={contacts}  paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
            <Column field="id" header={t('contact.id.label')} />
            <Column field="address" header={t('contact.address.label')} />
            <Column body={(rowData) => createActionTemplate(confirmDelete, '/contacts/edit/')(rowData)} />
        </DataTable>
    </div>
    )}
  </>);
}
