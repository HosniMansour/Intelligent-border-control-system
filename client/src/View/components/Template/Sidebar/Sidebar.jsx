import React, { Component } from 'react';
import { Collapse } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import {logout,lockscreen} from "../../../../actions/AuthActions";
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';

import * as Ps from 'perfect-scrollbar';
import 'perfect-scrollbar/dist/css/perfect-scrollbar.min.css';

import HeaderLinks from '../Header/HeaderLinks.jsx';

import dashRoutes from '../../../../routes/dash';

let user;
let img = "",Name="",LastName="";

class Sidebar extends Component{
    constructor(props){
        super(props);
        user = user = JSON.parse(localStorage.getItem('user'));
        if(user!==null){
            img = "http://127.0.0.1:8000/"+user.photo;
            Name = user.Name;
            LastName = user.LastName;
        }else{
            this.props.history.push('/login');
        }
        this.state = {
            openAvatar: false,
            width: window.innerWidth
        };
    }

    logout(e) {
        e.preventDefault();
        this.props.logout();
        this.props.history.push('/login')
    }

    lockscreen(e) {
        e.preventDefault();
        this.props.lockscreen();
        this.props.history.push('/lock-screen')
    }

    activeRoute(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? 'active' : '';
    }

    updateDimensions(){
        this.setState({width:window.innerWidth});
    }

    componentDidMount() {
        this.updateDimensions();
        // add event listener for windows resize
        window.addEventListener("resize", this.updateDimensions.bind(this));
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            Ps.initialize(this.refs.sidebarWrapper, { wheelSpeed: 2, suppressScrollX: true });
        }
    }
    componentDidUpdate(){
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            setTimeout(() => { Ps.update(this.refs.sidebarWrapper) }, 350);
        }
    }
    isMac(){
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }

    render(){
        return (
            <div className="sidebar" data-color="black" >
                <div className="sidebar-background" > </div>
                <div className="logo">
                	<a href="#/" className="simple-text logo-mini">
                        <div className="logo-img">
                            <i className="pe-7s-graph3 text-success"></i>
                        </div>
                	</a>
                	<a href="#/"className="simple-text logo-normal">
                        IBC System
                    </a>
                </div>
                <div className="sidebar-wrapper" ref="sidebarWrapper">
                    <div className="user">
                        <br/>
                        <div className="photo">
                            <img src={img} alt="Avatar"/>
                        </div>
                        <div className="info">
                            <a href="#/">
                                <span>
                                    Hi,
                                    <br/>
                                    <strong>{Name} {LastName}</strong>
                                </span>
                            </a>
                        </div>
                    </div>

                    <ul className="nav">
                        <br/>
                        { this.state.width <= 992 ? (<HeaderLinks />):null }
                        {
                            dashRoutes.map((prop,key) => {
                                var st = {};
                                st[prop["state"]] = !this.state[prop.state];
                                if(prop.collapse){
                                    return (
                                        <li className={this.activeRoute(prop.path)} key={key}>
                                            <a href="#/" onClick={ ()=> this.setState(st)}>
                                                <i className={prop.icon}></i>
                                                <p>{prop.name}
                                                   <b className={this.state[prop.state] ? "caret rotate-180":"caret"}></b>
                                                </p>
                                            </a>
                                            <Collapse in={this.state[prop.state]}>
                                                <ul className="nav">
                                                    {
                                                        prop.views.map((prop,key) => {
                                                            return (
                                                                <li className={this.activeRoute(prop.path)} key={key}>
                                                                    <NavLink to={prop.path} className="nav-link" activeClassName="active">
                                                                        <span className="sidebar-mini">{prop.mini}</span>
                                                                        <span className="sidebar-normal">{prop.name}</span>
                                                                    </NavLink>
                                                                </li>
                                                            );
                                                        })
                                                    }
                                                </ul>
                                            </Collapse>
                                        </li>
                                    )
                                } else {
                                    if(prop.redirect){
                                        return null;
                                    }
                                    else{
                                        return (
                                            <li className={this.activeRoute(prop.path)} key={key}>
                                                <NavLink to={prop.path} className="nav-link" activeClassName="active">
                                                    <i className={prop.icon}></i>
                                                    <p>{prop.name}</p>
                                                </NavLink>
                                            </li>
                                        );
                                    }
                                }
                            })
                        }
                        <li className=""><a onClick={this.lockscreen.bind(this)} className="nav-link" href="#/lock-screen"><i className="pe-7s-attention"></i><p>Lock Screen</p></a></li>
                        <li className=""><a onClick={this.logout.bind(this)} className="nav-link" href="#/logout"><i className="pe-7s-unlock"></i><p>Logout</p></a></li>
                    </ul>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps, { logout,lockscreen })(withRouter(Sidebar));