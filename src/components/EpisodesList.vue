<template>
  <div class="table-responsive">
    <table class="table table-hover my-3">
      <thead>
        <tr>
          <th scope="col">
            <a href="javascript:;" @click.prevent="orderBy('id')">#</a>
          </th>
          <th scope="col">Episode</th>
          <th scope="col">
            <a href="javascript:;" @click="orderBy('name')">Name</a>
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-for="ep in episode">
          <router-link
            :to="{
              path: `/episodes/${ep.id}`,
              params: { id: ep.id },
            }"
            v-slot="{ href, route, navigate }"
            :key="ep.id"
          >
            <tr class="row-table" @click="navigate">
              <th scope="row">{{ ep.id }}</th>
              <td><span>{{ ep.episode }}</span></td>
              <td>{{ ep.name }}</td>
            </tr>
          </router-link>
        </template>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: "EpisodesList",
  data() {
    return {
      isOrdered: false
    }
  },
  methods: {
    orderBy(param) {
      this.isOrdered = !this.isOrdered;
      const newOrder = this.episode.sort((a, b) => {
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
      this.$store.commit('EPISODES_LIST', newOrder)
    },
  },
  computed: {
    episode() {
      return this.$store.getters.GET_EPISODES_LIST;
    },
  },
};
</script>
<style lang="scss" scoped>
.table-responsive {
  min-width: 100%;
  .row-table {
    cursor: pointer;
  }
}
</style>
