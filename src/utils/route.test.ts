import { route } from "./route";

describe("route function", () => {
  it("without any parameters", () => {
    expect(route("favorites")).toBe("/favorites");
  });

  it("with query parameters", () => {
    expect(route("search", { query: { page: 2, query: "marvel" } })).toBe(
      "/search?page=2&query=marvel"
    );
  });

  it("with route parameters", () => {
    expect(route("nowPlaying", { route: { page: "3" } })).toBe(
      "/now-playing/3"
    );
  });

  it("with route and query parameters", () => {
    expect(
      route("movieDetails", {
        route: { movieId: "3" },
        query: { fromPage: "nowPlaying" },
      })
    );
  });
});
