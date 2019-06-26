import {LOGOUT, LOGIN_ATTEMPT, LOGIN_FAILED, LOGIN_SUCCESS} from "../actions/types";

const INITIAL_STATE = {
    isAuthenticated: false,
    user:null,
    loading:false,
    error:"",
};

export default (state=INITIAL_STATE, action) => {
    switch (action.type){
        case LOGIN_ATTEMPT:{
            return{...state, loading:true};
        }
        case LOGIN_FAILED:{
            return{...INITIAL_STATE, loading:false,error:action.error};
        }
        case LOGIN_SUCCESS:{
            return{...INITIAL_STATE,user:action.user,isAuthenticated:true};
        }
        case LOGOUT:{
            return{...INITIAL_STATE,isAuthenticated:false};
        }
        default:
            return state;
    }
};
