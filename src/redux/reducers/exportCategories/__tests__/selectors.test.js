import * as uut from "../reducer";
import { Selector } from "redux-testkit";
import { mockedExportState } from "../../../../mocks/exportStateMocks";

describe("ExportCategories Selectors", () => {
  it("should get export categories", () => {
    const expectedState = [
      {
        id: "ID4000",
        label: "Integrantes",
        value: "Lisa, Jisoo, Jenny, Rosé"
      }
    ];

    Selector(uut.getExportCategories)
      .expect(mockedExportState)
      .toReturn(expectedState);
  });

  it("should get export category by id", () => {
    const expectedState = {
      id: "ID4000",
      label: "Integrantes",
      value: "Lisa, Jisoo, Jenny, Rosé"
    };

    const result = Selector(uut.getExportCategoryById).execute(
      mockedExportState,
      "ID4000"
    );
    expect(result).toEqual(expectedState);
  });
});
