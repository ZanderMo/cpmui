// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import { AlertPlugin, ToastPlugin } from 'vux'

window.API_URL = 'http://192.168.2.73:6543';

import './assets/js/jquery-2.0.3.min.js';

import Login from './components/SingleView/Login.vue'
import Hubs from './components/Hubs/Hubs.vue'
import NodeNum from './components/Hubs/NodeNum.vue'
import NodeGps from './components/Hubs/NodeGps.vue'

Vue.use(VueRouter);
const router = new VueRouter({
  routes: [
    {path:'/Login',component:Login},
    {path:'/Hubs',component:Hubs},
    {path:'/NodeNum',component:NodeNum},
    {path:'/NodeGps',component:NodeGps}
  ]
});

const app = new Vue({
  router,
  render: h => h(App),
}).$mount('#app');

/*router.beforeEach(function (to, from, next) {
  let identity = localStorage.getItem('identity') ? localStorage.getItem('identity') : sessionStorage.getItem('identity');
  if (!identity && to.fullPath !== "/login") {
    next({ path: '/login' });
  } else {
    next();
  }
});*/
