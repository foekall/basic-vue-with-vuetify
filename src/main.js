import Vue from 'vue';
import moment from 'moment';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;
Vue.filter('formatDate', (value) => moment(String(value)).format('DD MMMM YYYY hh:mm'));

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
