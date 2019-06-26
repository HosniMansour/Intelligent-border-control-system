import React, { Component } from 'react';
import {Nav, NavDropdown, MenuItem,} from 'react-bootstrap';
import {lockscreen, logout} from "../../../../actions/AuthActions";
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';

class HeaderLinks extends Component{

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

    render(){
        return(
            <div>
                <Nav pullRight>
                    <NavDropdown
                        eventKey={4}
                        title={(
                            <div>
                                <i className="fa fa-list"></i>
                                <p className="hidden-md hidden-lg">
                                    More
                                    <b className="caret"></b>
                                </p>
                            </div>
                        )} noCaret id="basic-nav-dropdown-3" bsClass="dropdown-with-icons dropdown">
                        <MenuItem eventKey={4.4}><div onClick={this.lockscreen.bind(this)} ><i className="pe-7s-lock"></i> Lock Screen</div></MenuItem>
                        <MenuItem eventKey={4.5}><div className="text-danger" onClick={this.logout.bind(this)}><i className="pe-7s-close-circle"></i> Log out</div></MenuItem>
                    </NavDropdown>
                </Nav>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps, { logout,lockscreen })(withRouter(HeaderLinks));
