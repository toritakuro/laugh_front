import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DemoView from '../views/DemoView.vue'
import MyPage from '../views/MyPage.vue'
import LoginViuw from '../views/SingleLayout/Login.vue'
import Main from '../views/Main.vue'
import ProfileRegister from '../views/SingleLayout/ProfileRegister.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginViuw
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
