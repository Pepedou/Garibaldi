import Accordion from './../../../src/components/accordion/accordion';
import React from 'react';
import ReactDOM from 'react-dom';

test('Accordion renders', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Accordion type='something' content={{description: 'Yeah' }} />, div);
});