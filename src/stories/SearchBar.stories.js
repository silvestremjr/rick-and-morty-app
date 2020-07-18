import SearchBar from "../components/SearchBar";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default {
  title: "Search Bar",
  component: SearchBar,
};

export const Default = () => ({
  components: { SearchBar },
  excludeStories: /.*Data$/,
  template: '<SearchBar @search="searchCharacters" />',
});
