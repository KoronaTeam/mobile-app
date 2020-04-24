import VueDevtools from 'nativescript-vue-devtools';
import Vue from 'nativescript-vue';
import store from './store';
import Home from './pages/Home.vue';

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production');

if (TNS_ENV !== 'production') {
  Vue.use(VueDevtools);
}

new Vue({
  store,
  render: h => h('frame', [h(Home)]),
}).$start();
