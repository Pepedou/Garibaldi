import DefaultButton from './DefaultButton';
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

let props = {
    label: '',
    labelPosition: '',
    onTouchTap: jest.fn(),
    className: '',
    floatStyle: ''
}

it('DefaultButton renders', () => {
  const tree = renderer.create(
    <MuiThemeProvider>
        <DefaultButton {...props}/>
    </MuiThemeProvider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});