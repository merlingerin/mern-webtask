import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import AppContainer from './AppContainer';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<AppContainer />, document.getElementById('root'));
registerServiceWorker();
