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
  VStepper,
  VAutocomplete,
  VParallax,
  VTooltip,
  VBtnToggle,
  VSwitch,
  VBottomSheet,
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
    VStepper,
    VAutocomplete,
    VParallax,
    VTooltip,
    VBtnToggle,
    VSwitch,
    VBottomSheet,
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
  iconfont: 'md',
  lang: {
    locales: {
      'ko': {
        'dataIterator': {
          'rowsPerPageText': '페이지당 ',
          'rowsPerPageAll': '전체보기',
          'pageText': '{0}-{1}, 전체 {2}',
          'noResultsText': '표시할 항목이 없습니다.',
          'nextPage': '다음',
          'prevPage': '이전'
        },
        'dataTable': {
          'rowsPerPageText': '페이지당 '
        },
        'noDataText': '표시할 항목이 없습니다.'
      }
    },
    current: 'ko'
  }
})
