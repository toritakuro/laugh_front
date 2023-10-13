import { createRouter, createWebHistory } from 'vue-router'
import TopView from '../views/TopView.vue'
import HomeView from '../views/HomeView.vue'
import DemoView from '../views/DemoView.vue'
import MyPage from '../views/MyPage.vue'
import LoginView from '../views/SingleLayout/Login.vue'
import Main from '../views/Main.vue'
import ProfileRegister_ from '../views/ProfileRegister_.vue'
import ProfileRegister2 from '../views/ProfileRegister2.vue'
import ProfileInit from '../views/ProfileInit.vue'
// import ProfileEdit from '../views/ProfileEdit.vue'
import ProfileRegister from '../views/SingleLayout/ProfileRegister.vue'
import OogiriDetail from '../views/OogiriDetailView.vue'
import MypageContent from '../components/MyPageContent.vue'

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
      path: '/profile/register/:address(.*)',
      name: 'profile',
      component: ProfileRegister
    },
    {
      path: '/', redirect: '/top',component: Main,
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
          path: 'top',
          component: TopView
        },
        {
          path: 'mypage',
          component: MyPage
        },
        {
          path: '/posts-list',
          component: MypageContent
        }
      ]
    },
    {
      path: '/profile/register_/:address(.*)',
      name: 'register',
      component: ProfileRegister_
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
    },
  ]
})

export default router