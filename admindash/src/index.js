import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store'
import './index.css';
import App from './App';
import { ContextProvider } from './contexts/ContextProvider';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <Provider store={store}>
     <ContextProvider>
     <BrowserRouter>
      <App />
      </BrowserRouter>
    </ContextProvider>
    </Provider>
  </React.StrictMode>
);


