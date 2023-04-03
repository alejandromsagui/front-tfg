import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

//Router
import { router } from './routes'

//Vuetify
import vuetify from './plugins/vuetify'

createApp(App).use(router).use(vuetify).mount('#app')
