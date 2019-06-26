import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Card from '../Template/Card/Card';

import {connect} from "react-redux";
import {getAgents, getOneAgent, addAgent, deleteAgent, editAgent} from '../../../actions';
import 'perfect-scrollbar/dist/css/perfect-scrollbar.min.css';
import AddAgent from './AddAgent';
import EditAgent from './EditAgent';
import ListAgents from './ListAgents';


class ManageAgents extends Component {

  constructor(props) {
    super(props);
    this.state = {
      action: "showAll",
      componentTitle: "List of Agents",
      agent: null
    };

    this.onAddClicked = this.onAddClicked.bind(this);
    this.onEditClicked = this.onEditClicked.bind(this);
    this.onSubmitEdit = this.onSubmitEdit.bind(this);
    this.onSubmitAdd = this.onSubmitAdd.bind(this);
    this.onDeleteClicked = this.onDeleteClicked.bind(this);
    this.getAgents = this.getAgents.bind(this);
  }


  componentWillMount() {
    this.props.getAgents(1);
  }

  getAgents(page) {
    this.props.getAgents(page);
  }

  onSubmitAdd(e, username, email, name, lastName, password, password2, workid, type,file){
    e.preventDefault();
    this.props.addAgent(username, email, name, lastName, password, password2, workid, type,file);
  }

  onSubmitEdit(e, username, email, name, lastName, password, password2, workid, type,file){
    e.preventDefault();
    this.props.editAgent(this.state.agent.id, username, email, name, lastName, password, password2, workid, type,file);
  }


  onAddClicked(){
    this.setState({
      action:"showAdd",
      componentTitle: "Add Agent"
    })
  }

  onEditClicked(id){
    this.setState({
      action: "showEdit",
      componentTitle: "Edit Agent",
      agent: this.props.data.results.find(x => x.id === id)
    })
  }

  onDeleteClicked(id){
    this.props.deleteAgent(id);
    window.location.reload();
  }

  showList(){
    return(
      <ListAgents data={this.props.data} reload={this.getAgents} edit={this.onEditClicked} add={this.onAddClicked} delete={this.onDeleteClicked} />
    )
  }

  showAdd(){
    return(
      <AddAgent submitAdd={this.onSubmitAdd} err={this.props.err} />
    )
  }

  showEdit(){
    return(
      <EditAgent agent={this.state.agent} err={this.props.err} submitEdit={this.onSubmitEdit} />
    )
  }

  display(){
    if(this.state.action==="showEdit"){
      return this.showEdit();
    }
    else if(this.state.action==="showAdd"){
      return this.showAdd();
    }
    else {
      return this.showList();
    }
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
                title= {this.state.componentTitle}
                ctTableFullWidth
                ctTableResponsive
                content={this.display()}
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
      data: state.agt.data,
      err: state.agt.err,
  };
};

export default connect(mapStateToProps, {getAgents, getOneAgent, addAgent, editAgent, deleteAgent})(ManageAgents);
