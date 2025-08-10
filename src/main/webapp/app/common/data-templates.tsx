import React from 'react';
import { Link } from 'react-router-dom';

interface Company {
    id: string;
    [key: string]: any;
}

/**
 * Cria um template de ações para uma coluna do DataTable.
 * @param t Função de tradução (i18n)
 * @param confirmDelete Função chamada ao clicar em "Excluir"
 * @param editPath Caminho base para edição (ex: "/companies/edit/")
 */
export const createActionTemplate = (
    confirmDelete: (id: string) => void,
    editPath: string
) => {
    return (company: Company) => (
        <div className="float-right whitespace-nowrap">
            <Link
                to={`${editPath}${company.id}`}
                className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm"
            >
               Editar
            </Link>
            <span> </span>
            <button
                type="button"
                onClick={() => confirmDelete(company.id)}
                className="inline-block text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-3 rounded px-2.5 py-1.5 text-sm cursor-pointer"
            >
                Remover
            </button>
        </div>
    );
};