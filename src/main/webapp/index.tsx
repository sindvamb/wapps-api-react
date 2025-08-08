import React from 'react';
import ReactDOM from 'react-dom/client';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import axios from 'axios';
import translation from './translation.en.json';
import translationPt from './translation.json';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import App from "./app/app";

i18n
  .use(initReactI18next)
  .init({
    resources: {
        en: { translation: translation },
        pt: { translation: translationPt },
    },
    lng: 'pt',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

axios.defaults.baseURL = process.env.API_PATH;

const root = document.getElementById('root')!!;
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
