import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export function getDefaultStore() {
  return {
    state: {
      characters: {},
      charactersInitial: {},
      characterDetails: {},
      characterEpisodes: {},
      episodes: {},
      episodesList: {},
      episodeCharacters: {},
      episodeDetails: {},
      episodesInitial: {},
      next: 1,
      pages: null,
      loading: false,
      error: false,
    },
    mutations: {
      CHARACTERS(state, payload) {
        if (Object.keys(state.characters).length === 0) {
          state.charactersInitial = payload;
        }
        state.characters = payload;
      },
      NEXT(state, payload) {
        state.next = payload;
      },
      CHARACTER_EPISODES(state, payload) {
        state.characterEpisodes = payload;
      },
      EPISODES_LIST(state, payload) {
        if (Object.keys(state.episodesList).length === 0) {
          state.episodesInitial = payload;
        }
        state.episodesList = payload;
      },
      EPISODE_CHARACTERS(state, payload) {
        state.episodeCharacters = payload;
      },
      EPISODE_DETAILS(state, payload) {
        state.episodeDetails = payload;
      },
      PAGES(state, payload) {
        state.pages = payload;
      },
      LOADING(state, payload) {
        state.loading = payload;
      },
      ERROR(state, payload) {
        state.error = payload;
      },
    },
    actions: {},
    getters: {
      GET_CHARACTERS: (state) => {
        return state.characters;
      },
      GET_CHARACTERS_INITIAL: (state) => {
        return state.charactersInitial;
      },
      GET_CHARACTER_EPISODES: (state) => {
        return state.characterEpisodes;
      },
      GET_EPISODES_LIST: (state) => {
        return state.episodesList;
      },
      GET_EPISODES_INITIAL: (state) => {
        return state.episodesInitial;
      },
      GET_EPISODE_CHARACTERS: (state) => {
        return state.episodeCharacters;
      },
      GET_EPISODE_DETAILS: (state) => {
        return state.episodeDetails;
      },
      GET_NEXT_PAGE: (state) => {
        return state.next;
      },
      GET_TOTAL_PAGES: (state) => {
        return state.pages;
      },
      LOADING: (state) => {
        return state.loading;
      },
      ERROR: (state) => {
        return state.error;
      },
    },
  };
}

export default new Vuex.Store(getDefaultStore());
