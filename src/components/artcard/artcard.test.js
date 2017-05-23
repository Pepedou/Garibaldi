import ArtCard from './artcard';
import React from 'react';
import ReactDOM from 'react-dom';

test('Artcard renders', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ArtCard detail={{name:'Art 1'}} />, div);
});