import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {saveGiphy} from "../../redux/giphy-reducer";
import Giphy from "./Giphy";

type MapStatePropsType = {
    blocked: boolean
}
type MapDispatchPropsType = {
    saveGiphy: (file: File) => void
}
type OwnPropsType = {
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        blocked: state.giphy.blocked
    }
};

const GiphyContainer = compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {saveGiphy})
)(Giphy);


export default GiphyContainer;
