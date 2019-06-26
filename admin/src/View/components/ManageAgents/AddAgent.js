import React, { Component } from 'react';
import Button from '../../elements/CustomButton/CustomButton.jsx';
import FormInputs from '../../components/Template/FormInputs/FormInputs';
import avatar_pic from '../../assets/img/avatar.png';
import {Alert} from "react-bootstrap";


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



class AddAgent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            name: "",
            lastName: "",
            password: "",
            password2: "",
            workid: "",
            type: "",
            file: '',
            imagePreviewUrl: avatar_pic
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this._handleImageChange = this._handleImageChange.bind(this);
      }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        };

        reader.readAsDataURL(file)
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }


    onSubmit(e){
        const {username, email, name, lastName, password, password2, workid, type, file} = this.state;
        this.props.submitAdd(e, username, email, name, lastName, password, password2, workid, type, file);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.err.error===""){
            window.location.reload();
        }
    }

    render() {
        return(
            <form onSubmit={this.onSubmit}>
            <Error val={this.props.err.error} />
            <FormInputs
                ncols = {["col-md-6" , "col-md-6" ]}
                properties = {[
                    {
                        label : "Username",
                        type : "text",
                        bsClass : "form-control",
                        name : "username",
                        placeholder : "username...",
                        value:this.state.username,
                        onChange:this.onChange,
                        required:true
                    },
                    {
                        label : "Email",
                        type : "email",
                        bsClass : "form-control",
                        name : "email",
                        placeholder : "email...",
                        value:this.state.email,
                        onChange:this.onChange,
                        required:true
                    },
                ]}
            />

            <FormInputs
                ncols = {["col-md-6" , "col-md-6" ]}
                properties = {[
                    {
                        label : "First name",
                        type : "text",
                        bsClass : "form-control",
                        name : "name",
                        placeholder : "First name...",
                        value:this.state.name,
                        onChange:this.onChange,
                        required:true
                    },
                    {
                        label : "Last name",
                        type : "text",
                        bsClass : "form-control",
                        name : "lastName",
                        placeholder : "Last name...",
                        value:this.state.lastName,
                        onChange:this.onChange,
                        required:true
                    },
                ]}
            />

            <FormInputs
                ncols = {["col-md-6" , "col-md-6" ]}
                properties = {[
                    {
                        label : "Password",
                        type : "text",
                        bsClass : "form-control",
                        name : "password",
                        placeholder : "Password...",
                        value:this.state.password,
                        onChange:this.onChange,
                        required:true
                    },
                    {
                        label : "Repeat password",
                        type : "text",
                        bsClass : "form-control",
                        name : "password2",
                        placeholder : "Repeat password...",
                        value:this.state.password2,
                        onChange:this.onChange,
                        required:true
                    },
                ]}
            />

            <FormInputs
                ncols = {["col-md-6" , "col-md-6" ]}
                properties = {[
                    {
                        label : "Work ID",
                        type : "text",
                        bsClass : "form-control",
                        name : "workid",
                        placeholder : "Work ID...",
                        value:this.state.workid,
                        onChange:this.onChange,
                        required:true
                    },
                    {
                        label : "Type",
                        type : "text",
                        bsClass : "form-control",
                        name : "type",
                        placeholder : "Type...",
                        value:this.state.type,
                        onChange:this.onChange,
                        required:true
                    },
                ]}
            />

            <br/>
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-2 media-middle">
                    <img src={this.state.imagePreviewUrl} width="100" alt="agent"/>
                </div>
                <div className="col-md-2 media-middle">
                    <br/><br/>
                    <input className="fileInput" type="file" onChange={(e)=>this._handleImageChange(e)} required />
                </div>
                <div className="col-md-2"></div>
            </div>
            <br/>
            <Button bsStyle="info" pullRight fill type="submit">
            Add Agent
            </Button>
            <div className="clearfix" />
        </form>
        );
    }

}

export default AddAgent;