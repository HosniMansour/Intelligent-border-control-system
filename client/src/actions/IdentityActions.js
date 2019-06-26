import axios from "axios";

import {LOAD_PASSENGER_PIC, LOAD_PASSENGER_PASSPORT, URL, SUBMIT_PASSENGER} from "./types";
import setAuthorizationToken from '../utils/setAuthToken';

export const loadPassengerPic = ({pic1}) =>{
    return (dispatch) => {
        dispatch({type:LOAD_PASSENGER_PIC, pic1:pic1});
    };
};

export const loadPassengerPassport = ({pic2}) =>{
    return (dispatch) => {
        dispatch({type:LOAD_PASSENGER_PASSPORT, pic2:pic2});
    };
};

export const SubmitCheck = (passengerPhoto, passengerPassport) =>{

    let token = localStorage.getItem("user_token");
    setAuthorizationToken(token);

    let formData = new FormData();

    formData.append("passengerPhoto", passengerPhoto);
    formData.append("passengerPassport", passengerPassport);

    return (dispatch) => {
        axios.post(URL + "check/", formData)
            .then((response)=> {
                dispatch({type:SUBMIT_PASSENGER, data:response.data});
                console.log("checkData", response.data)
            })
            .catch((err)=>{
                console.log(err)
            });
    };
};




