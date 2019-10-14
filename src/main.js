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
import moment from "moment";

require("semantic-ui-css/semantic.css");
import VueAnalytics from "vue-analytics";
import Ads from "vue-google-adsense";

Vue.use(require("vue-script2"));
Vue.use(Ads.AutoAdsense, { adClient: "ca-pub-6675870942150850" });
Vue.use(Ads.Adsense);
Vue.use(Ads.InArticleAdsense);
Vue.use(Ads.InFeedAdsense);

const isProd = process.env.NODE_ENV === "production";

Vue.config.productionTip = false;
Vue.use(VueNumeric);
Vue.use(SuiVue);

Vue.use(VueNumerals);
//Vue.use(VPopover, { tooltip: true });
//Vue.use(PortalVue);
Vue.filter("formatDate", function(value) {
  if (value) {
    return moment(String(value)).format("MMMM YYYY");
  }
});
Vue.use(VueAnalytics, {
  id: "UA-149922343-1",
  router: router,
  debug: {
    enabled: !isProd,
    sendHitTask: isProd
  }
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
