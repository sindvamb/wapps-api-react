import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { EventDTO } from 'app/event/event-model';
import axios from 'axios';
import InputRow from 'app/common/input-row/input-row';
import useDocumentTitle from 'app/common/use-document-title';
import * as yup from 'yup';


function getSchema() {
  setYupDefaults();
  return yup.object({
    name: yup.string().emptyToNull().required(),
    placeRealization: yup.string().emptyToNull().required(),
    address: yup.string().emptyToNull(),
    description: yup.string().emptyToNull().required(),
    eventType: yup.string().emptyToNull(),
    city: yup.string().emptyToNull().required(),
    uf: yup.string().emptyToNull().required(),
    programing: yup.string().emptyToNull().required(),
    assemblyInstructions: yup.string().emptyToNull().required(),
    partyPaymentDate: yup.string().emptyToNull().offsetDateTime(),
    partyDate: yup.string().emptyToNull().offsetDateTime(),
    timeStart: yup.string().emptyToNull(),
    timeEnd: yup.string().emptyToNull(),
    tentValue: yup.string().emptyToNull().numeric(10, 2),
    circulatingValue: yup.string().emptyToNull().numeric(10, 2),
    creatorId: yup.string().emptyToNull().uuid(),
    modifierId: yup.string().emptyToNull().uuid(),
    deleterId: yup.string().emptyToNull().uuid(),
    isDeleted: yup.bool(),
    createdAt: yup.string().emptyToNull().offsetDateTime(),
    updatedAt: yup.string().emptyToNull().offsetDateTime(),
    deletedAt: yup.string().emptyToNull().offsetDateTime()
  });
}

export default function EventEdit() {
  const { t } = useTranslation();
  useDocumentTitle(t('event.edit.headline'));

  const navigate = useNavigate();
  const params = useParams();
  const currentId = params.id!;

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const prepareForm = async () => {
    try {
      const data = (await axios.get('/api/events/' + currentId)).data;
      useFormResult.reset(data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    prepareForm();
  }, []);

  const updateEvent = async (data: EventDTO) => {
    window.scrollTo(0, 0);
    try {
      await axios.put('/api/events/' + currentId, data);
      navigate('/events', {
            state: {
              msgSuccess: t('event.update.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('event.edit.headline')}</h1>
      <div>
        <Link to="/events" className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-4 rounded px-5 py-2">{t('event.edit.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(updateEvent)} noValidate>
      <input type="submit" value={t('event.edit.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6 mb-5" />
      <InputRow useFormResult={useFormResult} object="event" field="id" disabled={true} />
      <InputRow useFormResult={useFormResult} object="event" field="name" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="event" field="placeRealization" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="event" field="address" type="textarea" />
      <InputRow useFormResult={useFormResult} object="event" field="description" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="event" field="eventType" type="textarea" />
      <InputRow useFormResult={useFormResult} object="event" field="city" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="event" field="uf" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="event" field="programing" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="event" field="assemblyInstructions" required={true} type="textarea" />
      <InputRow useFormResult={useFormResult} object="event" field="partyPaymentDate" />
      <InputRow useFormResult={useFormResult} object="event" field="partyDate" />
      <InputRow useFormResult={useFormResult} object="event" field="timeStart" type="timepicker" />
      <InputRow useFormResult={useFormResult} object="event" field="timeEnd" type="timepicker" />
      <InputRow useFormResult={useFormResult} object="event" field="tentValue" />
      <InputRow useFormResult={useFormResult} object="event" field="circulatingValue" />
      <InputRow useFormResult={useFormResult} object="event" field="creatorId" />
      <InputRow useFormResult={useFormResult} object="event" field="modifierId" />
      <InputRow useFormResult={useFormResult} object="event" field="deleterId" />
      <InputRow useFormResult={useFormResult} object="event" field="isDeleted" type="checkbox" />
      <InputRow useFormResult={useFormResult} object="event" field="createdAt" />
      <InputRow useFormResult={useFormResult} object="event" field="updatedAt" />
      <InputRow useFormResult={useFormResult} object="event" field="deletedAt" />
      <input type="submit" value={t('event.edit.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6" />
    </form>
  </>);
}
