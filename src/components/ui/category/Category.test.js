import Category from './Category';
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

let props = {
    category:{}
}

it('Category renders', () => {
  const tree = renderer.create(
    <MuiThemeProvider>
        <Category {...props}/>
    </MuiThemeProvider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});