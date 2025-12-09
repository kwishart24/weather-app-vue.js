import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/main.css'
import '@fortawesome/fontawesome-free/css/all.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia()) // register Pinia
app.use(router) // register Vue Router

app.mount('#app') // mount the app
