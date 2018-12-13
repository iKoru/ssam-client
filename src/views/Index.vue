 <template>
 <v-container fluid>
    <v-toolbar
      app
      :clipped-left="clipped"
      class="hidden-lg-and-up"
    >
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-navigation-drawer
      :right="true"
      v-model="rightDrawer"
      fixed
      app
    >
      <!--<v-list>
         <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
       -->

      <v-btn icon block flat>
        <v-icon>mdi-menu</v-icon>로고
      </v-btn>
      <Signin/>
      <BoardExtractor/>
    </v-navigation-drawer>

    <v-content>
      가운데정렬 여러가지 이미지 디자인
    </v-content>

 </v-container>
</template>

<script>

export default {
  components: {
    Signin: () => import('@/components/Signin.vue'),
    BoardExtractor: () => import('@/components/board/BoardExtractor.vue')
  },
  name: 'Index',
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: true,
      items: [{
        icon: 'mdi-chart-bubble',
        title: 'Inspire'
      }],
      miniVariant: false,
      rightDrawer: true,
      title: 'Vuetify.js'
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>
