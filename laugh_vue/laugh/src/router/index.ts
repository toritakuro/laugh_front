import { createRouter, createWebHistory } from 'vue-router'
import TopView from '../views/TopView.vue'
import HomeView from '../views/HomeView.vue'
import DemoView from '../views/DemoView.vue'
import TestView from '../views/TestView.vue'
import MyPage from '../views/MyPage.vue'
import LoginView from '../views/SingleLayout/Login.vue'
import Main from '../views/Main.vue'
import OogiriDetail from '../views/OogiriDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/oogiri/detail',
      name: 'oogiriDetail',
      component: OogiriDetail,
    },
    {
      path: '/', redirect: '/demo',component: Main,
      children : [
        {
          path: 'demo',
          component: DemoView
        },
        {
          path: 'home',
          component: HomeView
        },
        {
          path: 'top',
          component: TopView
        },
        {
          path: 'test',
          component: TestView
        },
        {
          path: 'mypage',
          component: MyPage
        }
      ]
    }
  ]
})

export default router