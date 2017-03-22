import ArtistCover from './../../../src/components/artistcover/artistcover';
import React from 'react';
import ReactDOM from 'react-dom';

test('ArtistCover renders', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ArtistCover />, div);
});