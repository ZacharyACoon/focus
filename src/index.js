import React from 'react';
import ReactDOM from 'react-dom';
import { default as App } from "./focus/focus";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.register();
