import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {addDialogMessage, addPost, updateNewMessageText, updateNewPostText} from "./redux/state";

export let rerenderEntireTree = (state) => {
    ReactDOM.render(
        <React.StrictMode>
            <App
                state={state}
                addPost={addPost}
                updateNewPostText={updateNewPostText}
                addDialogMessage={addDialogMessage}
                updateNewMessageText={updateNewMessageText}/>
        </React.StrictMode>,
        document.getElementById('root')
    );
};



