import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import Header from 'app/common/header';
import Sidebar from 'app/common/sidebar';
import ErrorBoundary from 'app/error/error-boundary';
import './app.css';

/**
 * Provide the app layout and some general functionality.
 */
export default function App() {
  const { state } = useLocation();
  const msgSuccess = state?.msgSuccess || null;
  const msgInfo = state?.msgInfo || null;
  const msgError = state?.msgError || null;
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // Efeito para lidar com o redimensionamento da tela
  useEffect(() => {


    const handleResize = () => {
      const isMobileView = window.innerWidth < 1024;
      setIsMobile(isMobileView);

      if (isMobile) {}
      
      // Se for mobile, colapsa a sidebar por padrão
      if (isMobileView) {
        setIsSidebarCollapsed(true);
      } else {
        setIsSidebarCollapsed(false);
      }
    };

    // Adiciona o listener de redimensionamento
    window.addEventListener('resize', handleResize);
    
    // Verifica o tamanho inicial
    handleResize();
    
    // Remove o listener quando o componente é desmontado
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Estilo para o conteúdo principal baseado no estado da sidebar
  const mainContentStyle = {
    marginLeft: isSidebarCollapsed ? '4rem' : '16rem', // 16rem = 256px (largura da sidebar expandida)
    transition: 'margin-left 0.3s ease-in-out',
    width: isSidebarCollapsed ? 'calc(100% - 4rem)' : 'calc(100% - 16rem)',
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        isCollapsed={isSidebarCollapsed}
        toggleCollapse={toggleSidebar}
      />
      
      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col overflow-hidden" style={mainContentStyle}>
        {/* Header */}
        <Header onToggleSidebar={toggleSidebar} />
        
        {/* Conteúdo */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {msgSuccess && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
              {msgSuccess}
            </div>
          )}
          {msgInfo && (
            <div className="mb-6 p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded">
              {msgInfo}
            </div>
          )}
          {msgError && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {msgError}
            </div>
          )}
          
          <ErrorBoundary>
            <Outlet/>
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
}
