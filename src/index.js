import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import App from './App';
import GalleryPage from './pages/GalleryPage/GalleryPage';
import ArtistsPage from './pages/ArtistsPage/ArtistsPage';
import PlaygroundPage from './pages/PlaygroundPage/PlaygroundPage';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import Login from './Login';
import Register from './pages/Register/Register';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const router = (
    <MuiThemeProvider>
        <Router history={browserHistory}>
            <Route path="/" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/forgotPassword" component={ForgotPassword} />
            <Route path="/home" component={App}>
                <IndexRoute component={GalleryPage} />
                <Route path="/artists" component={ArtistsPage} />
            </Route>
            <Route path="/play" component={PlaygroundPage} />
        </Router>
    </MuiThemeProvider>
);

ReactDOM.render(router, document.getElementById('root'));
