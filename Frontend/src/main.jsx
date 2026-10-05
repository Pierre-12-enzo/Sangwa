// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import App from './App.jsx';
import './index.css';
import { I18nProvider } from './i18n/I18nProvider.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { QueryProvider } from './context/QueryProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <I18nProvider>
        <QueryProvider>
          <AuthProvider>
            <App />
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: '#3B6B66',
                  color: '#fff',
                  padding: '16px',
                  borderRadius: '12px'
                },
                success: {
                  iconTheme: { primary: '#1E6B43', secondary: '#fff' }
                }
              }}
            />
          </AuthProvider>
        </QueryProvider>
      </I18nProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// Preloader logic (unchanged)
const preloader = document.getElementById('app-preloader');
if (preloader) {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      preloader.classList.add('is-hiding');
      preloader.addEventListener(
        'transitionend',
        () => preloader.remove(),
        { once: true }
      );
      setTimeout(() => preloader.remove(), 800);
    });
  });
}