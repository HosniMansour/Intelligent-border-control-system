import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import AuthReducer from "./AuthReducer";
import IdentityReducer from "./IdentityReducer";
import HistoryReducer from "./HistoryReducer";

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
    ide: IdentityReducer,
    hst: HistoryReducer,
});

export default persistReducer(rootPersistConfig, rootReducer)