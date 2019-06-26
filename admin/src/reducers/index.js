import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import AuthReducer from "./AuthReducer";
import AgentsReducer from "./AgentsReducer";
import StatsReducer from "./StatsReducer";

const rootPersistConfig = {
    key: 'root',
    storage: storage,
    blacklist: ['auth']
};

const authPersistConfig = {
    key: 'auth',
    storage: storage,
    blacklist: ['error','isRegistred']
};

const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig, AuthReducer),
    agt: AgentsReducer,
    sts: StatsReducer
});

export default persistReducer(rootPersistConfig, rootReducer)