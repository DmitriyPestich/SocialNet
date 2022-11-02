import {ResultCodesEnum, ResultCodesForCapthaEnum} from "../API/api";
import {stopSubmit} from "redux-form";
import {LoginFormType} from "../components/Login/LoginForm";
import {authAPI} from "../API/AuthApi";
import {securityAPI} from "../API/SecurityApi";
import {ResponseType} from "../API/api";
import {BaseThunkType, InfernActionsTypes} from "./redux-store";
import {Action} from "redux";

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    blocked: false,
    captcha: null as string | null
};

type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {

        case 'SET_USER_DATA': {
            return {
                ...state,
                ...action.payload
            }
        }
        case 'SET_PROCCESSING': {
            return {
                ...state,
                blocked: action.blocked
            }
        }
        case 'SET_CAPTCHA': {
            return {
                ...state,
                captcha: action.payload,
            }
        }
        default:
            return state;
    }
};

export const actions = {
setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: 'SET_USER_DATA',
    payload: {userId, email, login, isAuth}
} as const),
setProccessing: (blocked: boolean) =>
    ({type: 'SET_PROCCESSING', blocked} as const),
setChaptcha: (payload: string | null) =>
    ({type: 'SET_CAPTCHA', payload} as const)

};

export const chekAuthMe = (): ThunkType => async (dispatch) => {
    let response = await authAPI.Me();
    if (response.resultCode === ResultCodesEnum.Success) {
        let {id, email, login} = response.data;
        dispatch(actions.setAuthUserData(id, email, login, true));
    }
};

export const getCapcha = (): ThunkType => async (dispatch) => {
    let response = await securityAPI.captcha();
    dispatch(actions.setChaptcha(response.data.url));
};

export const getLoginError = (response: ResponseType<{userId: number}, ResultCodesEnum | ResultCodesForCapthaEnum>): ThunkType => async (dispatch) => {
    let stopSumbmitMessage = () => {
        let message = response.messages.length > 0 ? response.messages[0] : "Some ERROR";
        let action = stopSubmit("login", {_error: message});
        dispatch(action);
        dispatch({type: 'asd'});
    };
    if (response.resultCode === ResultCodesForCapthaEnum.Error) {
        dispatch(getCapcha());
        stopSumbmitMessage()
    } else {
        stopSumbmitMessage()
    }
};

export const login = (formData: LoginFormType): ThunkType => async (dispatch) => {
    dispatch(actions.setProccessing(true));
    let response = await authAPI.login(formData);
    if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(chekAuthMe());
        dispatch(actions.setChaptcha(null))
    } else {
        dispatch(getLoginError(response))
    }
    dispatch(actions.setProccessing(false));
};

export const logout = (): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.setProccessing(true));
        let response = await authAPI.logout();
        if (response.resultCode === ResultCodesEnum.Success) {
            dispatch(actions.setAuthUserData(null, null, null, false));
            dispatch(actions.setProccessing(false));
            dispatch(chekAuthMe());
        } else if (response.resultCode === ResultCodesEnum.Error) {
            console.log(response.messages[0]);
            dispatch(actions.setProccessing(false));
        }
    }
};

export default authReducer;

type ActionsType = InfernActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | Action>
