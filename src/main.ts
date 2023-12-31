import './assets/main.css'
import 'vue-toast-notification/dist/theme-sugar.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const pinia = createPinia()

const app = createApp(App)
app.use(pinia)
app.use(router)

// await router.isReady()

app.mount('#app')
