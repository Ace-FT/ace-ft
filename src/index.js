import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AceProvider } from './context/context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <AceProvider>
      <App />
    </AceProvider>
  </>
);