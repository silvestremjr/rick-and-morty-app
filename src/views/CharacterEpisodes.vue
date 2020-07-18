<template>
  <div class="container">
    <div v-if="!loading" class="row my-4">
      <div class="col-md-4">
        <CharacterDetails
          :details="character"
          :episodes="true"
          v-if="!loading"
        />
      </div>
      <div class="col-md-8">
        <h2>Episodes</h2>

        <EpisodesList />
      </div>
    </div>
    <Loading v-if="loading" />
    
    <Scroll />
  </div>
</template>
<script>
import gql from "graphql-tag";

import CharacterDetails from "../components/CharacterDetails";
import EpisodesList from "../components/EpisodesList";

export default {
  name: "CharacterEpisodes",
  components: {
    CharacterDetails,
    EpisodesList,
  },
  props: ["id"],
  apollo: {
    character() {
      return {
        query: gql`
          query character($id: ID!) {
            character(id: $id) {
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
        `,
        variables: {
          id: this.id,
        },
        update(data) {
          if (typeof data.character !== null) {
            this.$store.commit("CHARACTER_EPISODES", data.character);
            this.$store.commit("EPISODES_LIST", data.character.episode);
          }
        },
        watchLoading(isLoading, countModifier) {
          this.$store.commit("LOADING", isLoading);
        },
        error(err) {
          this.$store.commit("ERROR", true);
        },
      };
    },
  },
  computed: {
    character() {
      return this.$store.getters.GET_CHARACTER_EPISODES;
    },
    loading() {
      return this.$store.getters.LOADING;
    },
  },
};
</script>
