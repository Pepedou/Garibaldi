import ArtistProfileInfo from './ArtistProfileInfo';
import React from 'react';
import ReactDOM from 'react-dom';

test('ArtistProfileInfo renders', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ArtistProfileInfo />, div);
});