import ArtistsServices from "../artistServices";

describe("ArtistsServices", () => {
  it("should retrive detailsFor multiple artists", async () => {
    const response = await ArtistsServices.detailFor([
      "59f6886f9373be0004b3f06b"
    ]);
    expect(response.details).toBeInstanceOf(Array);
  });
});
