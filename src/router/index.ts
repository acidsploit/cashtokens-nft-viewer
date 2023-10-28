import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

// import NFTsView from '@/views/NFTsView.vue'
// import TokensView from '@/views/TokensView.vue'
// import BCHView from '@/views/BCHView.vue'
// import SettingsView from '@/views/SettingsView.vue'
// import NFTCollectionView from '@/views/NFTCollectionView.vue'

// route level code-splitting
// this generates a separate chunk (About.[hash].js) for this route
// which is lazy-loaded when the route is visited.
const NFTsView = () => import('@/views/NFTsView.vue')
const BCHView = () => import('@/views/BCHView.vue')
const SettingsView = () => import('@/views/SettingsView.vue')
const NFTCollectionView = () => import('@/views/NFTCollectionView.vue')


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
      path: '/collection/:address/:tokenId',
      name: 'collection',
      props: true,
      component: NFTCollectionView
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
