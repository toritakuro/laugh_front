import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DemoView from '../views/DemoView.vue'
import MyPage from '../views/MyPage.vue'
import LoginViuw from '../views/SingleLayout/Login.vue'
import Main from '../views/Main.vue'
import ProfileRegister from '../views/ProfileRegister.vue'
import ProfileRegister2 from '../views/ProfileRegister2.vue'
import ProfileInit from '../views/ProfileInit.vue'

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
    },
    {
      path: '/profile/register',
      name: 'register',
      component: ProfileRegister
    },
    {
      path: '/profile/register2/:address(.*)',
      name: 'register2',
      component: ProfileRegister2
    },
    {
      path: '/profile/init',
      name: 'registerInit',
      component: ProfileInit
    }
  ]
})

export default router
