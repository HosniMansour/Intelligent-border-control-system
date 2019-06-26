import {GET_STATS} from "../actions/types";

const INITIAL_STATE = {
    agents:0,
    checkouts:0,
    wanted:0,
    last:[]
};

export default (state=INITIAL_STATE, action) => {
    switch (action.type){
        case GET_STATS:{
            return{...state, data:action.data};
        }
        default:
            return state;
    }
};