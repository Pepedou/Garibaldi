import Mosaic from './mosaic';
import React from 'react';
import ReactDOM from 'react-dom';

test('Mosaic renders', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Mosaic />, div);
});