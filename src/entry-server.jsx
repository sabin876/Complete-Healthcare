import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from './App.jsx';
import { SSRDataProvider } from './context/SSRDataContext.jsx';

export function render(url, initialData = null) {
  const html = renderToString(
    <React.StrictMode>
      <SSRDataProvider initialData={initialData}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </SSRDataProvider>
    </React.StrictMode>
  );
  return { html, initialData };
}
