<template>
  <div class="container" v-if="next !== null">
    <div class="actions text-center">
      <button
        v-if="next <= pages && !loading"
        @click="$emit('showMore')"
        class="btn btn-secondary"
      >
        Show more
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: "ShowMore",
  computed: {
    next() {
      return this.$store.getters.GET_NEXT_PAGE;
    },
    pages() {
      return this.$store.getters.GET_TOTAL_PAGES;
    },
    loading() {
      return this.$store.getters.LOADING;
    },
  },
};
</script>
