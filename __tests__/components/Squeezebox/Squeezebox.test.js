import SqueezeBox from './../../../src/components/Squeezebox/Squeezebox';
import React from 'react';
import ReactDOM from 'react-dom';

test('SqueezeBox renders', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SqueezeBox />, div);
});