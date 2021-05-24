import React from 'react';
import Navbar from "./Navbar";
import StoreContext from "../../../storeContext";
import {connect} from "react-redux";
import MyPosts from "../../Profile/MyPosts/MyPosts";
import {AppStateType} from "../../../redux/redux-store";
import {ItemMenuType} from "../../../redux/sidebar-reducer";

/*function NavbarContainer(props) {

    return (
        <StoreContext.Consumer>
            {
                (store) => {
                    let state = store.getState();
                    return <Navbar itemMenu={state.sidebarPage.itemMenu}/>
                }
            }
        </StoreContext.Consumer>
    );
}*/

type MapStatePropsType = {
    itemMenu: Array<ItemMenuType>
}

const mapStateToProps = (state: AppStateType): MapStatePropsType  => {
    return {
        itemMenu: state.sidebarPage.itemMenu
    }
};

const NavbarContainer  = connect<MapStatePropsType, {}, {}, AppStateType>(mapStateToProps, {})(Navbar);

export default NavbarContainer;
