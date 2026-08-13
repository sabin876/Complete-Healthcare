import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

const container = document.getElementById('root');
const app = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

const isSSR = container && container.innerHTML.trim() !== '' && !container.innerHTML.includes('<!--ssr-outlet-->');

if (isSSR) {
  hydrateRoot(container, app);
} else if (container) {
  createRoot(container).render(app);
}

