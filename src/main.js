import Vue from 'vue'
import Vuex from 'vuex'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import messagePlugin from './utils/message.plugin'
import Loader from '@/components/app/Loader'
import 'materialize-css/dist/js/materialize.min'
import firebase from 'firebase/app'
import dateFilter from './filters/date.filter'
import 'firebase/auth'
import 'firebase/database'
import "materialize-css/dist/js/materialize.min";
import Multiselect from 'vue-multiselect';
import config from './utils/constants';

Vue.use(Vuelidate);
Vue.use(messagePlugin)
Vue.use(Vuex)
Vue.filter('date', dateFilter)
// Vue.use(VueMeta)
Vue.component("Loader", Loader);
Vue.component('multiselect', Multiselect)
Vue.config.productionTip = false;

const firebaseInstance = firebase.initializeApp(config);
let app;

firebaseInstance.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
