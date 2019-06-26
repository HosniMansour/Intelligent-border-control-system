import React, { Component } from "react";
import { Grid, Col, Row } from 'react-bootstrap';
import ChartistGraph from 'react-chartist';
import {connect} from "react-redux";
import {getStats} from '../../../actions';
import Card from '../Template/Card/Card';
import StatsCard from '../Template/Card/StatsCard.jsx';

class Dashboard extends Component {

    constructor(props){
        super(props);
        this.state = {
            agents:"0",
            wanted:"0",
            checkouts:"0",
            labels:[],
            series: [],
        };

    }

    componentDidMount() {
        this.props.getStats();
    }
    componentWillReceiveProps(nextProps, nextContext) {
        let l=[],s=[];
        let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        nextProps.data.last.reverse().forEach(function(entry) {
            let d = new Date(entry["timestamp"]).getDay();
            l.push(days[d]);
            s.push(entry["created_count"]);
        });
        this.setState({
            agents:nextProps.data.agents,
            wanted:nextProps.data.wanted,
            checkouts:nextProps.data.checkouts,
            labels:l,
            series: s
        })
    }

    render(){

        let dataSales = {
            labels: this.state.labels,
            series: [
                this.state.series
            ]
        };

        let optionsSales = {
            low: 0,
            high: 50,
            showArea: false,
            height: "300px",
            axisX: {
                showGrid: false,
            },
            lineSmooth: true,
            showLine: true,
            showPoint: true,
            fullWidth: true,
            chartPadding: {
                right: 50
            }
        };

        let responsiveSales = [
            ['screen and (max-width: 640px)', {
                axisX: {
                    labelInterpolationFnc: function (value) {
                        return value[0];
                    }
                }
            }]
        ];


        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col lg={4} sm={6}>
                            <StatsCard
                                bigIcon={<i className="pe-7s-user text-warning"></i>}
                                statsText="Agents"
                                statsValue={this.state.agents}
                            />
                        </Col>
                        <Col lg={4} sm={6}>
                            <StatsCard
                                bigIcon={<i className="pe-7s-graph1 text-success"></i>}
                                statsText="Checkouts"
                                statsValue={this.state.checkouts}
                            />
                        </Col>
                        <Col lg={4} sm={6}>
                            <StatsCard
                                bigIcon={<i className="pe-7s-users text-danger"></i>}
                                statsText="Wanted fugitives"
                                statsValue={this.state.wanted}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col md={12}>
                            <Card
                                title="Last 7 days checkout"
                                content={
                                    <ChartistGraph
                                        data={dataSales}
                                        type="Line"
                                        options={optionsSales}
                                        responsiveOptions={responsiveSales}/>
                                }

                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        data:state.sts.data
    };
}


export default connect(mapStateToProps, {getStats})(Dashboard);