<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link class="navbar-brand" :to="{ path: '/' }"
        ><img src="/img/logo.png" alt=" Rick and Morty" height="70"
      /></router-link>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav">
          <router-link
            :to="{ path: '/characters' }"
            v-slot="{ href, route, navigate, isActive }"
          >
            <li class="nav-item" :class="{ active: isActive }">
              <a class="nav-link" :href="href" @click="navigate">Characters</a>
            </li></router-link
          >
          <router-link
            :to="{ path: '/episodes' }"
            v-slot="{ href, route, navigate, isActive }"
          >
            <li class="nav-item" :class="{ active: isActive }">
              <a class="nav-link" :href="href" @click="navigate">Episodes</a>
            </li></router-link
          >
        </ul>
      </div>
    </nav>
    <div class="container">
      <div class="row mt-3 mb-5">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
