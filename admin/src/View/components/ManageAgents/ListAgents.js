import React, { Component } from 'react';
import Button from '../../elements/CustomButton/CustomButton.jsx';
import { Table } from "react-bootstrap";
import ModalImage from 'react-modal-image';
import Pagination from "react-js-pagination";

class ListAgents extends Component {

    constructor(props) {
        super(props);
        if(this.props.data.count===undefined){
            this.state = {
                activePage: 1,
                count:5,
                data:this.props.data.results,
            };
        }else{
            this.state = {
                activePage: 1,
                count:this.props.data.count,
                data:this.props.data.results,
            };
        }


        this.handlePageChange = this.handlePageChange.bind(this);
    }

    handlePageChange(pageNumber) {
        this.setState({activePage: pageNumber});
        this.props.reload(pageNumber);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            data:nextProps.data.results,
            count:nextProps.data.count,
        })
    }

    render() {
        return(
            <div>
            <Button style={{marginTop:-48}} onClick={this.props.add} pullRight bsStyle="info" fill type="button">
                          Add Agent
            </Button>
              <Table striped hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Photo</th>
                    <th>Type</th>
                    <th>Last Updated</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                {this.state.data.map(agent=>
                  <tr key={agent.id}>
                      <td>{agent.id}</td>
                      <td>{agent.name} {agent.lastName}</td>
                      <td>{agent.user.username}</td>
                      <td>{agent.password}</td>
                      <td>
                        <ModalImage className="avatar"
                                    small={agent.photo}
                                    large={agent.photo}
                                    alt="AgentPhoto"/>
                      </td>
                      <td>{agent.Type}</td>
                      <td>{agent.updated}</td>
                      <td>
                      <Button onClick={() => this.props.edit(agent.id)} bsStyle="info" simple type="button">
                        <i className="fa fa-edit" />
                      </Button>
                      <Button onClick={() => this.props.delete(agent.id)} bsStyle="danger" simple type="button">
                        <i className="fa fa-trash" />
                      </Button>
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
        );
    }

}
  
  export default ListAgents;