import {giphyAPI} from "../API/api";
const SAVE_GIPHY = 'ADD-SAVE_GIPHY';

let initialState = {
    giphyId: null as number | null, //array ids of giphy
    blocked: false
};

export type InitialStateType = typeof initialState;

const giphyReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SAVE_GIPHY: {
            return {
                ...state,
                giphyId: action.payload,
            };
        }
        default:
            return state;
    }
};

type AddGiphyType = {
    type: typeof SAVE_GIPHY,
    payload: number
}
export const addGiphy = (giphyId: number): AddGiphyType => ({type : SAVE_GIPHY, payload: giphyId});

export const saveGiphy = (file: any) => async (dispatch: any) => {
    let response = await giphyAPI.uploadGiphy(file);
    console.log('resp', response);
};

export default giphyReducer;
