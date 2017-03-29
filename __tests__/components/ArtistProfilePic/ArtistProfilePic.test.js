import ArtistProfilePic from './../../../src/components/ArtistProfilePic/ArtistProfilePic';
import React from 'react';
import ReactDOM from 'react-dom';

test('ArtistProfilePic renders', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ArtistProfilePic />, div);
});