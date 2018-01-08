import * as uut from "../reducer";
import { Selector } from "redux-testkit";
import { mockedExportState } from "../../../../mocks/exportStateMocks";

describe("ExportFile Selectors", () => {
  it("should get export file", () => {
    const expectedState = {
      id: "ID2000",
      template: "1000",
      pages: ["3001", "3002"]
    };

    Selector(uut.getExportFile)
      .expect(mockedExportState)
      .toReturn(expectedState);
  });
});
