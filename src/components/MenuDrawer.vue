<template>
  <v-container px-0 py-0 fluid v-if="$vuetify.breakpoint.xsOnly">
    <v-layout>
      <v-navigation-drawer :value="$store.getters.menuDrawer" @input="drawerChanged" app>
        <v-toolbar flat>
          <v-list>
            <v-list-tile>
              <v-list-tile-title class="title" @click="myPage">
                {{($store.getters.isLight?$store.getters.loungeNickName:$store.getters.topicNickName) +'님, 안녕하세요!'}}
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-toolbar>
    
        <v-divider></v-divider>
    
        <v-list dense class="pt-0">
          <v-list-tile v-for="board in boards" :key="board.boardId">
            <v-list-tile-content>
              <router-link :to="`/board/${board.boardId}`">
                <v-list-tile-title>{{ board.boardName }}</v-list-tile-title>
              </router-link>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <span>aaa</span>
      </v-navigation-drawer>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "MenuDrawer",
  props: ["boards"],
  methods:{
    myPage(){
      this.$router.push('/myPage');
    },
    drawerChanged(val){
      if(val !== this.$store.getters.menuDrawer){
        this.$store.dispatch('toggleMenuDrawer')
      }
    }
  },
  /*data(){
    return {
      drawer: false
    }
  },
  computed:{
    menuDrawer(){
      return this.$store.getters.menuDrawer;
    }
  },
  watch:{
    drawer(){
      this.$nextTick(() => this.$store.dispatch('toggleMenuDrawer'))
    },
    menuDrawer(){
      this.$nextTick(()=> (this.drawer = !this.drawer))
    }
  }*/
};
</script>
