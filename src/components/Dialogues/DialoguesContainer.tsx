import React from 'react';
import {actions, ActionsType, DialogsType, MessaguesType} from "../../redux/dialog-reducer";
import Dialogues from "./Dialogues";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose, Dispatch} from "redux";
import {AppStateType} from "../../redux/redux-store";

/*function DialoguesContainer(props) {

    return (
        <StoreContext.Consumer>
            {
                (store) => {
                    let state = store.getState();

                    let onAddMessage = () => {
                        store.dispatch(addDialogMessageActionCreator());
                    };
                    let onChangeValue = (text) => {
                        let action = updateNewMessageTextActionCreator(text);
                        store.dispatch(action);
                    };
                    return <Dialogues
                        updateNewMessageText={onChangeValue}
                        addDialogMessage={onAddMessage}
                        newMessageText={state.dialoguesPage.newMessageText}
                        dialogs={state.dialoguesPage.dialogs}
                        messagues={state.dialoguesPage.messagues}
                    />
                }
            }
        </StoreContext.Consumer>

    );


}*/

type MapStatePropsType = {
    dialogs: Array<DialogsType>,
    messagues: Array<MessaguesType>,
}
type MapDispatchPropsType = {
    addDialogMessage: (messageText: string) => void
}
type OwnPropsType = {

}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        dialogs: state.dialoguesPage.dialogs,
        messagues: state.dialoguesPage.messagues,
    }
};

/*let mapDispatchToProps = (dispatch) => {
    return {
        updateNewMessageText: (text) => {
            let action = updateNewMessageTextActionCreator(text);
            dispatch(action);
        },
        addDialogMessage: () => {
            dispatch(addDialogMessageActionCreator());
        }
    }
};*/

let mapDispatchToProps = (dispatch: Dispatch<ActionsType>) => {
    return {
        addDialogMessage: (messageText: string) => {
            dispatch(actions.addDialogMessage(messageText));
        }
    }
};

const DialoguesContainer = compose(
    withAuthRedirect,
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps,
        {addDialogMessage: actions.addDialogMessage}
    )
)(Dialogues);


export default DialoguesContainer;
