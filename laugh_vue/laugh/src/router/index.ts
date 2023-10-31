import { createRouter, createWebHistory } from 'vue-router'
import TopView from '../views/TopView.vue'
import HomeView from '../views/HomeView.vue'
import DemoView from '../views/DemoView.vue'
import MyPage from '../views/MyPage.vue'
import LoginView from '../views/SingleLayout/Login.vue'
import Main from '../views/Main.vue'
import MypageContent from '../views/MypageContent.vue'
import ProfileInit from '../views/SingleLayout/ProfileInit.vue'
import ProfileRegister from '../views/SingleLayout/ProfileRegister.vue'
import ProfileRegisterCompletion from '../views/SingleLayout/ProfileRegisterCompletion.vue'
import OogiriDetail from '../views/OogiriDetailView.vue'
import ChatRoom from '../views/ChatRoomList.vue'
import ChatDetail from '../views/ChatDetail.vue'
import UserDetail from '../views/UserDetail.vue'
import UserDetailOogiri from '@/components/UserDetailOogiri.vue'
import MyPageLaugh from '../components/MyPageLaugh.vue'
import HelpView from '../views/HelpView.vue'
import store from "@/store"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/profile/init',
      name: 'ProfileInit',
      component: ProfileInit
    },
    {
      path: '/profile/register/:address(.*)',
      name: 'profile',
      component: ProfileRegister
    },
    {
      path: '/profile/register/completion',
      name: 'completion',
      component: ProfileRegisterCompletion
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
          name: 'home',
          component: HomeView
        },
        {
          path: 'top',
          name: 'top',
          component: TopView
        },
        {
          path: 'mypage',
          component: MyPage
        },
        {
          path: '/posts-list',
          component: MypageContent
        },
        {
          path: 'userDetail',
          name: 'userDetail',
          component: UserDetail
        },
        {
          path: 'mypage/laugh',
          component: MyPageLaugh
        },
        {
          path: 'userDetail/oogiriAnswer',
          component: UserDetailOogiri
        },
        {
          path: '/oogiri/detail',
          name: 'oogiriDetail',
          component: OogiriDetail,
        },
      ]
    },
    {
      path: '/chat',
      name: 'chat',
      component: Main,
      children: [
        {
          path: '',
          name: 'chat',
          component: ChatRoom,
        },
        {
          path: 'detail',
          name: 'chatDetail',
          component: ChatDetail,
        },
        {
          path: '/help',
          name: 'help',
          component: HelpView,
        }
      ]
    }
  ]
})

router.beforeResolve((to, from, next) => {
  if(to.name == 'profile') next()
  else if (to.name !== 'login' && !store.getters['token/getIdToken']) next({ name: 'login' })
  else next()

  // if (to.name !== 'login' && !store.getters['token/getIdToken']) next({ name: 'login' })
  // else next()
})
export default router