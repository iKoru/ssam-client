 <template>
  <v-container>
    <v-layout row justify-center align-center>
      <v-flex xs12>
        <v-tabs v-model="tab" grow>
          <v-tab key="board">내 게시판</v-tab>
          <v-tab key="document">내가 쓴 글</v-tab>
          <v-tab key="comment">내 댓글</v-tab>
          <v-tab key="scrap">내 스크랩</v-tab>
          <v-tabs-items touchless>
            <v-tab-item key="board">
              <my-board></my-board>
            </v-tab-item>
            <v-tab-item key="document" lazy>
              <my-document></my-document>
            </v-tab-item>
            <v-tab-item key="comment" lazy>
              <my-comment></my-comment>
            </v-tab-item>
            <v-tab-item key="scrap" lazy>
              <my-scrap></my-scrap>
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
  components: {
    MyBoard: () => import("../components/MyBoard"),
    MyDocument: () => import("../components/MyDocument"),
    MyComment: () => import("../components/MyComment"),
    MyScrap: () => import("../components/MyScrap")
  },
  data() {
    return {
      tab: "board"
    };
  },
  created() {
    this.$emit("update:layout", MainLayout);
  }
};
</script>
