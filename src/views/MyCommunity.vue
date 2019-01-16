 <template>
  <v-container>
    <v-layout row justify-center align-center>
      <v-flex xs12>
        <v-tabs v-model="tab" grow>
          <v-tab to="myBoard">내 게시판</v-tab>
          <v-tab to="myDocument">내가 쓴 글</v-tab>
          <v-tab to="myComment">내 댓글</v-tab>
          <v-tab to="myScrap">내 스크랩</v-tab>
          <v-tabs-items touchless>
            <v-tab-item value="myBoard">
              <router-view v-if="tab === 'myBoard'"/>
            </v-tab-item>
            <v-tab-item value="myDocument">
              <router-view v-if="tab === 'myDocument'"/>
            </v-tab-item>
            <v-tab-item value="myComment">
              <router-view v-if="tab === 'myComment'"/>
            </v-tab-item>
            <v-tab-item value="myScrap">
              <router-view v-if="tab === 'myScrap'"/>
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import MainLayout from "../layouts/MainLayout";
export default {
  name: "MyCommunity",
  data() {
    return {
      tab: "myBoard"
    };
  },
  created() {
    this.$emit("update:layout", MainLayout);
    this.$store.dispatch('setColumnType', 'HIDE_ALWAYS')
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        if (this.$route.name === "myCommunity") this.$router.push("myBoard");
      }
    }
  }
};
</script>
