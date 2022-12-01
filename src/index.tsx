import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {HashRouter} from "react-router-dom";
import App1 from "./App1";
import {store} from "./api/store";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <HashRouter>
        <Provider store={store}>
            <App1/>
        </Provider>
    </HashRouter>
);

reportWebVitals();
