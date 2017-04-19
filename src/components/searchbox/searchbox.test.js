import SearchBox from './searchbox';
import React from 'react';
import ReactDOM from 'react-dom';

test('Searchbox renders', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SearchBox />, div);
});