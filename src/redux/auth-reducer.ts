import {authAPI, securityAPI} from "../API/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA';
const SET_PROCCESSING = 'SET_PROCCESSING';
const SET_CAPTCHA = 'SET_CAPTCHA';

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    blocked: false,
    captcha: null as string | null
};

type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {

        case SET_USER_DATA: {
            return {
                ...state,
                ...action.payload
            }
        }
        case SET_PROCCESSING: {
            return {
                ...state,
                blocked: action.blocked
            }
        }
        case SET_CAPTCHA: {
            return {
                ...state,
                captcha: action.payload,
            }
        }
        default:
            return state;
    }

};

type SetAuthUserDataActionPayloadType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}
type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA
    payload: SetAuthUserDataActionPayloadType
}
export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
});

type SetProccessingType = {
    type: typeof SET_PROCCESSING,
    blocked: boolean
}
export const setProccessing = (blocked: boolean): SetProccessingType =>
    ({type: SET_PROCCESSING, blocked});

type SetChaptchaType = {
    type: typeof SET_CAPTCHA,
    payload: string | null
}
export const setChaptcha = (payload: string | null): SetChaptchaType =>
    ({type: SET_CAPTCHA, payload});


export const chekAuthMe = () => async (dispatch: any) => {
    let response = await authAPI.Me();
    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
};

export const getCapcha = () => async (dispatch: any) => {
    let response = await securityAPI.captcha();
        dispatch(setChaptcha(response.data.url));
};

export const getLoginError = (response: any) => async (dispatch: any) => {
    let stopSumbmitMessage = () => {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some ERROR";
        let action = stopSubmit("login", {_error: message});
        dispatch(action);
    }
    if (response.data.resultCode === 10) {
        dispatch(getCapcha());
        stopSumbmitMessage()
    }  else {
        stopSumbmitMessage()
    }      
};

export const login = (formData: any) => (dispatch: any) => {
        dispatch(setProccessing(true));
        authAPI.login(formData)
            .then((response: any) => {
                if (response.data.resultCode === 0) {
                    dispatch(chekAuthMe())
                    dispatch(setChaptcha(null))
                } else {
                    dispatch(getLoginError(response))                 
                }
            dispatch(setProccessing(false));
        })
};

export const logout = () => {
    return async (dispatch: any) => {
        dispatch(setProccessing(true));
        let response = await authAPI.logout();
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false));
                dispatch(setProccessing(false));
                dispatch(chekAuthMe());
            } else if (response.data.resultCode === 1) {
                console.log(response.data.messages[0]);
                dispatch(setProccessing(false));
            }
    }
};

export default authReducer;
