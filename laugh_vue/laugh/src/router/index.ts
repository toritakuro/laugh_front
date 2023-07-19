import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DemoView from '../views/DemoView.vue'
import LoginViuw from '../views/SingleLayout/Login.vue'
import Main from '../views/Main.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginViuw
    },
    {
      path: '/', redirect: '/demo',component: Main,
      children : [
        {
          path: 'demo',
          component: DemoView
        }
      ]
    }
  ]
})

export default router
