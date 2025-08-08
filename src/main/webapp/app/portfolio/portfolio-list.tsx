import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError } from 'app/common/utils';
import { PortfolioDTO } from 'app/portfolio/portfolio-model';
import useDocumentTitle from 'app/common/use-document-title';
import api from 'app/services/api';

export default function PortfolioList() {
  const { t } = useTranslation();
  useDocumentTitle(t('portfolio.list.headline'));

  const [portfolios, setPortfolios] = useState<PortfolioDTO[]>([]);
  const navigate = useNavigate();

  const getAllPortfolios = async () => {
    try {
      const response = await api.get("/api/portfolios");
      setPortfolios(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await api.delete("/api/portfolios/" + id);
      navigate('/portfolios', {
            state: {
              msgInfo: t('portfolio.delete.success')
            }
          });
      getAllPortfolios();
    } catch (error: any) {
      if (error?.response?.data?.code === 'REFERENCED') {
        const messageParts = error.response.data.message.split(',');
        navigate('/portfolios', {
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
    getAllPortfolios();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('portfolio.list.headline')}</h1>
      <div>
        <Link to="/portfolios/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('portfolio.list.createNew')}</Link>
      </div>
    </div>
    {!portfolios || portfolios.length === 0 ? (
    <div>{t('portfolio.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th scope="col" className="text-left p-2">{t('portfolio.id.label')}</th>
            <th scope="col" className="text-left p-2">{t('portfolio.customerId.label')}</th>
            <th scope="col" className="text-left p-2">{t('portfolio.company.label')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="border-t-2 border-black">
          {portfolios.map((portfolio) => (
          <tr key={portfolio.id} className="odd:bg-gray-100">
            <td className="p-2">{portfolio.id}</td>
            <td className="p-2">{portfolio.customerId}</td>
            <td className="p-2">{portfolio.company}</td>
            <td className="p-2">
              <div className="float-right whitespace-nowrap">
                <Link to={'/portfolios/edit/' + portfolio.id} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm">{t('portfolio.list.edit')}</Link>
                <span> </span>
                <button type="button" onClick={() => confirmDelete(portfolio.id!)} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm cursor-pointer">{t('portfolio.list.delete')}</button>
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
