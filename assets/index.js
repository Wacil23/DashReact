
import React from 'react'
import ReactDOM from "react-dom/client";
import App from './app';
import { registerLicense } from '@syncfusion/ej2-base';
import { ContextProvider } from './contexts/ContextProvider';
import './styles/index.css'
import Connexion from './connexion';
registerLicense('ORg4AjUWIQA/Gnt2VVhiQlFadVlJXmJWf1FpTGpQdk5yd19DaVZUTX1dQl9hSXlTckVmXHtfcHNVRGM=');

const rootElement = ReactDOM.createRoot(document.querySelector('#app'));
rootElement.render(
  <React.StrictMode>
    <ContextProvider>
      <Connexion />
    </ContextProvider>
  </React.StrictMode >
);