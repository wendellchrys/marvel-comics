import "dotenv/config";
import { buildMarvelUrl } from "@/app/utils/marvel";

jest.mock("md5");

describe("Marvel Utils", () => {
  beforeAll(() => {
    process.env.MARVEL_API_BASE_URL = "https://gateway.marvel.com/v1/public";
    process.env.MARVEL_PUBLIC_KEY = "test_public_key";
    process.env.MARVEL_PRIVATE_KEY = "test_private_key";
  });

  it("deve gerar uma URL correta com os parâmetros de autenticação", () => {
    const endpoint = "/characters";
    const params = { nameStartsWith: "Spider" };

    const url = buildMarvelUrl(endpoint, params);
    expect(url).toContain("https://gateway.marvel.com/v1/public/characters?");
  });
});
