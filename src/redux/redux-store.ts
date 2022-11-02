import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogReducer from "./dialog-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import giphyReducer from "./giphy-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk"
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
export type InfernActionsTypes<T> = T extends {[key: string]: (...args: any[]) => infer U} ? U : never;
export type BaseThunkType<A extends Action, R = void> = ThunkAction<R, AppStateType, unknown, A>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducers,
    composeEnhancers(applyMiddleware(thunkMiddleware)),
    );
// @ts-ignore
window._store_ = store;

export default store;


