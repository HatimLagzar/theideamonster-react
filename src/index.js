import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {Provider as ReduxProvider} from 'react-redux';
import App from './components/App';
import store from './store/store';
import registerServiceWorker from './registerServiceWorker';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ReduxProvider store={store}>
      <App/>
    </ReduxProvider>
  </BrowserRouter>
);

registerServiceWorker();
