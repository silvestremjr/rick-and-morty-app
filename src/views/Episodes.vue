<template>
  <div class="home">
    <div class="my-4 d-flex justify-content-between">
      <h1>Episodes</h1>
      <SearchBar @search="searchEpisodes" />
    </div>

    <template v-if="!error">
      <div class="container">
        <div class="row row-cols-1 row-cols-md-4">
          <EpisodesList />
        </div>
      </div>

      <ShowMore @showMore="showMore" />
    </template>

    <NoResults v-if="error" />

    <Loading v-if="loading" />

    <Scroll />
  </div>
</template>

<script>
import gql from "graphql-tag";

import EpisodesList from "../components/EpisodesList";
import SearchBar from "../components/SearchBar";
import ShowMore from "../components/ShowMore";

export default {
  name: "Episodes",
  components: {
    EpisodesList,
    SearchBar,
    ShowMore,
  },
  apollo: {
    episodes() {
      return {
        query: gql`
          query episodes($page: Int!, $name: String) {
            episodes(page: $page, filter: { name: $name }) {
              info {
                count
                next
                pages
              }
              results {
                id
                name
                characters {
                  id
                  name
                }
                episode
              }
            }
          }
        `,
        variables: {
          page: 1,
          name: "",
        },
        watchLoading(isLoading, countModifier) {
          this.$store.commit("LOADING", isLoading);
        },
        update(data) {
          if (typeof data.episodes !== null) {
            this.$store.commit("EPISODES_LIST", data.episodes.results);
            this.$store.commit("NEXT", data.episodes.info.next);
            this.$store.commit("PAGES", data.episodes.info.pages);
          }
        },
        error(err) {
          setTimeout(function() {
            this.episodes = this.episodesInitial;
          }, 500);
          this.$store.commit("ERROR", true);
        },
      };
    },
  },
  methods: {
    showMore() {
      this.$apollo.queries.episodes.fetchMore({
        variables: {
          page: this.next,
        },

        updateQuery: (previousResult, { fetchMoreResult }) => {
          const results = [
            ...this.episodes,
            ...fetchMoreResult.episodes.results,
          ];
          this.$store.commit("EPISODES_LIST", results);
          this.$store.commit("NEXT", fetchMoreResult.episodes.info.next);
          this.$store.commit("PAGES", fetchMoreResult.episodes.info.pages);
        },
      });
    },
    searchEpisodes(term) {
      if (term !== "") {
        this.$apollo.queries.episodes.setVariables({
          page: 1,
          name: term,
        });
      } else {
        this.$store.commit("ERROR", false);
        this.$store.commit("EPISODES_LIST", this.episodesInitial);
      }
    },
  },
  computed: {
    episodes: {
      get: function() {
        return this.$store.getters.GET_EPISODES_LIST;
      },
      set: function(ep) {
        this.episodes = ep;
      },
    },
    episodesInitial() {
      return this.$store.getters.GET_EPISODES_INITIAL;
    },
    next() {
      return this.$store.getters.GET_NEXT_PAGE;
    },
    pages() {
      return this.$store.getters.GET_TOTAL_PAGES;
    },
    loading() {
      return this.$store.getters.LOADING;
    },
    error() {
      return this.$store.getters.ERROR;
    },
  },
  watch: {},
  data: () => ({
    showMoreEnabled: true,
    isOrdered: false,
  }),
};
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
}
</style>
