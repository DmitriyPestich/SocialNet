import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogReducer from "./dialog-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import giphyReducer from "./giphy-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk"
import { reducer as formReducer } from 'redux-form'
import appReducer from "./app-reducer";

let rootReducers = combineReducers({
    dialoguesPage: dialogReducer,
    profilePage: profileReducer,
    sidebarPage: sidebarReducer,
    usersPage: usersReducer,
    giphy: giphyReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});

type RootReducerType = typeof rootReducers;// (globalstate: AppStateType) => AppStateType
export type AppStateType = ReturnType<RootReducerType>


// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducers,
    composeEnhancers(applyMiddleware(thunkMiddleware)),
    );
// @ts-ignore
window._store_ = store;


export default store;


