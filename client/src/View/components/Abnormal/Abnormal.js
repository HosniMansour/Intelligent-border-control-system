import React, { Component } from "react";
import {ControlLabel, FormControl, FormGroup, Grid, Row} from 'react-bootstrap';
import Card from '../../components/Template/Card/Card';
import {connect} from "react-redux";
import axios from "axios";
import {URL} from "../../../actions/types";
import setAuthorizationToken from "../../../utils/setAuthToken";

class Abnormal extends Component {

    constructor(props){
        super(props);
        this.state = {
            params:"",
            disabled:false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e){
        e.preventDefault();
        let token = localStorage.getItem("user_token");
        setAuthorizationToken(token);
        axios.post(URL + "abnormal/", {params:this.state.params})
            .then((response)=> {
                console.log("Abnormal Started")
                this.setState({
                    disabled:true
                })
            })
            .catch((err)=>{
                console.log("Error")
            });
    }

    render() {
        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Card
                            title="Abnormal behaviour detection"
                            category=""
                            ctTableFullWidth
                            ctTableResponsive
                            content={
                                <form onSubmit={this.onSubmit}>
                                    <ControlLabel>Starting the abnormal behaviour detection system may take a while (10 seconds). You can change the sensitivity of an abnormal event by changing the parameter bellow, by default we set the parameter to 0.0005 for the Avenue dataset. </ControlLabel>
                                    <br/><br/>
                                    <FormGroup>
                                        <br/>
                                        <FormControl
                                            type="text"
                                            placeholder="Trashhold for Avenue dataset 0.0005"
                                            name = "params"
                                            value={this.state.params}
                                            onChange={this.onChange}/>
                                    </FormGroup>
                                    <br/><br/>
                                    <button className="btn btn-info btn-fill btn-wd pull-right" disabled={this.state.disabled}>Start Abnormal system</button>
                                    <br/><br/>
                                </form>
                            }
                        ></Card>

                    </Row>
                </Grid>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}


export default connect(mapStateToProps, null)(Abnormal);