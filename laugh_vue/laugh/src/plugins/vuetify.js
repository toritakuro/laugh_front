import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css' 
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

// const myCustomLightTheme = {
//   dark: false,
//   colors: {
//     background: '#F8F9FA',
//     surface: '#FFFFFF',
//     primary: '#6200EE',
//     'primary-darken-1': '#3700B3',
//     secondary: '#03DAC6',
//     'secondary-darken-1': '#018786',
//     error: '#B00020',
//     info: '#2196F3',
//     success: '#4CAF50',
//     warning: '#FB8C00',
//   },
// }

export const vuetify = createVuetify({
  // theme: {
  //   defaultTheme: 'myCustomLightTheme',
  //   themes: {
  //     myCustomLightTheme,
  //   },
  // },
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})