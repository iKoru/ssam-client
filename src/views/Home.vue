<template>
  <v-container px-0 fluid>
    <v-layout>
      <img src="@/assets/logo.png" alt="Vuetify.js" width="50" height="50">로고
      <v-spacer/>
      <v-btn @click="signout">로그아웃</v-btn>
    </v-layout>
    <Menu :boards="boards"/>
    <v-slide-y-transition mode="out-in">
      <v-layout row wrap align-center>
        <v-flex xs8 offset-xs2>
          <router-view/>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  components: {
    Menu: () => import('@/components/Menu')
  },
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
      title: 'Vuetify.js',
      boards: undefined
    }
  },
  created () {
    console.log('test')
    this.$axios.get('/board/list')
      .then(response => {
        console.log(response)
        this.boards = response.data
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    signout () {
      this.$store.dispatch('signout')
      this.$router.push('/')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
