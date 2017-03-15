import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import App from './App';
import GalleryPage from './pages/GalleryPage/GalleryPage';
import ArtistsPage from './pages/ArtistsPage/ArtistsPage';

const router = (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={GalleryPage} />
            <Route path="/artists" component={ArtistsPage} />
        </Route>
    </Router>
);

ReactDOM.render(router, document.getElementById('root'));
