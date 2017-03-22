import ExtendedCard from './../../../src/components/extendedcard/extendedcard';
import React from 'react';
import ReactDOM from 'react-dom';

test('ExtendedCard renders', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ExtendedCard detail={{name: 'Something'}} />, div);
});