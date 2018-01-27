import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LoginContainer from './login_container';
import Header from './Header';
import thunkMiddleware from 'redux-thunk'
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import loginReducer from './reducer'
import Axios from 'axios'

const reducer = combineReducers({
	login: loginReducer,
});

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

Axios.defaults.baseURL = 'http://localhost:8000';
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const Root = ({ store }) => (
	<Provider store={store}>
		<LoginContainer />
	</Provider>
);

ReactDOM.render(<Header />, document.getElementById('header'));
ReactDOM.render(<Root store={store} />, document.getElementById('loginForm'));
registerServiceWorker();
