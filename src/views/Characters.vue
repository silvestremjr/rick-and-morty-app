<template>
  <div class="home">
    <div class="my-4 d-flex justify-content-between">
      <h1>Characters</h1>
      <SearchBar @search="searchCharacters" />
    </div>

    <template v-if="!error">
      <div class="container">
        <div class="row mb-3">
          <button
            @click="orderBy('name')"
            class="btn btn-primary ml-2"
            v-if="!loading"
          >
            Order by bame
          </button>
          <button
            @click="orderBy('id')"
            class="btn btn-primary ml-2"
            v-if="!loading"
          >
            Order by ID
          </button>
        </div>
        <div class="row row-cols-1 row-cols-md-4">
          <CharacterDetails
            v-for="character in characters"
            :key="character.id"
            :details="character"
          />
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

import CharacterDetails from "../components/CharacterDetails";
import SearchBar from "../components/SearchBar";
import ShowMore from "../components/ShowMore";

export default {
  name: "Characters",
  components: {
    CharacterDetails,
    SearchBar,
    ShowMore,
  },
  apollo: {
    characters() {
      return {
        query: gql`
          query characters($page: Int!, $name: String) {
            characters(page: $page, filter: { name: $name }) {
              info {
                count
                next
                pages
              }
              results {
                id
                name
                status
                origin {
                  name
                }
                episode {
                  id
                  name
                  episode
                }
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
          if (typeof data.characters !== null) {
            this.$store.commit("CHARACTERS", data.characters.results);
            this.$store.commit("NEXT", data.characters.info.next);
            this.$store.commit("PAGES", data.characters.info.pages);
          }
        },
        error(err) {
          this.$store.commit("ERROR", true);
        },
      };
    },
  },
  methods: {
    orderBy(param) {
      this.isOrdered = !this.isOrdered;
      return this.characters.sort((a, b) => {
        if (param == "id") {
          return Math.abs(a[param]) > Math.abs(b[param])
            ? !this.isOrdered
              ? 1
              : -1
            : !this.isOrdered
            ? -1
            : 1;
        } else {
          return a[param] > b[param]
            ? !this.isOrdered
              ? 1
              : -1
            : !this.isOrdered
            ? -1
            : 1;
        }
      });
    },
    showMore() {
      this.$apollo.queries.characters.fetchMore({
        variables: {
          page: this.next,
        },

        updateQuery: (previousResult, { fetchMoreResult }) => {
          const results = [
            ...this.characters,
            ...fetchMoreResult.characters.results,
          ];
          this.$store.commit("CHARACTERS", results);
          this.$store.commit("NEXT", fetchMoreResult.characters.info.next);
          this.$store.commit("PAGES", fetchMoreResult.characters.info.pages);
        },
      });
    },
    searchCharacters(term) {
      if (term !== "") {
        this.$apollo.queries.characters.setVariables({
          page: 1,
          name: term,
        });
      } else {
        this.$store.commit("ERROR", false);
        this.$store.commit("CHARACTERS", this.charactersInitial);
      }
    },
  },
  computed: {
    characters() {
      return this.$store.getters.GET_CHARACTERS;
    },
    charactersInitial() {
      return this.$store.getters.GET_CHARACTERS_INITIAL;
    },
    loading() {
      return this.$store.getters.LOADING;
    },
    error() {
      return this.$store.getters.ERROR;
    },
    next() {
      return this.$store.getters.GET_NEXT_PAGE;
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
