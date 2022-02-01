import React from 'react';
import ReactDOM from 'react-dom';
import "normalize.css";
import { InjectableProvider } from "@dogonis/react-injectable";

import App from './App';
import "./index.scss";
import { DataService } from './services/data.service';
import { StorageService } from './services/storage.service';

ReactDOM.render(
  <React.StrictMode>
    <InjectableProvider inject={[DataService, StorageService]}>
      <App />
    </InjectableProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
