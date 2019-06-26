import React from 'react';
import ReactDOM from 'react-dom';

import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunk from 'redux-thunk'
import persistedReducer from "./reducers";
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import { HashRouter, Route, Switch } from 'react-router-dom';
import indexRoutes from "./routes";

import './View/assets/css/bootstrap.min.css';
import './View/assets/sass/light-bootstrap-dashboard.css';
import './View/assets/css/demo.css';
import './View/assets/css/style.css';
import './View/assets/css/pe-icon-7-stroke.css';

let store = createStore(persistedReducer,applyMiddleware(thunk));
let persistor = persistStore(store);

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <HashRouter>
                <Switch>
                    {
                        indexRoutes.map((prop,key) => {
                            return (
                                <Route path={prop.path} component={prop.component}  key={key}/>
                            );
                        })
                    }
                </Switch>
            </HashRouter>
        </PersistGate>
    </Provider>
    ,
    document.getElementById("root")
);