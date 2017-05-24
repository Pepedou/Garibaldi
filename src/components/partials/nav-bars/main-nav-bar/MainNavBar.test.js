import Navbar from './navbar';
import React from 'react';
import ReactDOM from 'react-dom';

test('Navbar renders', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Navbar />, div);
});