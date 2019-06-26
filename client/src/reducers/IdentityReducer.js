import {LOAD_PASSENGER_PIC, LOAD_PASSENGER_PASSPORT, SUBMIT_PASSENGER} from "../actions/types";

const INITIAL_STATE = {
    pic1: null,
    pic2:null,
    data:null,
    res:0
};

export default (state=INITIAL_STATE, action) => {
    switch (action.type){
        case LOAD_PASSENGER_PIC:{
            return{...state, pic1:action.pic1, data:null};
        }
        case LOAD_PASSENGER_PASSPORT:{
            return{...state, pic2:action.pic2,data:null};
        }
        case SUBMIT_PASSENGER:{
            return{...state,data:action.data,pic1:null,pic2:null,res:1};
        }
        default:
            return state;
    }
};