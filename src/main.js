import { createApp } from 'vue'
import App from './App.vue'
import './style.css'


//Router
import { router } from './routes'

//Vuetify
import vuetify from './plugins/vuetify'

//Pinia
import pinia from './plugins/pinia'

import VueAwesomePaginate from "vue-awesome-paginate";

import './style.css'

createApp(App).use(router).use(vuetify).use(pinia).use(VueAwesomePaginate).mount('#app')
