import Vue from 'vue'
import axios from 'axios';
import VueAWN from "vue-awesome-notifications";
import Multiselect from 'vue-multiselect';
import jQuery from 'jquery';
import 'popper.js';
import 'bootstrap';
import moment from 'moment';
import App from './App.vue'
import router from "./router";
import './assets/css/app.scss';
import { name, version } from '../package.json';

// window.$ = window.jQuery = jQuery;

// default api baseurl for axios
// axios.defaults.baseURL = 'http://localhost/api/';
Vue.prototype.$http = axios;
Vue.prototype.$http.defaults.baseURL = 'http://localhost:8000/api/';
const token = localStorage.getItem('access-token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

Vue.prototype.$jQuery = jQuery;

// APP Title and Version from package.json
Vue.prototype.$APP_TITLE = name;
Vue.prototype.$APP_VERSION = version;

// Toast Notification library
Vue.use(VueAWN, {
  position: 'top-right',
  durations: {
    global: 2000,
  }
});

// register multiselect component
Vue.component('multiselect', Multiselect);

// moment
Vue.prototype.$moment = moment;


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  data() {
    return {
      access_token: localStorage.getItem('access-token') || null,
      // loggedInUser: JSON.parse(localStorage.getItem('loggedInUser')),
      isAdmin: JSON.parse(localStorage.getItem('isAdmin')) || false,
      // loggedInUser: localStorage.getItem('loggedInUser') || null,
    }
  }
}).$mount('#app')
