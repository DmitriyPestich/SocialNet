import * as serviceWorker from './serviceWorker';
import ReactDOM from "react-dom";
import React from "react";
import SocNetApp from "./App";
import "./assets/fontawesome/index"
import store from "./redux/redux-store";

// setInterval(() => {store.dispatch({type: "FAKE"})},1000);
/*import {Provider} from "./storeContext";*/

ReactDOM.render(<SocNetApp />, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
