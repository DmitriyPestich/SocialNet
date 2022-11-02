import {ResponseType, ResultCodesEnum} from "../API/api";
import {UsersType} from "../types/types";
import {usersAPI} from "../API/UserApi";
import {AppStateType, BaseThunkType, InfernActionsTypes} from "./redux-store";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";

let initialState = {
    users: [] as Array<UsersType>,
    currentPage: 1,
    amountUsersOnPage: 5,
    totalCount: 20,
    isFetching: false,
    followingProccess: [] as Array<number>,// Array of user id
};

type InitialStateType = typeof initialState;
const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SUBSCRIBE': {
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: action.subscribe}
                    }
                    return u;
                })
            };
        }
        case 'SET_USERS': {
            return {
                ...state,
                users: action.users
            }
        }
        case 'CHANGE_PAGE': {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
        case 'SET_TOTAL_COUNT': {
            return {
                ...state,
                totalCount: action.totalCount
            }
        }
        case 'IS_FETCHING': {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case 'FOLLOWING_PROCCESS': {
            return {
                ...state,
                followingProccess: action.isFollowing
                    ? [...state.followingProccess, action.userId]
                    : state.followingProccess.filter(id => id != action.userId)
            }
        }
        default:
            return state;
    }
};

export const actions = {
    subscribeSuccses: (userId: number, subscribe: boolean) => ({type: 'SUBSCRIBE', userId, subscribe} as const),
    setUsers: (users: Array<UsersType>) => ({type: 'SET_USERS', users} as const),
    changePage: (currentPage: number) => ({type: 'CHANGE_PAGE', currentPage} as const),
    setTotalCount: (count: number) => ({type: 'SET_TOTAL_COUNT', totalCount: count} as const),
    setIsFetching: (isFetching: boolean) => ({type: 'IS_FETCHING', isFetching} as const),
    setFollowingProccess: (isFollowing: boolean, userId: number) => ({type: 'FOLLOWING_PROCCESS', isFollowing, userId} as const)
}

export const uploadUsers = (currentPage: number, amountUsersOnPage: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true));
        dispatch(actions.changePage(currentPage));
        let response = await usersAPI.uploadUsers(currentPage, amountUsersOnPage);
        try {
            dispatch(actions.setUsers(response.items));
            dispatch(actions.setTotalCount(response.totalCount));
            dispatch(actions.setIsFetching(false));
        } catch (e) {
            alert(e.response.data.message);
        }
    }
};

export const followUnfollowFlow = (dispatch: Dispatch<ActionsType>, requestMethod: (userId: number, subscribe: boolean) => Promise<ResponseType>, subscribe: boolean, userId: number) => {
    return async () => {
        dispatch(actions.setFollowingProccess(true, userId));
        let response = await requestMethod(userId, subscribe);
        if (response.resultCode === ResultCodesEnum.Success) {
            dispatch(actions.subscribeSuccses(userId, subscribe))
        }
        dispatch(actions.setFollowingProccess(false, userId));
    }
};

export const subscribeUser = (userId: number, subscribe: boolean): ThunkType => async (dispatch) => {
    dispatch(followUnfollowFlow(dispatch, usersAPI.subscribe.bind(usersAPI), subscribe, userId));
};

export default usersReducer;

export type ActionsType = InfernActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>
