import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

// import AddressView from '@/views/AddressView.vue'
// import SettingsView from '@/views/SettingsView.vue'
// import CollectionView from '@/views/CollectionView.vue'
// import NFTView from '@/views/NFTView.vue'

// route level code-splitting
// this generates a separate chunk (About.[hash].js) for this route
// which is lazy-loaded when the route is visited.
const AddressView = () => import('@/views/AddressView.vue')
const SettingsView = () => import('@/views/SettingsView.vue')
const CollectionView = () => import('@/views/CollectionView.vue')
const NFTView = () => import('@/views/NFTView.vue')


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/address/:address',
      name: 'address',
      props: true,
      component: AddressView
    },
    {
      path: '/collection/:address/:tokenId',
      name: 'collection',
      props: true,
      component: CollectionView
    },
    {
      path: '/nft/:address/:tokenId/:commitment',
      name: 'nft',
      props: true,
      component: NFTView
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView
    }
  ]
})

export default router
