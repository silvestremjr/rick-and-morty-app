import ShowMore from "../components/ShowMore";
import Vue from 'vue';
import Vuex from "vuex";

Vue.use(Vuex)

export default {
  title: "Show More",
  component: ShowMore,
};

export const Default = () => ({
  components: { ShowMore },
  excludeStories: /.*Data$/,
  template: '<ShowMore @showMore="showMore" />',
  store: new Vuex.Store({
    state: {
      next: 1,
      pages: 1,
      loading: false,
    },
    getters: {
      GET_NEXT_PAGE: (state) => {
        return state.next;
      },
      GET_TOTAL_PAGES: (state) => {
        return state.pages;
      },
      LOADING: (state) => {
        return state.loading;
      },
    },
  }),
});
