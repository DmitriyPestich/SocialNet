import {giphyAPI} from "../API/GiphyApi";
import {BaseThunkType, InfernActionsTypes} from "./redux-store";

let initialState = {
    giphyId: null as number | null, //array ids of giphy
    blocked: false
};

export type InitialStateType = typeof initialState;

const giphyReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SAVE_GIPHY': {
            return {
                ...state,
                giphyId: action.payload,
            };
        }
        default:
            return state;
    }
};

export const actions = {
    addGiphy: (giphyId: number) => ({type : 'SAVE_GIPHY', payload: giphyId} as const)
};

export const saveGiphy = (file: File): ThunkType => async (dispatch) => {
    let response = await giphyAPI.uploadGiphy(file);
    console.log(response)
};

export default giphyReducer;

type ActionsType = InfernActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>
