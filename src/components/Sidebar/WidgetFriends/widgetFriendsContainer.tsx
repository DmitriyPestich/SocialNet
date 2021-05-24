import React from 'react';
import StoreContext from "../../../storeContext";
import Friends from "./widgetFriends";
import {connect} from "react-redux";
import Navbar from "../Navbar/Navbar";
import {AppStateType} from "../../../redux/redux-store";
import {FriendsItems} from "../../../redux/sidebar-reducer";

/*function FriendsContainer(props) {

    return (
        <StoreContext.Consumer>
            {
                (store) => {
                    let state = store.getState();
                    return <Friends friends={state.sidebarPage.friends}/>
                }
            }
        </StoreContext.Consumer>
    );
}*/

type MapStatePropsType = {
    friends: Array<FriendsItems>,
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        friends: state.sidebarPage.friends
    }
};


const FriendsContainer  = connect<MapStatePropsType, {}, {}, AppStateType>(mapStateToProps, {})(Friends);

export default FriendsContainer;
