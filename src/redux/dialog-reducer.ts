import {InfernActionsTypes} from "./redux-store";

export type DialogsType = {
    id: number,
    name: string
}
export type MessaguesType = {
    id: number,
    message: string
}

let initialState = {
    dialogs: [
        {id: 1, name: 'Kostya'},
        {id: 2, name: 'Sonya'},
        {id: 3, name: 'Roma'},
        {id: 4, name: 'Den'},
        {id: 5, name: 'Vlad'},
        {id: 6, name: 'Ira'}
    ] as Array<DialogsType>,
    messagues: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'Hello'},
        {id: 3, message: 'My name is Dima'},
        {id: 4, message: 'Ok'}
    ] as Array<MessaguesType>
};

type InitialStateType = typeof initialState;

const dialogReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case 'ADD_DIALOG_MESSAGE': {
            return {
                ...state,
                messagues: [...state.messagues, {id: 5, message: action.messageText}],
            };
        }
        default:
            return state;
    }
};

export const actions = {
    addDialogMessage: (messageText: string) => ({type : 'ADD_DIALOG_MESSAGE', messageText} as const)
}

export default dialogReducer;

export type ActionsType = InfernActionsTypes<typeof actions>

