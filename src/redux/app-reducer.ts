import {chekAuthMe} from "./auth-reducer";
import {BaseThunkType, InfernActionsTypes} from "./redux-store";

type InitialStateType = {
    initialized: boolean
}

let initialState: InitialStateType = {
    initialized: false
};

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET_INITIALIZED': {
            return {
                ...state,
                initialized: true
            }
        }
        default:
            return state;
    }
};

export const actions = {
    initializedSuccess: () => ({type : 'SET_INITIALIZED'} as const)
};

export const initializedApp = (): ThunkType => (dispatch) => {
    let promise = dispatch(chekAuthMe());
    Promise.all([promise])
        .then(() => {
        dispatch(actions.initializedSuccess());
    });
};

export default appReducer;

type ActionsType = InfernActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>
