import LoginForm from './LoginForm';
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

let store = {
    subscribe: () => {},
    dispatch: () => {},
    getState: () => {
      return {
          addNotification: jest.fn(),
          clearAllNotifications: jest.fn(),
          receiveCurrentUser: jest.fn(),
          loading: jest.fn()
      };
    }
}

it('LoginForm renders', () => {
  const tree = renderer.create(
    <Provider store={store}>
        <MuiThemeProvider>
            <LoginForm/>
        </MuiThemeProvider>
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});