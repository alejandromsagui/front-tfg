import { createApp } from 'vue'
import App from './App.vue'
import './style.css'


//Router
import { router } from './routes'

//Vuetify
import vuetify from './plugins/vuetify'

//Pinia
import pinia from './plugins/pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import './style.css'

pinia.use(piniaPluginPersistedstate);

createApp(App).use(router).use(vuetify).use(pinia).mount('#app')
