import React, { Component } from 'react';
import { Grid, Row, Col, Table } from 'react-bootstrap';
import Card from '../../components/Template/Card/Card';
import Checkbox from '../../elements/CustomCheckbox/CustomCheckbox.jsx';
import ModalImage from 'react-modal-image';
import Moment from 'moment';
import Pagination from "react-js-pagination";
import {connect} from "react-redux";
import {getHistory} from '../../../actions';
import 'perfect-scrollbar/dist/css/perfect-scrollbar.min.css';


class History extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      count:0,
      data:[]
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }


  handlePageChange(pageNumber) {
    this.setState({activePage: pageNumber});
    this.props.getHistory(pageNumber);
  }

  componentWillMount() {
    this.setState({
      activePage:this.state.activePage,
      data:[]
    });
    this.props.getHistory(this.state.activePage);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      data:nextProps.data.results,
      count:nextProps.data.count,
    })
  }


  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
            <br/>
            <br/>
              <Card
                title="Passenger History"
                category=""
                ctTableFullWidth
                ctTableResponsive
                content={
                  <div>
                    <Table striped hover>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Birthday</th>
                          <th>Nationality</th>
                          <th>Gender</th>
                          <th>Boarded</th>
                          <th>Checked at</th>
                          <th>Photos</th>
                        </tr>
                      </thead>
                      <tbody>
                      {this.state.data.map(passenger=>
                        <tr className={(passenger.ableToBoard ? '' : 'danger')} key={passenger.id}>
                            <td>{passenger.firstName.replace("SKSKKKKKK", "").split(' ')[0]} {passenger.lastName}</td>
                            <td>{passenger.birthDate}</td>
                            <td>{passenger.nationality}</td>
                            <td>{passenger.gender}</td>
                            <td>
                              <Checkbox
                                isChecked={passenger.ableToBoard}/>
                            </td>
                            <td>
                              {Moment(passenger.timestamp).format('DD/MM/YYYY, HH:MM:ss')}
                            </td>
                            <td>
                              <ModalImage className="avatar"
                                          small={passenger.passengerPhoto}
                                          large={passenger.passengerPhoto}
                                          alt="PassengerPic"/>
                              <ModalImage className="avatar"
                                          small={passenger.passengerPassport}
                                          large={passenger.passengerPassport}
                                          alt="PassengerPass"/>
                            </td>
                        </tr>
                      )}
                      </tbody>
                    </Table>
                    <div className="text-center">
                      <Pagination
                          activePage={this.state.activePage}
                          itemsCountPerPage={5}
                          totalItemsCount={this.state.count}
                          pageRangeDisplayed={5}
                          onChange={this.handlePageChange}
                      />
                    </div>
                  </div>

                }
              />


            </Col>
            <br/>
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      data: state.hst.data,
  };
};

export default connect(mapStateToProps,{getHistory})(History);
