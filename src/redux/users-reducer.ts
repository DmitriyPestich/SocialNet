import {usersAPI} from "../API/api";
import {UsersType} from "../types/types";

const SUBSCRIBE = 'SUBSCRIBE';
const SET_USERS = 'SET_USERS';
const CHANGE_PAGE = 'CHANGE_PAGE';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
const IS_FETCHING = 'IS_FETCHING';
const FOLLOWING_PROCCESS = 'FOLLOWING_PROCCESS';

let initialState = {
    users: [] as Array<UsersType>,
    currentPage: 1,
    amountUsersOnPage: 5,
    totalCount: 20,
    isFetching: false,
    followingProccess: [] as Array<number>,// Array of user id
};

type InitialStateType = typeof initialState;
const usersReducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {
        case SUBSCRIBE: {
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
/*        case FOLLOW: {
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            };
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            };
        }*/
        case SET_USERS: {
            return {
                ...state,
                users: action.users
            }
        }
        case CHANGE_PAGE: {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
        case SET_TOTAL_COUNT: {
            return {
                ...state,
                totalCount: action.totalCount
            }
        }
        case IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case FOLLOWING_PROCCESS: {
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

type SubscribeSuccsesType = {
    type: typeof SUBSCRIBE,
    userId: number,
    subscribe: boolean
}
export const subscribeSuccses = (userId: number, subscribe: boolean): SubscribeSuccsesType =>
    ({type: SUBSCRIBE, userId, subscribe});
type SetUsersType = {
    type: typeof SET_USERS,
    users: Array<UsersType>
}
export const setUsers = (users: Array<UsersType>): SetUsersType =>
    ({type: SET_USERS, users});
type ChangePageType = {
    type: typeof CHANGE_PAGE,
    currentPage: number
}
export const changePage = (currentPage: number): ChangePageType =>
    ({type: CHANGE_PAGE, currentPage});
type SetTotalCountType = {
    type: typeof SET_TOTAL_COUNT,
    totalCount: number
}
export const setTotalCount = (count: number): SetTotalCountType =>
    ({type: SET_TOTAL_COUNT, totalCount: count});
type SetIsFetchingType = {
    type: typeof IS_FETCHING,
    isFetching: boolean
}
export const setIsFetching = (isFetching: boolean): SetIsFetchingType =>
    ({type: IS_FETCHING, isFetching});
type SetFollowingProccessType = {
    type: typeof FOLLOWING_PROCCESS,
    isFollowing: boolean,
    userId: number
}
export const setFollowingProccess = (isFollowing: boolean, userId: number): SetFollowingProccessType =>
    ({type: FOLLOWING_PROCCESS, isFollowing, userId});


export const uploadUsers = (currentPage: number, amountUsersOnPage: number) => {
    return async (dispatch: any) => {
        dispatch(setIsFetching(true));
        dispatch(changePage(currentPage));
        let response = await usersAPI.uploadUsers(currentPage, amountUsersOnPage);
            dispatch(setUsers(response.items));
            dispatch(setTotalCount(response.totalCount));
            dispatch(setIsFetching(false));
    }
};

export const followUnfollowFlow = (dispatch: any, requestMethod: (userId: number) => any, subscribe: boolean, userId: number) => {
    return async (dispatch: any) => {
        dispatch(setFollowingProccess(true, userId));
        let response = await requestMethod(userId);
            if (response.resultCode === 0) {
                dispatch(subscribeSuccses(userId, subscribe))
            }
            dispatch(setFollowingProccess(false, userId));
    }
};

export const unfollow = (userId: number) => (dispatch: any) => {
    dispatch(followUnfollowFlow(dispatch, usersAPI.unfollow.bind(usersAPI), false, userId));
};
export const follow = (userId: number) => (dispatch: any) => {
    dispatch(followUnfollowFlow(dispatch, usersAPI.follow.bind(usersAPI), true, userId));
};

export default usersReducer;
