import React, { Component } from 'react';
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl, Alert } from 'react-bootstrap';

import { loginUser } from "../../../actions/AuthActions";
import {connect} from "react-redux";

import Card from '../../components/Template/Card/Card.jsx';
import Button from '../../elements/CustomButton/CustomButton.jsx';
import Checkbox from '../../elements/CustomCheckbox/CustomCheckbox.jsx';


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

class LoginPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            cardHidden: true,
            username: "",
            password: ""
        };
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

    componentDidMount(){
        setTimeout(function() { this.setState({cardHidden: false}); }.bind(this), 300);
    }

    render(){
        return (
            <Grid>
                <Row>
                    <Col md={4} sm={6} mdOffset={4} smOffset={3}>
                        <form onSubmit={this.onSubmit}>
                            <Card
                                hidden={this.state.cardHidden}
                                textCenter
                                title="Login"
                                content={
                                    <div>
                                        <Error val={this.props.error} />
                                        <FormGroup>
                                            <ControlLabel>
                                                Email address
                                            </ControlLabel>
                                            <FormControl
                                                placeholder="Username"
                                                type="text"
                                                name = "username"
                                                value={this.state.username}
                                                onChange={this.onChange}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <ControlLabel>
                                                Password
                                            </ControlLabel>
                                            <FormControl
                                                placeholder="Password"
                                                type ="password"
                                                name = "password"
                                                value={this.state.password}
                                                onChange={this.onChange}
                                            />
                                        </FormGroup>
                                        <div style={{float: 'right'}}>
                                            <FormGroup>
                                                <Checkbox
                                                    number="1"
                                                    label="Remember Me"
                                                />
                                            </FormGroup>
                                        </div>
                                        <br/><br/>
                                    </div>
                                }
                                legend={
                                    <Button type="submit" bsStyle="info" fill wd>
                                        Login
                                    </Button>
                                }
                                ftTextCenter
                            />
                        </form>
                    </Col>
                </Row>
            </Grid>
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
export default connect(mapStateToProps,{loginUser}) (LoginPage);