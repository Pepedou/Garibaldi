import UserForm from './UserForm';
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const user = {
    username: "username",
    password: "password",
    email: "email@gmail.com",
    name: "name",
    lastName: "lastName",
    birthDate: "birthDate",
    address1: "Acordada #23",
    address2: "Lomas Verdes",
    city: "México",
    state: "Estado de México",
    country: "México",
    userType: "1"
}

let store = {
    subscribe: () => {},
    dispatch: () => {},
    getState: () => {
      return {
          addNotification: jest.fn(),
          clearAllNotifications: jest.fn(),
          loading: jest.fn()
      };
    }
}

it('UserForm renders', () => {
  const tree = renderer.create(
    <Provider store={store}>
        <MuiThemeProvider>
            <UserForm/>
        </MuiThemeProvider>
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});