import {ResultCodesEnum} from "../API/api";
import {stopSubmit} from "redux-form";
import {ErrorContactsType, ErrorType, PhotosType, PostType, ProfileType} from "../types/types";
import {profileAPI} from "../API/ProfileApi";
import {BaseThunkType, InfernActionsTypes} from "./redux-store";
import {Action} from "redux";

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

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'ADD_POST': {
            return {
                ...state,
                post: [...state.post, {id: 4, message: action.message, CountLike: 0}],
            };
        }
        case 'DELETE_POST': {
            return {
                ...state,
                post: state.post.filter(p => p.id !== action.id),
            };
        }
        case 'SET_USER_PROFILE': {
            return {
                ...state,
                profile: action.profile
            };
        }
        case 'SET_PROFILE_STATUS': {
            return {
                ...state,
                status: action.status
            };
        }
        case 'SAVE_PHOTO_SUCCESS': {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            };
        }
        case 'SET_PROCCESSING': {
            return {
                ...state,
                blocked: action.blocked
            }
        }
        case 'SET_LOADING': {
            return {
                ...state,
                loading: action.loading
            }
        }
        case 'SET_PROFILEDATASUCCESS': {
            return {
                ...state,
                profileDataSuccess: action.payload
            }
        }
        default:
            return state;
    }
};

export const actions = {
    addPost: (message: string)  => ({type: 'ADD_POST', message} as const),
    deletePost: (id: number)  => ({type: 'DELETE_POST', id} as const),
    setUserProfile: (userdata: ProfileType) =>
        ({type: 'SET_USER_PROFILE', profile: userdata} as const),
    setProfileStatus: (status: string) =>
        ({type: 'SET_PROFILE_STATUS', status} as const),
    savePhotoSuccess: (photos: PhotosType) =>
        ({type: 'SAVE_PHOTO_SUCCESS', photos} as const),
    setProccessing: (blocked: boolean) =>
        ({type: 'SET_PROCCESSING', blocked} as const),
    setLoading: (loading: boolean) =>
        ({type: 'SET_LOADING', loading} as const),
    setProfileDataSuccess: (payload: boolean) =>
        ({type: 'SET_PROFILEDATASUCCESS', payload} as const),

}

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    dispatch(actions.setLoading(true));
    try {
        let response = await profileAPI.getUserProfile(userId);
        dispatch(actions.setUserProfile(response));
        dispatch(actions.setLoading(false));
    } 
    catch(e) {
        alert(e.response.data.message);
    }
};
export const getProfileStatus = (userId: number): ThunkType => async (dispatch) => {
    let response = await profileAPI.getProfileStatus(userId);
    dispatch(actions.setProfileStatus(response));
};
export const updateProfileStatus = (status: string): ThunkType => async (dispatch) => {
    let response = await profileAPI.updateProfileStatus(status);
    if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setProfileStatus(status));
    }
};
export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    dispatch(actions.setProccessing(true));
    let response = await profileAPI.updateProfilePhoto(file);
    if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.savePhotoSuccess(response.data));
    }
    dispatch(actions.setProccessing(false));
};

export const saveProfileData = (profile: ProfileType): ThunkType => async (dispatch, getState: () => any) => {
    const userId = getState().auth.userId;
    let response = await profileAPI.updateProfileData(profile);
    if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(getUserProfile(userId));
        dispatch(actions.setProfileDataSuccess(true));
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

type ActionsType = InfernActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | Action>
