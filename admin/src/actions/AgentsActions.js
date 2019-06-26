import axios from "axios";

import {GET_AGENTS, GET_ONE_AGENT, DELETE_AGENT, URL, ADD_AGENT, EDIT_AGENT} from "./types";

import setAuthorizationToken from '../utils/setAuthToken';


export const addAgent = (username, email, name, lastName, password, password2, workid, type, file) =>{

    let token = localStorage.getItem("app_token");
    setAuthorizationToken(token);

    let formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("name", name);
    formData.append("lastName", lastName);
    formData.append("password", password);
    formData.append("password2", password2);
    formData.append("idWork", workid);
    formData.append("Type", type);
    formData.append("photo", file);

    return (dispatch) => {
        axios.post(URL + "api/admincp/agents/", formData)
            .then((response)=> {
                dispatch({type:ADD_AGENT, data:response.data,err:{error:""}});
            })
            .catch((err)=>{
                dispatch({type:ADD_AGENT,err:err.response.data});
            });
    };
};


export const getAgents = (page) =>{

    let token = localStorage.getItem("app_token");
    setAuthorizationToken(token);

    return (dispatch) => {
        axios.get(URL + "api/admincp/agents/?page="+page)
            .then((response)=> {
                dispatch({type:GET_AGENTS, data:response.data});
            })
            .catch((err)=>{
                console.log(err)
            });
    };
};

export const getOneAgent = (pk) =>{

    let token = localStorage.getItem("app_token");
    setAuthorizationToken(token);

    return (dispatch) => {
        axios.get(URL + "api/admincp/agents/" + pk + "/")
            .then((response)=> {
                dispatch({type:GET_ONE_AGENT, data:response.data});
            })
            .catch((err)=>{
                console.log(err)
            });
    };
};



export const deleteAgent = (pk) =>{

    let token = localStorage.getItem("app_token");
    setAuthorizationToken(token);

    return (dispatch) => {
        axios.delete(URL + "api/admincp/agents/" + pk + "/")
            .then((response)=> {
                dispatch({type:DELETE_AGENT, data:response.data});
            })
            .catch((err)=>{
                console.log(err)
            });
    };
};

export const editAgent = (pk, username, email, name, lastName, password, password2, workid, type, file) =>{

    let token = localStorage.getItem("app_token");
    setAuthorizationToken(token);

    let formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("name", name);
    formData.append("lastName", lastName);
    formData.append("password", password);
    formData.append("password2", password2);
    formData.append("idWork", workid);
    formData.append("Type", type);
    formData.append("photo", file);

    return (dispatch) => {
        axios.post(URL + "api/admincp/agents/" + pk + "/" , formData)
            .then((response)=> {
                dispatch({type:EDIT_AGENT, data:response.data,err:{error:""}});
            })
            .catch((err)=>{
                dispatch({type:EDIT_AGENT,err:err.response.data});
            });
    };

};






