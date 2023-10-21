import { createRouter, createWebHistory } from 'vue-router'
import NFTsView from '@/views/NFTsView.vue'
// route level code-splitting
// this generates a separate chunk (About.[hash].js) for this route
// which is lazy-loaded when the route is visited.
// const TokensView = () => import('@/views/TokensView.vue')
// const BCHView = () => import('@/views/BCHView.vue')
// const SettingsView = () => import('@/views/SettingsView.vue')
import TokensView from '@/views/TokensView.vue'
import BCHView from '@/views/BCHView.vue'
import SettingsView from '@/views/SettingsView.vue'
import HomeView from '@/views/HomeView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/nfts/:address',
      name: 'nfts',
      props: true,
      component: NFTsView
    },
    {
      path: '/tokens/:address',
      name: 'tokens',
      props: true,
      component: TokensView
    },
    {
      path: '/bch/:address',
      name: 'bch',
      props: true,
      component: BCHView
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView
    }
  ]
})

export default router