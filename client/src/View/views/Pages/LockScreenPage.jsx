import React, { Component } from 'react';
import {FormGroup, FormControl, Alert} from 'react-bootstrap';

import { loginUser } from "../../../actions/AuthActions";
import {connect} from "react-redux";

import Button from '../../elements/CustomButton/CustomButton.jsx';

let user;
let img = "",Name="",LastName="";

const Error = (props) => {
    if(props.val){
        return(
            <Alert bsStyle="warning">
                <span> {props.val} </span>
            </Alert>
        );
    }
    return <div></div>;
};

class LockScreenPage extends Component{

    constructor(props){
        super(props);

        user = user = JSON.parse(localStorage.getItem('user'));
        if(user!==null){
            img = "http://127.0.0.1:8000/"+user.photo;
            Name = user.Name;
            LastName = user.LastName;
            this.state = {
                cardHidden: true,
                username: user.username,
                password: ""
            };
        }else{
            this.state = {
                cardHidden: true,
                username: "",
                password: ""
            };
            this.props.history.push('/login');
        }


        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e){
        e.preventDefault();
        const {username, password} = this.state;
        this.props.loginUser({username, password});
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.isAuthenticated){
            this.props.history.push("/");
        }
    }


    render(){
        return (
            <form onSubmit={this.onSubmit} className="ng-untouched ng-pristine ng-valid">
                <div className="user-profile">
                    <div className="author">
                        <img alt="..." className="avatar" src={img} />
                    </div>
                    <h4>{Name} {LastName}</h4>
                    <FormGroup>
                        <Error val={this.props.error} />
                        <br/>
                        <FormControl
                            type="password"
                            placeholder="Enter Password"
                            name = "password"
                            value={this.state.password}
                            onChange={this.onChange}/>
                    </FormGroup>
                    <Button type="submit" bsStyle="info" fill wd>
                        Login
                    </Button>
                </div>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        error: state.auth.error,
        loading:state.auth.loading,
        user:state.auth.user
    };
};
export default connect(mapStateToProps,{loginUser}) (LockScreenPage);