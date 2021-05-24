import {chekAuthMe} from "./auth-reducer";

const SET_INITIALIZED = 'SET_INITIALIZED';

type InitialStateType = {
    initialized: boolean
}

let initialState: InitialStateType = {
    initialized: false
};

const appReducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {
        case SET_INITIALIZED: {
            return {
                ...state,
                initialized: true
            }
        }
        default:
            return state;
    }
};

type InitializedSuccessType = {
    type: typeof SET_INITIALIZED
}

export const initializedSuccess = (): InitializedSuccessType =>
    ({type : SET_INITIALIZED});

export const initializedApp = () => (dispatch: any) => {
    let promise = dispatch(chekAuthMe());
    Promise.all([promise])
        .then(() => {
        dispatch(initializedSuccess());
    });
};


export default appReducer;
