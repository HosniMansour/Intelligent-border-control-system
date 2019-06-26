import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Sidebar from '../../components/Template/Sidebar/Sidebar.jsx';
import Header from '../../components/Template/Header/Header.jsx';
import dashRoutes from '../../../routes/dash';

class Dash extends Component{

    constructor(props){
        super(props);
        this.mainPanel = React.createRef();
    }
    componentDidMount(){
    }

    componentDidUpdate(e){
        window.scrollTo(0, this.mainPanel.current.offsetTop);
    }
    componentWillMount(){
        if(document.documentElement.className.indexOf('nav-open') !== -1){
            document.documentElement.classList.toggle('nav-open');
        }
    }
    render(){
        return (
            <div className="wrapper">
                <Sidebar {...this.props} />
                <div className={"main-panel"+(this.props.location.pathname === "/maps/full-screen-maps" ? " main-panel-maps":"")} ref={this.mainPanel}>
                    <Header {...this.props}/>
                    <Switch>
                        {
                            dashRoutes.map((prop,key) => {
                                if(prop.collapse){
                                    return prop.views.map((prop,key) => {
                                        if(prop.name === "Notifications"){
                                            return (
                                                <Route
                                                    path={prop.path}
                                                    key={key}
                                                    render={routeProps =>
                                                        <prop.component
                                                            {...routeProps}
                                                            handleClick={this.handleNotificationClick}
                                                        />}
                                                />
                                            );
                                        } else {
                                            return (
                                                <Route path={prop.path} component={prop.component} key={key}/>
                                            );
                                        }
                                    })
                                } else {
                                    if(prop.redirect)
                                        return (
                                            <Redirect to="passenger-identity" key={key}/>
                                        );
                                    else
                                        return (
                                            <Route path={prop.path} component={prop.component} key={key}/>
                                        );
                                }
                            })
                        }
                    </Switch>
                </div>
            </div>
        );
    }
}

export default Dash;
