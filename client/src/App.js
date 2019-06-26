import React, { Component } from "react";

import {Switch, Route} from 'react-router-dom';
import appRoutes from './routes/app';

class App extends Component {
    componentDidUpdate(e){
        if(window.innerWidth < 993 && e.history.action === "PUSH" && document.documentElement.className.indexOf('nav-open') !== -1){
            document.documentElement.classList.toggle('nav-open');
        }
    }

    render() {
    return (
        <Switch>
            {
                appRoutes.map((prop,key) => {
                    return (
                        <Route path={prop.path} component={prop.component} key={key} />
                    );
                })
            }
        </Switch>
    );
    }
}

export default App;