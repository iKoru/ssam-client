 <template>
  <v-container>
    <v-layout row justify-center align-center>
      <v-flex xs12>
        <v-tabs v-model="tab">
          <v-tab key="searchDocument" to="searchDocument">게시물 찾기</v-tab>
          <v-tab key="searchBoard" to="searchBoard">게시판 찾기</v-tab>
          <v-tabs-items touchless>
            <v-tab-item value="searchDocument">
              <router-view v-if="tab === 'searchDocument'"/>
            </v-tab-item>
            <v-tab-item value="searchBoard">
              <router-view v-if="tab === 'searchBoard'"/>
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import MainLayout from '../layouts/MainLayout';
export default {
  name: 'Search',
  data () {
    return {
      tab: ''
    };
  },
  created () {
    this.$emit('update:layout', MainLayout);
    this.$store.dispatch('setColumnType', 'HIDE_ALWAYS')
  },
  watch: {
    $route: {
      immediate: true,
      handler () {
        if (this.$route.name === 'search') this.$router.push('searchDocument');
      }
    }
  }
};
</script>
