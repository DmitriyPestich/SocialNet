import profileReducer from "./profile-reducer";
import dialogReducer from "./dialog-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {
    _state: {
        profilePage: {
            post: [
                {id: 1, message: 'Hello', CountLike: 12},
                {id: 2, message: 'Hello, how are you', CountLike: 5},
                {id: 3, message: 'I`m ok', CountLike: 16}
            ],
            newPostText: 'yuyuyqq'
        },

        dialoguesPage: {
            dialogs: [
                {id: 1, name: 'Kostya'},
                {id: 2, name: 'Sonya'},
                {id: 3, name: 'Roma'},
                {id: 4, name: 'Den'},
                {id: 5, name: 'Vlad'},
                {id: 6, name: 'Ira'}
            ],
            messagues: [
                {id: 1, message: 'Hi'},
                {id: 2, message: 'Hello'},
                {id: 3, message: 'My name is Dima'},
                {id: 4, message: 'Ok'}
            ],
            newMessageText: '1212'
        },
        sidebarPage: {
            itemMenu: [
                {url: '/profile', title: 'Profile'},
                {url: '/messages', title: 'Messages'},
                {url: '/news', title: 'News'},
                {url: '/music', title: 'Music'},
                {url: '/settings', title: 'Settings'}
            ],
            friends: [
                {id: 1, name: 'Roma'},
                {id: 2, name: 'Dima'},
                {id: 3, name: 'Den'}
            ]
        }
    },
    _callSubscriber() {
        console.log('no subscribes');
    },
    getState(){
      return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialoguesPage = dialogReducer(this._state.dialoguesPage, action);
        this._state.sidebarPage = sidebarReducer(this._state.sidebarPage, action);

        this._callSubscriber( );
    }
};

export default store;


