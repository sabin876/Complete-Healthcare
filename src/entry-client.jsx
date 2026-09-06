import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App.jsx';
import { SSRDataProvider } from './context/SSRDataContext.jsx';
import './index.css';

const container = document.getElementById('root');
const initialData = (typeof window !== 'undefined' && window.__INITIAL_DATA__) ? window.__INITIAL_DATA__ : null;

const app = (
  <React.StrictMode>
    <SSRDataProvider initialData={initialData}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SSRDataProvider>
  </React.StrictMode>
);

const isSSR = container && container.innerHTML.trim() !== '' && !container.innerHTML.includes('<!--ssr-outlet-->');

if (isSSR) {
  hydrateRoot(container, app);
} else if (container) {
  createRoot(container).render(app);
}
