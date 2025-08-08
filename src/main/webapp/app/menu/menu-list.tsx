import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { handleServerError } from 'app/common/utils';
import { MenuDTO } from 'app/menu/menu-model';
import useDocumentTitle from 'app/common/use-document-title';
import api from 'app/services/api';

export default function MenuList() {
  const { t } = useTranslation();
  useDocumentTitle(t('menu.list.headline'));

  const [menus, setMenus] = useState<MenuDTO[]>([]);
  const navigate = useNavigate();

  const getAllMenus = async () => {
    try {
      const response = await api.get("/api/menus");
      setMenus(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: string) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await api.delete("/api/menus/" + id);
      navigate('/menus', {
            state: {
              msgInfo: t('menu.delete.success')
            }
          });
      getAllMenus();
    } catch (error: any) {
      if (error?.response?.data?.code === 'REFERENCED') {
        const messageParts = error.response.data.message.split(',');
        navigate('/menus', {
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
    getAllMenus();
  }, []);

  return (<>
    <div className="flex flex-wrap mb-6">
      <h1 className="grow text-3xl md:text-4xl font-medium mb-2">{t('menu.list.headline')}</h1>
      <div>
        <Link to="/menus/add" className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300  focus:ring-4 rounded px-5 py-2">{t('menu.list.createNew')}</Link>
      </div>
    </div>
    {!menus || menus.length === 0 ? (
    <div>{t('menu.list.empty')}</div>
    ) : (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th scope="col" className="text-left p-2">{t('menu.id.label')}</th>
            <th scope="col" className="text-left p-2">{t('menu.company.label')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="border-t-2 border-black">
          {menus.map((menu) => (
          <tr key={menu.id} className="odd:bg-gray-100">
            <td className="p-2">{menu.id}</td>
            <td className="p-2">{menu.company}</td>
            <td className="p-2">
              <div className="float-right whitespace-nowrap">
                <Link to={'/menus/edit/' + menu.id} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm">{t('menu.list.edit')}</Link>
                <span> </span>
                <button type="button" onClick={() => confirmDelete(menu.id!)} className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm cursor-pointer">{t('menu.list.delete')}</button>
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
