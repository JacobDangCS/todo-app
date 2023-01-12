import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import SettingsProvider from './context/Settings/Settings';
import { MantineProvider } from '@mantine/core';
import AuthProvider from './context/Auth/Auth';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles with NormalizeCSS>
      <AuthProvider>
        <SettingsProvider>
          <App />
        </SettingsProvider>
      </AuthProvider>
    </MantineProvider>
  </React.StrictMode >
);
