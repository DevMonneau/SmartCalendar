import React from 'react';
import ReactDOM from 'react-dom';
import Connection from './Component/Connection';
import Pres from './Component/Pres';
import Register from './Component/Register'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Connection />, document.getElementById('connection'));
ReactDOM.render(<Pres />, document.getElementById('pres'));
ReactDOM.render(<Register />, document.getElementById('register'));
registerServiceWorker();
