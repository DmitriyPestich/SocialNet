import React from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {login, logout} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";
import Login from "./Login";
import {LoginFormType} from "./LoginForm";

type MapStatePropsType = {
    blocked: boolean,
    isAuth: boolean,
    captcha: string | null
}
type MapDispatchPropsType = {
    login: (formData: LoginFormType) => void
    logout: () => void
}
type OwnPropsType = {

}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        blocked: state.auth.blocked,
        isAuth: state.auth.isAuth,
        captcha: state.auth.captcha
    }
};

const LoginContainer = compose(connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>
(mapStateToProps, {login, logout}))(Login);

export default LoginContainer;
