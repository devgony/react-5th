import { CategoryNode, CategoryMap } from "./category";

describe("CategoryNode", () => {
  let categoryNode = new CategoryNode("Wanted");

  it("should return the current category", () => {
    expect(categoryNode.currentCategory()).toEqual(CategoryMap["Wanted"]);
  });

  it("should return the Visited category", () => {
    categoryNode = categoryNode.next();
    expect(categoryNode).toEqual(new CategoryNode("Visited"));
  });

  it("should return the Liked category", () => {
    categoryNode = categoryNode.next();
    expect(categoryNode).toEqual(new CategoryNode("Liked"));
  });

  it("shoud throw error on next of Liked category", () => {
    expect(() => categoryNode.next()).toThrow("Next is not available");
  });

  it("shoud return the Visited category", () => {
    categoryNode = categoryNode.prev();
    expect(categoryNode).toEqual(new CategoryNode("Visited"));
  });

  it("shoud return the Wanted category", () => {
    categoryNode = categoryNode.prev();
    expect(categoryNode).toEqual(new CategoryNode("Wanted"));
  });

  it("shoud throw error on prev of Wanted category", () => {
    expect(() => categoryNode.prev()).toThrow("Prev is not available");
  });

  it("shoud move to the next category", () => {
    const key = "USA";
    const countries = new Map<string, CategoryNode>();
    const setCountries = jest.fn();

    categoryNode.moveNext(key, countries, setCountries);

    const expectedCountries = new Map<string, CategoryNode>([
      [key, new CategoryNode("Visited")],
    ]);
    expect(setCountries).toHaveBeenCalledWith(expectedCountries);
    categoryNode = categoryNode.next();
  });

  it("should move to the previous category", () => {
    const key = "USA";
    const countries = new Map<string, CategoryNode>([
      [key, new CategoryNode("Visited")],
    ]);
    const setCountries = jest.fn();

    categoryNode.movePrev(key, countries, setCountries);

    const expectedCountries = new Map<string, CategoryNode>([
      [key, new CategoryNode("Wanted")],
    ]);
    expect(setCountries).toHaveBeenCalledWith(expectedCountries);
  });
});
