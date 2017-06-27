import CardComponent from './CardComponent';
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

let props = {
    overlayTitle: '',
    overlaySubtitle: '',
    cardImage: '',
    cardTitle: '',
    cardSubtitle: '',
    cardDescription: '',
    cardActions: ''
}

it('CardComponent renders', () => {
  const tree = renderer.create(
    <MuiThemeProvider>
        <CardComponent {...props}/>
    </MuiThemeProvider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});