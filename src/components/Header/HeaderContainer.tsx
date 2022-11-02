import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/auth-reducer";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";

type MapStatePropsType = {
    isAuth: boolean,
    login: string | null,
}
type MapDispatchPropsType = {
    logout: () => void
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
};

const HeaderContainer = compose(connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {logout}))(Header);

export default HeaderContainer;

