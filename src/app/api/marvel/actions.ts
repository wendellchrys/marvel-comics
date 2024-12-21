import { buildMarvelUrl } from "@/app/utils/marvel";

const fetchMarvelData = async (endpoint: string, params: Record<string, string> = {}) => {
    const url = buildMarvelUrl(endpoint, params);
  
    try {
      const response = await fetch(url, { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`Erro ao buscar dados da API Marvel: ${response.statusText}`);
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error(`Erro ao buscar ${endpoint}:`, error);
      throw error;
    }
  };
  

// Personagens
export const fetchCharacters = (params: Record<string, string> = {}) =>
  fetchMarvelData("/characters", params);

export const fetchCharacterById = (characterId: string) =>
  fetchMarvelData(`/characters/${characterId}`);

export const fetchComicsByCharacter = (characterId: string, params: Record<string, string> = {}) =>
  fetchMarvelData(`/characters/${characterId}/comics`, params);

// Quadrinhos
export const fetchComics = (params: Record<string, string> = {}) =>
  fetchMarvelData("/comics", params);

export const fetchComicById = (comicId: string) =>
  fetchMarvelData(`/comics/${comicId}`);

export const fetchCharactersByComic = (comicId: string, params: Record<string, string> = {}) =>
  fetchMarvelData(`/comics/${comicId}/characters`, params);

// Criadores
export const fetchCreators = (params: Record<string, string> = {}) =>
  fetchMarvelData("/creators", params);

export const fetchCreatorById = (creatorId: string) =>
  fetchMarvelData(`/creators/${creatorId}`);

// Eventos
export const fetchEvents = (params: Record<string, string> = {}) =>
  fetchMarvelData("/events", params);

export const fetchEventById = (eventId: string) =>
  fetchMarvelData(`/events/${eventId}`);

// Séries
export const fetchSeries = (params: Record<string, string> = {}) =>
  fetchMarvelData("/series", params);

export const fetchSeriesById = (seriesId: string) =>
  fetchMarvelData(`/series/${seriesId}`);

// Histórias
export const fetchStories = (params: Record<string, string> = {}) =>
  fetchMarvelData("/stories", params);

export const fetchStoryById = (storyId: string) =>
  fetchMarvelData(`/stories/${storyId}`);
