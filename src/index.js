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


let store = createStore(
 reducers,
 {},
 compose(
   applyMiddleware(thunk),
   window.devToolsExtension ? window.devToolsExtension() : f => f
 ))

//TODO: Poner Login como index route y usar login layout - Usar basic layout en vez de HomePage
const router = (
    <Provider store={store}>
        <MuiThemeProvider>
            <Router history={browserHistory}>
                <Route path="/" component={LoginLayout} >
                    <IndexRoute component={Login} />
                    <Route path="/register" component={RegisterPage} />
                    <Route path="/forgotPassword" component={ForgotPasswordPage} />
                </Route>
                <Route path="/home" component={BaseLayout}>
                    <IndexRoute component={GalleryPage} />
                    <Route path="/artists" component={ArtistsPage} />
                </Route>
                <Route path="/play" component={PlaygroundPage} />
            </Router>
        </MuiThemeProvider>
    </Provider>
);

ReactDOM.render(router, document.getElementById('root'));
