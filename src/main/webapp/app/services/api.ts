
import axios from 'axios';

// Configuração base do Axios
const api = axios.create({
  baseURL: process.env.API_PATH || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // Importante para enviar cookies de autenticação
});

// Interceptor para adicionar o token de autenticação se existir
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros comuns
type ErrorResponse = {
  response?: {
    status: number;
    data: {
      message?: string;
      error?: string;
    };
  };
};

api.interceptors.response.use(
  (response) => response,
  (error: ErrorResponse) => {
    if (error.response) {
      // Tratamento de erros comuns
      switch (error.response.status) {
        case 401:
          // Redirecionar para login se não autenticado
          if (window.location.pathname !== '/login') {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
          break;
        case 403:
          // Acesso negado
          console.error('Acesso negado: Você não tem permissão para acessar este recurso');
          break;
        case 500:
          // Erro interno do servidor
          console.error('Erro interno do servidor. Por favor, tente novamente mais tarde.');
          break;
        default:
          console.error('Ocorreu um erro inesperado. Por favor, tente novamente.');
      }
    } else {
      console.error('Erro de conexão. Verifique sua conexão com a internet.');
    }
    return Promise.reject(error);
  }
);

export default api;
