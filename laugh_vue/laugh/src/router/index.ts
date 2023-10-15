import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DemoView from '../views/DemoView.vue'
import MyPage from '../views/MyPage.vue'
import LoginView from '../views/SingleLayout/Login.vue'
import Main from '../views/Main.vue'
import OogiriDetail from '../views/OogiriDetailView.vue'
import ChatRoom from '../views/ChatRoomList.vue'
import ChatDetail from '../views/ChatDetail.vue'

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
        }
      ]
    }
  ]
})

export default router