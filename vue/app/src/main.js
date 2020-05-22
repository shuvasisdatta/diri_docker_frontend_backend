import Vue from 'vue'
import axios from 'axios';
import VueAWN from "vue-awesome-notifications";
import Multiselect from 'vue-multiselect';
import jQuery from 'jquery';
import 'popper.js';
import 'bootstrap';
import App from './App.vue'
import router from "./router";
import './assets/css/app.scss';
import { name, version } from '../package.json';

// window.$ = window.jQuery = jQuery;

// default api baseurl for axios
axios.defaults.baseURL = 'http://localhost/api/';
Vue.prototype.$http = axios;

Vue.prototype.$jQuery = jQuery;

// APP Title and Version from package.json
Vue.prototype.$APP_TITLE = name;
Vue.prototype.$APP_VERSION = version;

// Toast Notification library
Vue.use(VueAWN, {
  position: 'top-right',
});

// register multiselect component
Vue.component('multiselect', Multiselect);


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
