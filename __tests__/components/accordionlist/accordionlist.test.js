import AccordionList from './../../../src/components/accordionlist/accordionlist';
import React from 'react';
import ReactDOM from 'react-dom';

test('AccordionList renders', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AccordionList accordions={[]} />, div);
});