import {GET_AGENTS, GET_ONE_AGENT, DELETE_AGENT, ADD_AGENT, EDIT_AGENT} from "../actions/types";

const INITIAL_STATE = {
    data:{
        "count": 2,
        "next": null,
        "previous": null,
        "results": []
    },
    res:0,
    err:{
        error:""
    }
};

export default (state=INITIAL_STATE, action) => {
    switch (action.type){
        case GET_AGENTS:{
            return{...state, data:action.data,err:{error:""}};
        }
        case EDIT_AGENT:{
            return{...state,err:action.err};
        }
        case ADD_AGENT:{
            return{...state,err:action.err};
        }
        case GET_ONE_AGENT:{
            return{...state, data:action.data,err:{error:""}};
        }
        case DELETE_AGENT:{
            return{...state, data:action.data,err:{error:""}};
        }
        default:
            return state;
    }
};