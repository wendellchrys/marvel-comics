'use server';

import { buildMarvelUrl } from "@/app/utils/marvel";

async function fetchMarvelData(endpoint: string, params: Record<string, string> = {}) {
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
}

// Personagens
export async function fetchCharacters(params: Record<string, string> = {}) {
  return fetchMarvelData("/characters", params);
}

export async function fetchCharacterById(characterId: string) {
  return fetchMarvelData(`/characters/${characterId}`);
}

export async function fetchComicsByCharacter(characterId: string, params: Record<string, string> = {}) {
  return fetchMarvelData(`/characters/${characterId}/comics`, params);
}

// Quadrinhos
export async function fetchComics(params: Record<string, string> = {}) {
  return fetchMarvelData("/comics", params);
}

export async function fetchComicById(comicId: string) {
  return fetchMarvelData(`/comics/${comicId}`);
}

export async function fetchCharactersByComic(comicId: string, params: Record<string, string> = {}) {
  return fetchMarvelData(`/comics/${comicId}/characters`, params);
}

// Criadores
export async function fetchCreators(params: Record<string, string> = {}) {
  return fetchMarvelData("/creators", params);
}

export async function fetchCreatorById(creatorId: string) {
  return fetchMarvelData(`/creators/${creatorId}`);
}

// Eventos
export async function fetchEvents(params: Record<string, string> = {}) {
  return fetchMarvelData("/events", params);
}

export async function fetchEventById(eventId: string) {
  return fetchMarvelData(`/events/${eventId}`);
}

// Séries
export async function fetchSeries(params: Record<string, string> = {}) {
  return fetchMarvelData("/series", params);
}

export async function fetchSeriesById(seriesId: string) {
  return fetchMarvelData(`/series/${seriesId}`);
}

// Histórias
export async function fetchStories(params: Record<string, string> = {}) {
  return fetchMarvelData("/stories", params);
}

export async function fetchStoryById(storyId: string) {
  return fetchMarvelData(`/stories/${storyId}`);
}
