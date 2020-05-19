import Vue from 'vue'
// import jQuery from 'jquery';
import 'popper.js';
import 'bootstrap';
import App from './App.vue'
import router from "./router";
import './assets/css/app.scss';

// window.$ = window.jQuery = jQuery;

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
