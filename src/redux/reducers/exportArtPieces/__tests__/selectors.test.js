import * as uut from "../reducer";
import { Selector } from "redux-testkit";
import { mockedExportState } from "../../../../mocks/exportStateMocks";

describe("ExportArtPieces Selectors", () => {
  it("should get all artpieces to export", () => {
    const expectedState = [
      {
        id: "ID6000",
        image: "1.jpg",
        title: "LISA",
        categories: ["ID4000"]
      }
    ];

    Selector(uut.getExportArtPieces)
      .expect(mockedExportState)
      .toReturn(expectedState);
  });

  it("should get artpiece to export by id", () => {
    const expectedState = {
      id: "ID6000",
      image: "1.jpg",
      title: "LISA",
      categories: ["ID4000"]
    };

    const result = Selector(uut.getExportArtPieceById).execute(
      mockedExportState,
      "ID6000"
    );
    expect(result).toEqual(expectedState);
  });
});
