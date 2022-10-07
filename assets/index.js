
import React from 'react'
import ReactDOM from "react-dom/client";
import App from './app';
import { ContextProvider } from './contexts/ContextProvider';
import './styles/index.css'

const rootElement = ReactDOM.createRoot(document.querySelector('#app'));
rootElement.render(
  <React.StrictMode>
    <ContextProvider>
        <App />
    </ContextProvider>
  </React.StrictMode >
);