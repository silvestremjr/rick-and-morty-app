<template>
  <form @submit.prevent="handleSubmit">
    <div class="input-group mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="Search by name"
        v-model="filter"
        aria-label="Search by name"
        aria-describedby="button-addon2"
      />
      <div class="input-group-append">
        <button
          class="btn btn-outline-secondary"
          type="submit"
          id="button-addon2"
        >
          Search
        </button>
      </div>
    </div>
  </form>
</template>
<script>
export default {
  name: "SearchBar",
  data: () => ({
    filter: "",
  }),
  methods: {
    handleSubmit() {
      this.$emit("search", this.filter);
    },
  },
};
</script>
