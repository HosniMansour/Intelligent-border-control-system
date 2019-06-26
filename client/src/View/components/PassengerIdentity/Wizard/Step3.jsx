import React, { Component } from 'react';
import {Grid, Row, Col, Image, Alert} from 'react-bootstrap';
import SweetAlert from 'react-bootstrap-sweetalert';

import Card from '../../../components/Template/Card/Card';
import FormInputs from '../../../components/Template/FormInputs/FormInputs';
import Button from '../../../elements/CustomButton/CustomButton.jsx';


class Verify extends Component{

    constructor(props){
        super(props);
        this.state = {
            pic1preview: "",
            pic2preview: ""
        };


        let reader = new FileReader();
        let file = this.props.pic.pic1;

        reader.readAsDataURL(file);

        reader.onloadend = () => {
            this.setState({
                pic1preview: reader.result
            });
        }

        let reader2 = new FileReader();
        let file2 = this.props.pic.pic2;

        reader2.readAsDataURL(file2);

        reader2.onloadend = () => {
            this.setState({
                pic2preview: reader2.result
            });
        }

    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render(){
        return (
            <div className="wizard-step">
                <h2 className="text-center text-space">
                    You uploaded the following images:
                    <br /><br />
                    <Grid fluid>
                        <Row>
                            <Col md={6}>
                                <div style={{textAlign: 'center'}}>
                                    <Image width={300} src={this.state.pic1preview} rounded />
                                </div>
                            </Col>
                            <Col md={6}>
                                <div style={{textAlign: 'center'}}>
                                    <Image width={300} src={this.state.pic2preview} rounded />
                                </div>
                            </Col>
                        </Row>
                    </Grid>
                </h2>
                <div className="wizard-finish-button">
                    <Button bsStyle="info" onClick={this.props.onvalid}  fill wd pullRight>Confirm</Button>
                </div>
                <div className="wizard-step">
                    <a href="/passenger-identity">
                        <Button>Reset</Button>
                    </a>
                </div>
            </div>
        );
    }

}

class Result extends Component{

    constructor(props){
        super(props);
        this.state = {
            pic1preview: "",
            pic2preview: "",
            button: ""
        };


        let reader = new FileReader();
        let file = this.props.pic1;


        reader.readAsDataURL(file);

        reader.onloadend = () => {
            this.setState({
                pic1preview: reader.result
            });
        }

        let reader2 = new FileReader();
        let file2 = this.props.pic2;

        reader2.readAsDataURL(file2);

        reader2.onloadend = () => {
            this.setState({
                pic2preview: reader2.result
            });
        }
    }

    componentDidMount() {
        this.props.sub();
        window.scrollTo(0, 0);
    }

    render() {
        let name = this.props.info.names;
        if(name===undefined)
            name="";
        return (
            <div className="wizard-step">
                <div className="main-content">
                    <Grid fluid>
                        <Row>
                            <Col md={4}>
                                <Card content={
                                    <div style={{textAlign: "center"}}>
                                        {this.props.wanted}
                                        <br/>
                                        <Image width={200} src={this.state.pic2preview} rounded></Image>
                                        <br/>
                                        <br/>
                                        {this.props.res}
                                        <br/>
                                        <br/>
                                        <Image width={200} src={this.state.pic1preview} rounded/>
                                    </div>
                                } />
                            </Col>

                            <Col md={8}>
                                <a href="/passenger-identity">
                                    <Button pullRight>Reset</Button>
                                </a>
                                <br/><br/><br/>
                                {this.props.error2}
                                {this.props.error1}
                                <Card
                                    title=""
                                    content={
                                        <form>
                                            <FormInputs
                                                ncols = {["col-md-6" , "col-md-6" ]}
                                                proprieties = {[
                                                    {
                                                        label : "Name",
                                                        type : "text",
                                                        bsClass : "form-control",
                                                        defaultValue : name.split('  ')[0],
                                                        disabled : true
                                                    },
                                                    {
                                                        label : "Surname",
                                                        type : "text",
                                                        bsClass : "form-control",
                                                        defaultValue : this.props.info.surname,
                                                        disabled : true
                                                    },
                                                ]}
                                            />
                                            <FormInputs
                                                ncols = {["col-md-4" , "col-md-4" , "col-md-4"]}
                                                proprieties = {[
                                                    {
                                                        label : "Passport number",
                                                        type : "text",
                                                        bsClass : "form-control",
                                                        defaultValue : this.props.info.number,
                                                        disabled : true
                                                    },
                                                    {
                                                        label : "Issuing country",
                                                        type : "text",
                                                        bsClass : "form-control",
                                                        defaultValue : this.props.info.country,
                                                        disabled : true
                                                    },
                                                    {
                                                        label : "Nationality",
                                                        type : "text",
                                                        bsClass : "form-control",
                                                        defaultValue : this.props.info.nationality,
                                                        disabled : true
                                                    },
                                                ]}
                                            />
                                            <FormInputs
                                                ncols = {["col-md-6" , "col-md-6"]}
                                                proprieties = {[
                                                    {
                                                        label : "Sex",
                                                        type : "text",
                                                        bsClass : "form-control",
                                                        defaultValue : this.props.info.sex,
                                                        disabled : true
                                                    },
                                                    {
                                                        label : "Date of birth",
                                                        type : "text",
                                                        bsClass : "form-control",
                                                        defaultValue : this.props.info.date_of_birth,
                                                        disabled : true
                                                    }
                                                ]}
                                            />

                                            <FormInputs
                                                ncols = {["col-md-6","col-md-6"]}
                                                proprieties = {[
                                                    {
                                                        label : "Expiration date of passport",
                                                        type : "text",
                                                        bsClass : "form-control",
                                                        defaultValue : this.props.info.expiration_date,
                                                        disabled : true
                                                    },
                                                    {
                                                        label : "Personal number",
                                                        type : "text",
                                                        bsClass : "form-control",
                                                        defaultValue : this.props.info.personal_number,
                                                        disabled : true
                                                    }
                                                ]}

                                            />
                                            <div className="clearfix"></div>
                                        </form>
                                    }
                                />
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </div>
        );
    }
}


class Step3 extends Component{

