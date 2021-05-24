import React from 'react';
import {connect} from "react-redux";
import {Giphy} from "./Giphy";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {saveGiphy} from "../../redux/giphy-reducer";

type MapStatePropsType = {
    blocked: boolean
}
type MapDispatchPropsType = {
    saveGiphy: (file: any) => void
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
