import axios from "axios";

import {GET_STATS,URL} from "./types";

import setAuthorizationToken from '../utils/setAuthToken';


export const getStats = () =>{
    let token = localStorage.getItem("app_token");
    setAuthorizationToken(token);
    return (dispatch) => {
        axios.get(URL+"api/admincp/stats/")
            .then((response)=> {
                dispatch({type:GET_STATS, data:response.data});
            })
            .catch((err)=>{
                console.log(err)
            });
    };
};