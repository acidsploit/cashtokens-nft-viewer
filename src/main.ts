import './assets/main.css'
import 'vue-toast-notification/dist/theme-sugar.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from 'unhead'

import App from './App.vue'
import router from './router'

const pinia = createPinia()
const head = createHead();

const app = createApp(App)
    .use(router)
    .use(pinia)
    
// app.use(VueMeta)
// app.use(pinia)
// app.use(router)
await router.isReady()

app.mount('#app')
