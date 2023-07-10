import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import store from './store/index'
import router from './router'
import { vuetify } from '@/plugins/vuetify'

const app = createApp(App)
app.use(vuetify)
app.use(router)
app.use(store)
app.mount('#app')
