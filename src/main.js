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
import 'firebase/auth'
import 'firebase/database'
import "materialize-css/dist/js/materialize.min";
import Multiselect from 'vue-multiselect'
Vue.use(Vuelidate);
Vue.use(messagePlugin)
Vue.use(Vuex)
// Vue.use(VueMeta)
Vue.component("Loader", Loader);
Vue.component('multiselect', Multiselect)
Vue.config.productionTip = false;
firebase.initializeApp({
  apiKey: "AIzaSyA438Yfsq7hPnKGbT5B2Fq-pKd9HA3ZvNo",
  authDomain: "crm-d-d4581.firebaseapp.com",
  databaseURL: "https://crm-d-d4581.firebaseio.com",
  projectId: "crm-d-d4581",
  storageBucket: "crm-d-d4581.appspot.com",
  messagingSenderId: "978886037335",
  appId: "1:978886037335:web:da55bbaf855faccb953812",
  measurementId: "G-2G14FV3L2Q"
});
let app;
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
