import axios from "axios";
import {URL} from "./types";
import {LOGOUT, LOGIN_ATTEMPT,LOGIN_FAILED,LOGIN_SUCCESS} from "./types";
import setAuthorizationToken from '../utils/setAuthToken';

export function lockscreen() {
    return dispatch => {
        localStorage.removeItem('user_token');
        setAuthorizationToken(false);
        dispatch({type:LOGOUT});
    }
}

export function logout() {
    return dispatch => {
        localStorage.removeItem('user_token');
        localStorage.removeItem('user');
        setAuthorizationToken(false);
        dispatch({type:LOGOUT});
    }
}

export const loginUser = ({username,password}) =>{
    return (dispatch) => {
        dispatch({type:LOGIN_ATTEMPT});
        axios.post(URL + "auth/", {username, password})
            .then((response)=> {
                handleResponse(dispatch,response.data);
            })
            .catch((err)=>{
                onLoginFailed(dispatch,err.response.data);
            });
    };
};

const handleResponse = (dispatch, data) =>{

    if(!data.user){
        onLoginFailed(dispatch,data.message);
    }else{
        localStorage.setItem('user_token', data.access);
        localStorage.setItem('user', JSON.stringify(data.user));
        onLoginSuccess(dispatch,data.user,data.access);
    }
};

const onLoginSuccess = (dispatch,user,token) =>{
    dispatch({type:LOGIN_SUCCESS, user, token});
};

const onLoginFailed = (dispatch, errorMessage) =>{
    dispatch({type:LOGIN_FAILED, error:errorMessage.error});
};