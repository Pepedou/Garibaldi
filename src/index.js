import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import HomePage from './pages/HomePage/HomePage';
import GalleryPage from './pages/GalleryPage/GalleryPage';
import ArtistsPage from './pages/ArtistsPage/ArtistsPage';
import PlaygroundPage from './pages/PlaygroundPage/PlaygroundPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage';
import Login from './Login';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers'


let store = createStore(reducers)

//TODO: Poner Login como index route y usar login layout - Usar basic layout en vez de HomePage
const router = (
    <Provider store={store}>
        <MuiThemeProvider>
            <Router history={browserHistory}>
                <Route path="/" component={Login} >
                    <Route path="/register" component={RegisterPage} />
                    <Route path="/forgotPassword" component={ForgotPasswordPage} />
                </Route>
                <Route path="/home" component={HomePage}>
                    <IndexRoute component={GalleryPage} />
                    <Route path="/artists" component={ArtistsPage} />
                </Route>
                <Route path="/play" component={PlaygroundPage} />
            </Router>
        </MuiThemeProvider>
    </Provider>
);

ReactDOM.render(router, document.getElementById('root'));
