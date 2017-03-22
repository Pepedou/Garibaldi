import ArtCardGrid from './../../../src/components/artcardgrid/artcardgrid';
import React from 'react';
import ReactDOM from 'react-dom';

test('ArtCardGrid renders', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ArtCardGrid cards={[]} />, div);
});