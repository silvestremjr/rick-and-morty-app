import Vue from 'vue'
import VueRouter from 'vue-router'
import Characters from "../views/Characters";
import CharacterEpisodes from "../views/CharacterEpisodes";
import Episodes from "../views/Episodes";
import EpisodeDetails from "../views/EpisodeDetails";
import Home from '../views/Home'

Vue.use(VueRouter)

  const routes = [
    {
      path: "/",
      name: "Home",
      component: Home,
      props: true,
    },
    {
      path: "/characters",
      name: "Characters",
      component: Characters,
      props: true,
    },
    {
      path: "/characters/:id",
      name: "CharacterEpisodes",
      component: CharacterEpisodes,
      props: true,
    },
    {
      path: "/episodes",
      name: "Episodes",
      component: Episodes,
      props: true,
    },
    {
      path: "/episodes/:id",
      name: "EpisodeDetails",
      component: EpisodeDetails,
      props: true,
    },
  ];

const router = new VueRouter({
  routes
})

export default router
