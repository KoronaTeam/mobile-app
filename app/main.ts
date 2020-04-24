import VueDevtools from 'nativescript-vue-devtools';
import Vue from 'nativescript-vue';

import Navigator from 'nativescript-vue-navigator';

import store from './store';
import { routes } from './router';

import App from './App.vue';

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production');

if (TNS_ENV !== 'production') {
  Vue.use(VueDevtools);
}

Vue.use(Navigator, { routes });

new Vue({
  store,
  render: h => h(App),
}).$start();
