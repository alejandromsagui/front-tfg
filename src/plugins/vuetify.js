import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/dist/vuetify.min.css';


import '@fortawesome/fontawesome-free/css/all.css'
import { aliases, fa } from 'vuetify/iconsets/fa'


export default createVuetify({
    ssr: true,
    components,
    directives,
    icons: {
        defaultSet: 'fa',
        aliases,
        sets: {
          fa
        },
      },
      theme: {
        defaultTheme: 'dark'
      },
      display: {
        mobileBreakpoint: 'sm',
        thresholds: {
          xs: 0,
          sm: 340,
          md: 540,
          lg: 800,
          xl: 1280,
        },
      }
});