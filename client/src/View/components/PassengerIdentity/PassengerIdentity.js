import React, { Component } from "react";
import {Col, Grid, Row} from "react-bootstrap";
import StepZilla from 'react-stepzilla';

import Card from '../../components/Template/Card/Card';

import Step1 from './Wizard/Step1.jsx';
import Step2 from './Wizard/Step2.jsx';
import Step3 from './Wizard/Step3.jsx';
import {connect} from "react-redux";

import {loadPassengerPic, loadPassengerPassport, SubmitCheck} from "../../../actions";


class PassengerIdentity extends Component {

    render(){

        const steps = [
            { name: 'Step 1', component: <Step1 {...this.props} />},
            { name: 'Step 2', component: <Step2 {...this.props} />},
            { name: 'Result', component: <Step3 {...this.props} />}
        ];

        return (
            <div className="main-content" >
                <Grid fluid>
                    <Row>
                        <Col md={10} mdOffset={1}>
                            <Card
                                wizard
                                id="wizardCard"
                                textCenter
                                title="Verify passenger identity"
                                content={
                                    <StepZilla
                                        steps={steps}
                                        stepsNavigation={false}
                                        nextButtonCls="btn btn-prev btn-info btn-fill pull-right btn-wd"
                                        backButtonCls="btn btn-next btn-default btn-fill pull-left btn-wd"
                                        prevBtnOnLastStep={false}
                                    />
                                }
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        pics: state.ide,
        data: state.ide.data,
        res: state.ide.res
    };
};

export default connect(mapStateToProps,{loadPassengerPic, loadPassengerPassport, SubmitCheck}) (PassengerIdentity);