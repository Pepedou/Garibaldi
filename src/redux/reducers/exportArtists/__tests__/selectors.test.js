import * as uut from "../reducer";
import { Selector } from "redux-testkit";
import { mockedExportState } from "../../../../mocks/exportStateMocks";

describe("ExportArtists Selectors", () => {
  it("should get all artists to export", () => {
    const expectedState = [
      {
        id: "ID5000",
        profilesImages: ["1.jpg", "2.jpg"],
        name: "LISA",
        categories: ["ID4000"]
      }
    ];

    Selector(uut.getExportArtists)
      .expect(mockedExportState)
      .toReturn(expectedState);
  });

  it("should get an artist to export by id", () => {
    const expectedState = {
      id: "ID5000",
      profilesImages: ["1.jpg", "2.jpg"],
      name: "LISA",
      categories: ["ID4000"]
    };

    const result = Selector(uut.getExportArtistById).execute(
      mockedExportState,
      "ID5000"
    );
    expect(result).toEqual(expectedState);
  });
});
