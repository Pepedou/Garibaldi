import NotificationComponent from "./NotificationComponent";
import React from "react";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";

let store = {
  subscribe: () => {},
  dispatch: () => {},
  getState: () => {
    return { notifications: [] };
  }
};

it("NotificationComponent renders", () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <NotificationComponent />
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
