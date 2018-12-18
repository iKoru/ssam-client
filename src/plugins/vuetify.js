import Vue from 'vue'
import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  VCard,
  VSubheader,
  VTextField,
  VCheckbox,
  VDialog,
  VSelect,
  VDivider,
  VForm,
  VChip,
  VAlert,
  VProgressLinear,
  VDataTable,
  VSnackbar,
  VMenu,
  VAvatar,
  VImg,
  VProgressCircular,
<<<<<<< HEAD
  VLabel,
=======
  VStepper,
  VAutocomplete,
>>>>>>> origin/user
  transitions
} from 'vuetify'
import 'vuetify/src/stylus/app.styl'
import { Resize } from 'vuetify/lib/directives'
Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    VCard,
    VSubheader,
    VTextField,
    VCheckbox,
    VDialog,
    VSelect,
    VDivider,
    VForm,
    VChip,
    VAlert,
    VProgressLinear,
    VDataTable,
    VSnackbar,
    VMenu,
    VAvatar,
    VImg,
    VProgressCircular,
<<<<<<< HEAD
    VLabel,
=======
    VStepper,
    VAutocomplete,
>>>>>>> origin/user
    transitions
  },
  directives: {
    Resize
  },
  theme: {
    primary: '#ee44aa',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  },
  customProperties: true,
  iconfont: 'md'
})
