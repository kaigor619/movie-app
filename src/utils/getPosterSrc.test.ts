import { getPosterSrc } from "./getPosterSrc";

describe("check getPosterSrc", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV, REACT_APP_API_POSTER_URL: "https://image.org" };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it("check correct return value", () => {
    expect(getPosterSrc("/picture.jpg", 780)).toBe(
      "https://image.org/w780/picture.jpg"
    );
    expect(getPosterSrc("/image.png", 92)).toBe(
      "https://image.org/w92/image.png"
    );
  });
});
