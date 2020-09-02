import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import Splash from './views/Splash.vue'
import Create from './views/Create.vue'
import FAQ from './views/FAQ.vue'

Vue.config.productionTip = false

Vue.use(Router);

const router = new Router({
  mode: "history",
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
    },
    {
      // catch all 404 - define at the very end
      path: "*",
      component: () => import("./views/NotFound.vue")
    }
  ]
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')