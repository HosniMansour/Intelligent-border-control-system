import axios from "axios";

import {GET_HISTORY, URL} from "./types";
import setAuthorizationToken from '../utils/setAuthToken';


export const getHistory = (page) =>{

    let token = localStorage.getItem("user_token");
    setAuthorizationToken(token);

    return (dispatch) => {
        axios.get(URL + "history/?page="+page)
            .then((response)=> {
                dispatch({type:GET_HISTORY, data:response.data});
            })
            .catch((err)=>{
                console.log(err)
            });
    };
};




