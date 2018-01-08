import { Reducer } from "redux-testkit";
import theReducer, { initialState } from "../reducer";
import * as actionTypes from "../actionTypes";

describe("ExportFile Reducer", () => {
  it("should have initial state", () => {
    expect(theReducer()).toEqual(initialState);
  });

  it("should not affect state", () => {
    Reducer(theReducer)
      .expect({
        type: "NOT_EXISTING_TYPE"
      })
      .toReturnState(initialState);
  });

  it("should reset state", () => {
    Reducer(theReducer)
      .expect({
        type: actionTypes.EXPORT_FILE_RESET
      })
      .toReturnState(initialState);
  });

  it("should update single file property", () => {
    const resultState = {
      IDFILE: {
        id: "IDFILE",
        template: "a102930"
      }
    };

    Reducer(theReducer)
      .expect({
        type: actionTypes.EXPORT_FILE_UPDATE_FILE,
        payload: {
          IDFILE: {
            id: "IDFILE",
            template: "a102930"
          }
        }
      })
      .toReturnState(resultState);
  });

  it("should update multiple file properties", () => {
    const resultState = {
      id: "1010",
      template: "a102930",
      pages: ["1000", "1001"]
    };

    Reducer(theReducer)
      .expect({
        type: actionTypes.EXPORT_FILE_UPDATE_FILE,
        payload: {
          id: "1010",
          template: "a102930",
          pages: ["1000", "1001"]
        }
      })
      .toReturnState(resultState);
  });
});
