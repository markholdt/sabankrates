import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
//import ".././semantic/dist/semantic.min.css";
import SuiVue from "semantic-ui-vue";
import VueNumerals from "vue-numerals";
//import PortalVue from "portal-vue";
import VueNumeric from "vue-numeric";
//import VPopover from "vue-js-popover";

require("semantic-ui-css/semantic.css");
Vue.config.productionTip = false;
Vue.use(VueNumeric);
Vue.use(SuiVue);

Vue.use(VueNumerals);
//Vue.use(VPopover, { tooltip: true });
//Vue.use(PortalVue);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
