import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Routers from './router';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store';
import './index.css';

const store = configureStore();

ReactDOM.render((
    <Provider store={store}>
        <Routers />
    </Provider>
), document.getElementById('root'));
registerServiceWorker();
