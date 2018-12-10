<template>
  <v-app>
    <router-view/>
  </v-app>
</template>

<script>
import store from './store'
export default {
  name: 'App',
  store,
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [{
        icon: 'mdi-chart-bubble',
        title: 'Inspire'
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>
