<template>
  <div class="container">
    <div v-if="!loading" class="row my-4">
      <div class="col-md-2">
        <h5 class="card-title">#{{ episode.id }}</h5>
        <h5 class="card-title">
          {{ episode.name }}
        </h5>
        <p class="card-text">{{ episode.episode }}</p>
      </div>
      <div class="col-md-10">
        <h2>Characters List</h2>
        <div class="row row-cols-1 row-cols-md-4">
          <CharacterDetails
            v-for="character in characters"
            :key="character.id"
            :details="character"
          />
        </div>
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
  name: "EpisodeDetails",
  components: {
    CharacterDetails,
    EpisodesList,
  },
  props: ["id"],
  apollo: {
    episode() {
      return {
        query: gql`
          query episode($id: ID!) {
            episode(id: $id) {
              id
              name
              episode
              characters {
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
          id: this.id,
        },
        update(data) {
          if (typeof data.episode !== null) {
            this.$store.commit("EPISODE_DETAILS", data.episode);
            this.$store.commit("EPISODE_CHARACTERS", data.episode.characters);
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
    episode() {
      return this.$store.getters.GET_EPISODE_DETAILS;
    },
    characters() {
      return this.$store.getters.GET_EPISODE_CHARACTERS;
    },
    loading() {
      return this.$store.getters.LOADING;
    },
  },
};
</script>
