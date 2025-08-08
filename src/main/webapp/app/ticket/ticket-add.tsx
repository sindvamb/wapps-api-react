import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TicketDTO } from 'app/ticket/ticket-model';
import api from 'app/services/api';
import InputRow from 'app/common/input-row/input-row';
import useDocumentTitle from 'app/common/use-document-title';
import * as yup from 'yup';


function getSchema() {
  setYupDefaults();
  return yup.object({
    solution: yup.string().emptyToNull(),
    dueDate: yup.string().emptyToNull().offsetDateTime().required(),
    active: yup.bool(),
    creatorId: yup.string().emptyToNull().uuid(),
    modifierId: yup.string().emptyToNull().uuid(),
    deleterId: yup.string().emptyToNull().uuid(),
    isDeleted: yup.bool(),
    createdAt: yup.string().emptyToNull().offsetDateTime(),
    updatedAt: yup.string().emptyToNull().offsetDateTime(),
    deletedAt: yup.string().emptyToNull().offsetDateTime(),
    customer: yup.string().emptyToNull().uuid().required(),
    order: yup.string().emptyToNull().uuid().required(),
    ticketStatus: yup.string().emptyToNull().uuid()
  });
}

export default function TicketAdd() {
  const { t } = useTranslation();
  useDocumentTitle(t('ticket.add.headline'));

  const navigate = useNavigate();
  const [customerValues, setCustomerValues] = useState<Record<string,string>>({});
  const [orderValues, setOrderValues] = useState<Record<string,string>>({});
  const [ticketStatusValues, setTicketStatusValues] = useState<Record<string,string>>({});

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const prepareRelations = async () => {
    try {
      const customerValuesResponse = await api.get("/api/tickets/customerValues");
      setCustomerValues(customerValuesResponse.data);
      const orderValuesResponse = await api.get("/api/tickets/orderValues");
      setOrderValues(orderValuesResponse.data);
      const ticketStatusValuesResponse = await api.get("/api/tickets/ticketStatusValues");
      setTicketStatusValues(ticketStatusValuesResponse.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    prepareRelations();
  }, []);

  const createTicket = async (data: TicketDTO) => {
    window.scrollTo(0, 0);
    try {
      await api.post("/api/tickets", data);
      navigate('/tickets', {
            state: {
              msgSuccess: t('ticket.create.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('ticket.add.headline')}</h1>
      <div>
        <Link to="/tickets" className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-4 rounded px-5 py-2">{t('ticket.add.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(createTicket)} noValidate>
      <InputRow useFormResult={useFormResult} object="ticket" field="solution" type="textarea" />
      <InputRow useFormResult={useFormResult} object="ticket" field="dueDate" required={true} />
      <InputRow useFormResult={useFormResult} object="ticket" field="active" type="checkbox" />
      <InputRow useFormResult={useFormResult} object="ticket" field="creatorId" />
      <InputRow useFormResult={useFormResult} object="ticket" field="modifierId" />
      <InputRow useFormResult={useFormResult} object="ticket" field="deleterId" />
      <InputRow useFormResult={useFormResult} object="ticket" field="isDeleted" type="checkbox" />
      <InputRow useFormResult={useFormResult} object="ticket" field="createdAt" />
      <InputRow useFormResult={useFormResult} object="ticket" field="updatedAt" />
      <InputRow useFormResult={useFormResult} object="ticket" field="deletedAt" />
      <InputRow useFormResult={useFormResult} object="ticket" field="customer" required={true} type="select" options={customerValues} />
      <InputRow useFormResult={useFormResult} object="ticket" field="order" required={true} type="select" options={orderValues} />
      <InputRow useFormResult={useFormResult} object="ticket" field="ticketStatus" type="select" options={ticketStatusValues} />
      <input type="submit" value={t('ticket.add.headline')} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2 cursor-pointer mt-6" />
    </form>
  </>);
}
