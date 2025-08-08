import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Ícone de menu para o botão de toggle
type MenuIconProps = {
  className?: string;
};

const MenuIcon: React.FC<MenuIconProps> = ({ className }) => (
  <svg 
    className={className} 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

type HeaderProps = {
  onToggleSidebar: () => void;
};

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const { t } = useTranslation();

  return (
    <header className="bg-white shadow-sm z-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Botão para mostrar/esconder a sidebar em telas móveis */}
            <button
              type="button"
              onClick={onToggleSidebar}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menu principal</span>
              <MenuIcon className="block h-6 w-6" />
            </button>
            
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center ml-4 lg:ml-0">
              <Link to="/" className="flex items-center">
                <img 
                  className="h-8 w-auto" 
                  src="/images/logo.png" 
                  alt={t('app.title')} 
                />
                <span className="ml-3 text-xl font-semibold text-gray-800 hidden sm:block">
                  {t('app.title')}
                </span>
              </Link>
            </div>
          </div>
          
          <div className="flex items-center">
            {/* Botão de perfil ou outras ações */}
            <div className="ml-4 flex items-center md:ml-6">
              {/* Aqui você pode adicionar notificações, perfil do usuário, etc. */}
              <div className="ml-3 relative">
                <div>
                  <button
                    type="button"
                    className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    id="user-menu"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <span className="sr-only">Abrir menu do usuário</span>
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                      {t('user.initial')}
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
