import {profileAPI} from "../API/api";
import {stopSubmit} from "redux-form";
import {ErrorContactsType, ErrorType, PhotosType, PostType, ProfileType} from "../types/types";

const ADD_POST = 'profile-reduces/ADD-POST';
const DELETE_POST = 'profile-reduces/DELETE_POST';
const SET_USER_PROFILE = 'profile-reduces/SET_USER_PROFILE';
const SET_PROFILE_STATUS = 'profile-reduces/SET_PROFILE_STATUS';
const SAVE_PHOTO_SUCCESS = 'profile-reduces/SAVE_PHOTO_SUCCESS';
const SET_PROCCESSING = 'profile-reduces/SET_PROCCESSING';
const SET_LOADING = 'profile-reduces/SET_LOADING';
const SET_PROFILEDATASUCCESS = 'profile-reduces/SET_PROFILEDATASUCCESS';

export const initialState = {
    post: [
        {id: 1, message: 'Hello', CountLike: 12},
        {id: 2, message: 'Hello, how are you', CountLike: 5},
        {id: 3, message: 'I`m ok', CountLike: 16}
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    blocked: false,
    loading: true,
    profileDataSuccess: true
};

export type InitialStateType = typeof initialState;

const profileReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case ADD_POST: {
            return {
                ...state,
                post: [...state.post, {id: 4, message: action.message, CountLike: 0}],
            };
        }
        case DELETE_POST: {
            return {
                ...state,
                post: state.post.filter(p => p.id !== action.id),
            };
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            };
        }
        case SET_PROFILE_STATUS: {
            return {
                ...state,
                status: action.status
            };
        }
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            };
        }
        case SET_PROCCESSING: {
            return {
                ...state,
                blocked: action.blocked
            }
        }
        case SET_LOADING: {
            return {
                ...state,
                loading: action.loading
            }
        }
        case SET_PROFILEDATASUCCESS: {
            return {
                ...state,
                profileDataSuccess: action.payload
            }
        }
        default:
            return state;
    }
};


type AddPostType = {
    type: typeof ADD_POST,
    message: string
}
export const addPost = (message: string): AddPostType => ({type: ADD_POST, message});
type DeletePostType = {
    type: typeof DELETE_POST,
    id: number
}
export const deletePost = (id: number): DeletePostType => ({type: DELETE_POST, id});
type SetUserProfileType = {
    type: typeof SET_USER_PROFILE,
    profile: ProfileType
}
export const setUserProfile = (userdata: ProfileType): SetUserProfileType =>
    ({type: SET_USER_PROFILE, profile: userdata});
type SetProfileStatusType = {
    type: typeof SET_PROFILE_STATUS,
    status: string
}
export const setProfileStatus = (status: string): SetProfileStatusType =>
    ({type: SET_PROFILE_STATUS, status});
type SavePhotoSuccessType = {
    type: typeof SAVE_PHOTO_SUCCESS,
    photos: PhotosType
}
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessType =>
    ({type: SAVE_PHOTO_SUCCESS, photos});
type SetProccessingType = {
    type: typeof SET_PROCCESSING,
    blocked: boolean
}
export const setProccessing = (blocked: boolean): SetProccessingType =>
    ({type: SET_PROCCESSING, blocked});
type SetLoadingType = {
    type: typeof SET_LOADING,
    loading: boolean
}
export const setLoading = (loading: boolean): SetLoadingType =>
    ({type: SET_LOADING, loading});
type SetProfileDataSuccessType = {
    type: typeof SET_PROFILEDATASUCCESS,
    payload: boolean
}
export const setProfileDataSuccess = (payload: boolean): SetProfileDataSuccessType =>
    ({type: SET_PROFILEDATASUCCESS, payload});


export const getUserProfile = (userId: number) => async (dispatch: any) => {
    dispatch(setLoading(true));
    try {
        let response = await profileAPI.getUserProfile(userId);
        dispatch(setUserProfile(response.data));
        dispatch(setLoading(false));
    } 
    catch(e) {
        alert(e.response.data.message);
    }
};
export const getProfileStatus = (userId: number) => async (dispatch: any) => {
    let response = await profileAPI.getProfileStatus(userId);
    dispatch(setProfileStatus(response.data));
};
export const updateProfileStatus = (status: string) => async (dispatch: any) => {
    let response = await profileAPI.updateProfileStatus(status);
    if (response.resultCode === 0) {
        dispatch(setProfileStatus(status));
    }
};
export const savePhoto = (file: any) => async (dispatch: any) => {
    dispatch(setProccessing(true));
    let response = await profileAPI.updateProfilePhoto(file);
    if (response.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.photos));
    }
    dispatch(setProccessing(false));
};

export const saveProfileData = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId;
    let response = await profileAPI.updateProfileData(profile);
    if (response.resultCode === 0) {
        dispatch(getUserProfile(userId));
        dispatch(setProfileDataSuccess(true));
    } else {
        let error = {} as ErrorType;
        let errorContacts = {} as ErrorContactsType;
        response.messages.forEach((message: string) => {
            message = message.toLowerCase();
            if (message.includes("contacts->")) {
                for (let key in profile.contacts) {
                    if (message.includes(key)) {
                        errorContacts[key] = 'invalid url format ' + key;
                    }
                }
            } else {
                for (let key in profile) {
                    if (message.includes(key.toLowerCase())) {
                        error[key] = 'field ' + key + ' is required';
                    }
                }
            }
        });
        let action = stopSubmit("profileInfo", {...error, contacts: {...errorContacts}});
        dispatch(action);
    }
};

export default profileReducer;
