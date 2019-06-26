import {GET_HISTORY} from "../actions/types";

const INITIAL_STATE = {
    data:{
        "count": 1,
        "next": "",
        "previous": "",
        "results": []
    },
    res:0
};

export default (state=INITIAL_STATE, action) => {
    switch (action.type){
        case GET_HISTORY:{
            return{...state, data:action.data};
        }
        default:
            return state;
    }
};