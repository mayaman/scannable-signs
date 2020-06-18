import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import Splash from './views/Splash.vue'
import Create from './views/Create.vue'
import FAQ from './views/FAQ.vue'


Vue.config.productionTip = false

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'splash',
      component: Splash
    },
    {
      path: '/create',
      name: 'create',
      component: Create
    },
    {
      path: '/faq',
      name: 'faq',
      component: FAQ
    }
  ]
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')