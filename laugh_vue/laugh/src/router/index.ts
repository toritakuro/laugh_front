import { createRouter, createWebHistory } from 'vue-router'
import TopView from '../views/TopView.vue'
import HomeView from '../views/HomeView.vue'
import DemoView from '../views/DemoView.vue'
import MyPage from '../views/MyPage.vue'
import LoginView from '../views/SingleLayout/Login.vue'
import Main from '../views/Main.vue'
import ProfileRegister from '../views/SingleLayout/ProfileRegister.vue'
import OogiriDetail from '../views/OogiriDetailView.vue'
import OogiriList from '../views/OogiriListView.vue'
import OogiriPost from '../views/OogiriPostView.vue'
import OogiriEdit from '../views/OogiriEditView.vue'
import UserDetail from '../views/UserDetail.vue'
import MyPageLaugh from '../components/MyPageLaugh.vue'
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
          name: 'home',
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
          path: 'detail',
          name: 'detail',
          component: UserDetail,
          props: true
        },
        {
          path: 'mypage/laugh',
          component: MyPageLaugh
        },
        {
          path: '/oogiri/detail',
          name: 'oogiriDetail',
          component: OogiriDetail,
        },
        {
          path: '/oogiri/list',
          name: 'OogiriList',
          component: OogiriList,
        },
        {
          path: '/oogiri/post',
          name: 'OogiriPost',
          component: OogiriPost,
        },
        {
          path: '/oogiri/edit',
          name: 'OogiriEdit',
          component: OogiriEdit,
        },
      ]
    }
  ]
})

router.beforeResolve((to, from, next) => {
  if (to.name !== 'login' && !store.getters['token/getIdToken']) next({ name: 'login' })
  else next()
})
export default router