    constructor(props){
        super(props);
        this.state = {
            page:0,
            pic1preview:'',
            pic2preview:'',
            alert: (
                <SweetAlert
                    success
                    style={{display: "block",marginTop: "-100px"}}
                    title="Please wait!"
                    onConfirm={() => this.hideAlert()}
                    showConfirm={false}
                >Please wait! ...</SweetAlert>
            ),
            show: true,
            button: null,
            wanted: <div><br/><Button>Loading</Button></div>,
            info: {
                name:"",
                iss_country:"",
                passport_num:"",
                nationality:"",
                birthday:"",
                sex:"",
                expires:"",
                personal:""
            },
            err1:null,
            err2:null
        }

        this.hideAlert = this.hideAlert.bind(this);
        this.onvalid = this.onvalid.bind(this);
        this.submit = this.submit.bind(this);
    }

    onvalid(){
        this.setState({
                page: 1
            });
    }

    submit(){
        let passengerPhoto = this.props.pics.pic1;
        let passengerPassport = this.props.pics.pic2;
        this.props.SubmitCheck(passengerPhoto, passengerPassport);
        //this.props.CheckWanted(passengerPhoto);
    }

    hideAlert(){
        this.setState({
            alert: null,
            show: true,
        });
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.res===1){
            // Hide Loading
            this.hideAlert();

            // Image Match After Getting the Data

            if(nextProps.data.image.match==="-1"){
                this.setState({
                    err2: <Alert bsStyle="warning"><span>It's not safe for traveler to pass!</span></Alert>,
                    err1:<Alert bsStyle="warning"><span><b> Passenger </b> image is not clear !</span></Alert>,
                    button: <Button>Image is not clear</Button>,
                })
            }else if(nextProps.data.image.match==="1"){
                this.setState({
                    button: <div>
                        <Button bsStyle="info" >Match</Button> {/*<Button bsStyle="default" >{ parseFloat(nextProps.data.image.accuracy).toFixed(2) } %</Button>*/}
                    </div>

                });
            }else{
                this.setState({
                    err2: <Alert bsStyle="danger"><span>It's not safe for traveler to pass!</span></Alert>,
                    button: <div>
                        <Button bsStyle="danger" >Does not match !</Button> {/*<Button bsStyle="default" >{ parseFloat(nextProps.data.image.accuracy).toFixed(2) } %</Button>*/}
                    </div>
                });
            }

            // Get OCR

            if(nextProps.data.passport.mrz_type===""){
                this.setState({
                    err2: <Alert bsStyle="warning"><span><b> Passport </b> image is not clear !</span></Alert>,
                })
            }else{
                this.setState({
                    info: nextProps.data.passport
                });
            }


             // Get Wanted

            if(nextProps.data.wanted===1){
                this.setState({
                    err2: <Alert bsStyle="danger"><span>It's not safe for traveler to pass!</span></Alert>,
                    wanted:<Alert bsStyle="danger"><span> Wanted !!</span></Alert>
                })
            }else if(nextProps.data.wanted===0){
                this.setState({
                    wanted:<Alert bsStyle="info"><span> Safe </span></Alert>
                })
            }else{
                this.setState({
                    wanted:<div><Button>Unknown</Button><br/></div>
                })
            }

        }

    }

    render(){

        if(this.state.page===0){
            return (
               <div>
                   <Verify pic={this.props.pics} onvalid={this.onvalid} />
               </div>
            );
        }else{
            return (
                <div>
                    {this.state.alert}
                    <Result wanted={this.state.wanted} error1={this.state.err1} error2={this.state.err2} res={this.state.button} info={this.state.info} sub={this.submit} pic1={this.props.pics.pic1} pic2={this.props.pics.pic2}/>
                </div>
            );
        }

    }
}

export default Step3;

