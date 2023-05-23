import { createApp } from 'vue'
import App from './App.vue'
import './style.css'


//Router
import { router } from './routes'

//Vuetify
import vuetify from './plugins/vuetify'

//Pinia
import pinia from './plugins/pinia'

//Autoanimate
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

import './style.css'

createApp(App).use(router).use(vuetify).use(pinia).use(autoAnimatePlugin).mount('#app')
