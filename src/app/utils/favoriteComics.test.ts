import {
    toggleFavoriteComic,
    getFavoriteComics,
    isComicFavorited,
  } from "@/app/utils/favoriteComics";
  import { Comic } from "@/app/types/comics";
  
  const mockComic: Comic = {
    id: 1,
    title: "Comic 1",
    thumbnail: { path: "path1", extension: "jpg" },
  };
  
  const mockComic2: Comic = {
    id: 2,
    title: "Comic 2",
    thumbnail: { path: "path2", extension: "jpg" },
  };
  
  const FAVORITES_KEY = "favoriteComics";
  
  describe("Favorites Utils", () => {
    beforeEach(() => {
      localStorage.clear();
      jest.clearAllMocks();
    });
  
    describe("getFavoriteComics", () => {
      it("should return an empty list if localStorage has no favorites", () => {
        expect(getFavoriteComics()).toEqual([]);
      });
  
      it("should return favorites stored in localStorage", () => {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify([mockComic]));
        expect(getFavoriteComics()).toEqual([mockComic]);
      });
    });
  
    describe("toggleFavoriteComic", () => {
      it("you should add a comic to favorites if it is not already favorited", () => {
        toggleFavoriteComic(mockComic);
        const favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
        expect(favorites).toEqual([mockComic]);
      });
  
      it("You must remove a comic from favorites if it is already favorited", () => {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify([mockComic]));
        toggleFavoriteComic(mockComic);
        const favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
        expect(favorites).toEqual([]);
      });
    });
  
    describe("isComicFavorited", () => {
      it("must return true if the comic is in favorites", () => {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify([mockComic]));
        expect(isComicFavorited(mockComic.id)).toBe(true);
      });
  
      it("should return false if the comic is not in favorites", () => {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify([mockComic]));
        expect(isComicFavorited(mockComic2.id)).toBe(false);
      });
    });
  });
  