<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <router-link class="nav-link" :to="{ path: '/characters' }">
          <div
            class="card bg-dark text-white"
            style="
  background: url('/img/gif2.gif') center center no-repeat;"
          >
            <div class="card-img-overlay">
              <h1 class="card-title">Characters</h1>
            </div>
          </div>
        </router-link>
      </div>
      <div class="col-md-6">
        <router-link class="nav-link" :to="{ path: '/episodes' }">
          <div
            class="card bg-dark text-white"
            style="
  background: url('/img/gif1.gif') center center no-repeat;"
          >
            <div class="card-img-overlay">
              <h1 class="card-title">Episodes</h1>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>
<style lang="scss" scoped>
.text-white {
  background-size: cover !important;
  width: 100%;
  height: 310px;
  position: relative;
  .card-img-overlay {
    background: rgba($color: #000000, $alpha: 0.6);
    position: absolute;
    top: initial;
    bottom: 0;
    height: fit-content;
  }
}
</style>
