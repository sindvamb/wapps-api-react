import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError } from 'app/common/utils';
import { EducationDegreeDTO } from 'app/education-degree/education-degree-model';
import useDocumentTitle from 'app/common/use-document-title';
import api from 'app/services/api';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {createActionTemplate} from "app/common/data-templates";

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
        <DataTable value={educationDegrees}  paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
            <Column field="id" header={t('educationDegree.id.label')} />
            <Column body={(rowData) => createActionTemplate(confirmDelete, '/educationDegrees/edit/')(rowData)} />
        </DataTable>
    </div>
    )}
  </>);
}
