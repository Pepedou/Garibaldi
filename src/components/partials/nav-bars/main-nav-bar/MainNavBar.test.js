import MainNavBar from './MainNavBar';
import React from 'react';
import renderer from 'react-test-renderer';

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

it('MainNavBar renders', () => {
  const tree = renderer.create(
    <MainNavBar user={user}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});