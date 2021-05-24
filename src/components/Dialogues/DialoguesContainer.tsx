import React from 'react';
import {addDialogMessage, DialogsType, MessaguesType} from "../../redux/dialog-reducer";
import Dialogues from "./Dialogues";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
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

const DialoguesContainer = compose(
    withAuthRedirect,
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {addDialogMessage})
)(Dialogues);


export default DialoguesContainer;
