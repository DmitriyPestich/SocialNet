import React, {Component} from 'react';
import './App.css';
import Sidebar from "./components/Sidebar/Sidebar"
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import GiphyContainer from "./components/Giphy/GiphyContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginContainer from "./components/Login/LoginContainer";
import {compose} from "redux";
import {connect, Provider} from "react-redux";
import {initializedApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/redux-store";
import {withSuspense} from "./hoc/WithLazyLoad";

const DialoguesContainer = React.lazy(() => import('./components/Dialogues/DialoguesContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

class App extends Component {

    catchAllUnhandleErrors = (promiseRejectionEvent) => {
        alert('Some error occured');
    };

    componentDidMount() {
        this.props.initializedApp();
        window.addEventListener("unhandledrejection", this.catchAllUnhandleErrors)
    }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandleErrors)
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        } else {
            return (
                <div className="App">
                    <div className="app_wrapper">
                        <HeaderContainer/>
                        <Sidebar/>
                        <div className="app_wrapper_content">
                            <Route path="/profile/:userId?" render={withSuspense(ProfileContainer)}/>
                            <Route path="/messages" render={withSuspense(DialoguesContainer)}
                            />
                            <Route path="/news" render={() => <News/>}/>
                            <Route path="/music" render={() => <Music/>}/>
                            <Route path="/giphy" render={() => <GiphyContainer/>}/>
                            <Route path="/users" render={() => <UsersContainer/>}/>
                            <Route path="/login" render={() => <LoginContainer/>}/>
                            <Route path="/settings" render={() => <Settings/>}/>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

let mapStateToProps = (state) => {
    return {
        initialized: state.app.initialized
    }
};

const AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {
        initializedApp
    }))(App);

const SocNetApp = (props) => {
    return <Provider store={store}>
            <BrowserRouter>
                <AppContainer />
            </BrowserRouter>
    </Provider>
}

export default SocNetApp;


