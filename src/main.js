import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Loading from "./components/Loading";
import NoResults from "./components/NoResults";
import Scroll from "./components/ScrollTop";

import { createProvider } from "./vue-apollo";

Vue.config.productionTip = false;

Vue.component("Loading", Loading);
Vue.component("NoResults", NoResults);
Vue.component("Scroll", Scroll);

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: (h) => h(App),
}).$mount("#app");
