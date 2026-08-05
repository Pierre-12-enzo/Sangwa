// frontend/src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: '#3B6B66',
          color: '#fff',
          padding: '16px',
          borderRadius: '12px',
        },
        success: {
          iconTheme: {
            primary: '#1E6B43',
            secondary: '#fff',
          },
        },
      }}
    />
  </React.StrictMode>
);

// Once React has rendered, fade out and remove the static preloader.
// We use a microtask + a small timeout so the fade is visible even on
// instant mounts (avoids the loader popping away without animation).
const preloader = document.getElementById('app-preloader');
if (preloader) {
  // Yield once so the first paint of <App /> is committed first.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      preloader.classList.add('is-hiding');
      preloader.addEventListener(
        'transitionend',
        () => preloader.remove(),
        { once: true }
      );
      // Safety net: remove even if transitionend never fires.
      setTimeout(() => preloader.remove(), 800);
    });
  });
}