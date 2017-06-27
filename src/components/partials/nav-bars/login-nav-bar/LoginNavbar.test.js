import LoginNavbar from './LoginNavbar';
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

let store = {
    subscribe: () => {},
    dispatch: () => {},
    getState: () => {
      return {
          selectedOption: ''
      };
    }
}

it('LoginNavbar renders', () => {
  const tree = renderer.create(
    <Provider store={store}>
            <LoginNavbar/>
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});