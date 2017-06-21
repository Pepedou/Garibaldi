import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import GalleryPage from './pages/GalleryPage/GalleryPage';
import ArtistsPage from './pages/ArtistsPage/ArtistsPage';
import PlaygroundPage from './pages/PlaygroundPage/PlaygroundPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage';
import LoginLayout from './components/layouts/login-layout/LoginLayout'
import BaseLayout from './components/layouts/base/BaseLayout'
import Login from './Login';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import reducers from './redux/reducers'
import * as constants from "./redux/constants"
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

let store = createStore(
 reducers,
 {},
 compose(
   applyMiddleware(thunk),
   window.devToolsExtension ? window.devToolsExtension() : f => f
 ))

export let clearNotifications = (store) => {
  store.dispatch({type: constants.CLEAR_ALL_NOTIFICATIONS})
}

export let receiveCurrentUser = (store, currentUser) => {
  store.dispatch({type: constants.CURRENT_USER_RECIEVED, user: currentUser})
}

export let hideLoader = (store) => {
  store.dispatch({type: constants.SHOW_LOADER, showLoader: false})
}

export let everyPageNavigation = store => {
    clearNotifications(store)
    let currentUser = JSON.parse(sessionStorage.getItem('currentUser')) || {}
    receiveCurrentUser(store, currentUser)
    hideLoader(store)
 }

let requireAuth = (nextState, replace) =>
{
   if(!sessionStorage.getItem('currentUser'))
     replace('/');
}

const router = (
    <Provider store={store}>
        <MuiThemeProvider>
            <Router history={browserHistory}>
                <Route path="/" component={LoginLayout}>
                    <IndexRoute component={Login} onChange={everyPageNavigation(store)}/>
                    <Route path="/register" component={RegisterPage} onChange={everyPageNavigation(store)} />
                    <Route path="/forgotPassword" component={ForgotPasswordPage} onChange={everyPageNavigation(store)} />
                </Route>
                <Route path="/home" component={BaseLayout} onChange={everyPageNavigation(store)}>
                    <IndexRoute component={GalleryPage} onEnter={requireAuth} onChange={everyPageNavigation(store)}/>
                    <Route path="/artists" component={ArtistsPage} onEnter={requireAuth} onChange={everyPageNavigation(store)}/>
                </Route>
                <Route path="/play" component={PlaygroundPage} />
            </Router>
        </MuiThemeProvider>
    </Provider>
);

ReactDOM.render(router, document.getElementById('root'));
