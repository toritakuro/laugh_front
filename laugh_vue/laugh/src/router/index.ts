import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DemoView from '../views/DemoView.vue'
import MyPage from '../views/MyPage.vue'
import LoginView from '../views/SingleLayout/Login.vue'
import Main from '../views/Main.vue'
import ProfileRegister from '../views/SingleLayout/ProfileRegister.vue'
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
      path: '/profile/register',
      name: 'profile',
      component: ProfileRegister
    },
    {
      path: '/', 
      redirect: '/demo',
      component: Main,
      children : [
        {
          path: 'demo',
          name: 'demo',
          component: DemoView
        },
        {
          path: 'home',
          component: HomeView
        },
        {
          path: 'mypage',
          component: MyPage,
        }
      ]
    }
  ]
})

export default router