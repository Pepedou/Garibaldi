import ArtPiecesServices from "../artPiecesServices";

describe("ArtPiecesServices", () => {
  it("should retrive detailsFor multiple art pieces", async () => {
    const response = await ArtPiecesServices.detailFor([
      "5987ed014a860000047cd9f8"
    ]);
    expect(response.details).toBeInstanceOf(Array);
  });
});
