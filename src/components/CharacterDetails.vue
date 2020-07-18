<template>
  <div class="col">
    <div class="card">
      <img
        class="card-img-top"
        :src="
          `https://rickandmortyapi.com/api/character/avatar/${details.id}.jpeg`
        "
        :alt="details.name"
      />
      <div class="card-body">
        <h5 class="card-title">#{{ details.id }} {{ details.name }}</h5>
        <p class="card-text">
          <strong>Status:</strong>&nbsp;
          <span
            class="badge"
            :class="{
              'badge-success': details.status == 'Alive',
              'badge-danger': details.status == 'Dead',
              'badge-dark': details.status == 'unknown',
            }"
          >
            {{ details.status }}
          </span>
        </p>
        <p class="card-text">
          <strong>Origin:</strong> {{ details.origin.name }}
        </p>
        <router-link
          :to="{
            path: `/characters/${details.id}`,
            params: { id: details.id },
          }"
          v-slot="{ href, route, navigate }"
          v-if="!episodes"
        >
          <button
            class="btn btn-primary btn-block d-flex justify-content-between align-items-center"
            @click="navigate"
          >
            List of episodes &nbsp;
            <span class="badge badge-light">
              {{ details.episode.length }}
            </span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CharacterDetails",
  props: {
    details: {
      type: Object,
      default: {},
    },
    episodes: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
