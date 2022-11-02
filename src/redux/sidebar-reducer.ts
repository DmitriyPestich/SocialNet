import {BaseThunkType, InfernActionsTypes} from "./redux-store";
import {Action} from "redux";

export type ItemMenuType = {
    url: string,
    title: string
}
export type FriendsItems = {
    id: number,
    name: string
}

let initialState = {
    itemMenu: [
        {url: '/profile', title: 'Profile'},
        {url: '/messages', title: 'Messages'},
        {url: '/users', title: 'Users'},
        {url: '/login', title: 'Login'},
        {url: '/news', title: 'News'},
        {url: '/giphy', title: 'Giphy'},
        {url: '/music', title: 'Music'},
        {url: '/settings', title: 'Settings'}
    ] as Array<ItemMenuType>,
    friends: [
        {id: 1, name: 'Roma'},
        {id: 2, name: 'Dima'},
        {id: 3, name: 'Den'}
    ] as Array<FriendsItems>
};

type InitialStateType = typeof initialState;
const sidebarReducer = (state = initialState, action: any): InitialStateType => {
    return state;
};

export default sidebarReducer;
