import {AppStateType} from "./redux-store";

export const getUsers = (state: AppStateType) => {
    return state.usersPage.users;
}
export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage;
}
export const getAmountUsersOnPage = (state: AppStateType) => {
    return state.usersPage.amountUsersOnPage;
}
export const getTotalCount = (state: AppStateType) => {
    return state.usersPage.totalCount;
}
export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching;
}
export const getFollowingProccess = (state: AppStateType) => {
    return state.usersPage.followingProccess;
}
