import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import GalleryPage from './pages/GalleryPage/GalleryPage'
import ArtistsPage from './pages/ArtistsPage/ArtistsPage'
import NewArtPage from './pages/NewArtPage/NewArtPage'
import UserProfilePage from './pages/UserProfilePage/UserProfilePage'
import PlaygroundPage from './pages/PlaygroundPage/PlaygroundPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage'
import LoginLayout from './components/layouts/login-layout/LoginLayout'
import BaseLayout from './components/layouts/base/BaseLayout'
import SimpleLayout from './components/layouts/simple/SimpleLayout'
import Login from './Login'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from './redux/reducers'
import * as constants from "./redux/constants"
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

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

export let clearCheckCards = (store) => {
  store.dispatch({type: constants.CLEAR_CHECK_CARDS})
}

export let receiveCurrentUser = (store, currentUser) => {
  store.dispatch({type: constants.CURRENT_USER_RECIEVED, user: currentUser})
}

export let hideLoader = (store) => {
  store.dispatch({type: constants.SHOW_LOADER, showLoader: false})
}

export let everyPageNavigation = store => {
    clearNotifications(store)
    clearCheckCards(store)
    let currentUser = JSON.parse(localStorage.getItem('currentUser')) || {}
    receiveCurrentUser(store, currentUser)
    hideLoader(store)
}

function requireAuth(store, checkLogin) {
  return (nextState, replace) => {
    everyPageNavigation(store)
    if(!localStorage.getItem('currentUser')) {
        if(nextState.location.pathname !== "/" && checkLogin) {
            replace('/')
        }
    } else {
        if(nextState.location.pathname === "/")
            replace('/home')
    }
  };
}

const router = (
    <Provider store={store}>
        <MuiThemeProvider>
            <Router history={browserHistory}>
                <Route path="/" component={LoginLayout}>
                    <IndexRoute component={Login} onEnter={requireAuth(store, false)}/>
                    <Route path="/register" component={RegisterPage} onEnter={requireAuth(store, false)} />
                    <Route path="/forgotPassword" component={ForgotPasswordPage} onEnter={requireAuth(store, false)} />
                </Route>
                <Route path="/home" component={BaseLayout} onEnter={requireAuth(store, true)}>
                    <IndexRoute component={GalleryPage} onEnter={requireAuth(store, true)}/>
                    <Route path="/artists" component={ArtistsPage} onEnter={requireAuth(store, true)}/>
                </Route>
                <Route component={SimpleLayout}>
                    <Route path="/newArt" component={NewArtPage} onEnter={requireAuth(store, true)}/>
                    <Route path="/myUserProfile" component={UserProfilePage} onEnter={requireAuth(store, true)}/>
                </Route>
                <Route path="/play" component={PlaygroundPage} />
            </Router>
        </MuiThemeProvider>
    </Provider>
);

ReactDOM.render(router, document.getElementById('root'));
