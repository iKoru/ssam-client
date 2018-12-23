<template id="myBoard">
  <v-card flat>
    <v-card-title primary-title>
      <v-layout column>
        <v-layout row>
          <v-flex xs12>
            <h3 class="headline mb-0">내 게시판 목록</h3>
            <div>내가 구독한 게시판을 관리할 수 있습니다.</div>
          </v-flex>
        </v-layout>
        <v-divider class="my-3"/>
        <v-layout row wrap>
          <v-flex xs12 sm6>토픽 리스트
            <draggable v-model="topics">
              <transition-group>
                <div v-for="topic in topics" :key="topic.boardId">{{topic.boardName}}</div>
              </transition-group>
            </draggable>
          </v-flex>
          <v-flex xs12 sm6>라운지 리스트
            <br>신고로 인해 글쓰기/읽기가 제한된 게시판만 보여집니다.
            <v-list>
              <v-list-tile v-for="lounge in lounges" :key="lounge.boardId">{{lounge.boardName}}</v-list-tile>
            </v-list>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-card-title>
    <v-card-actions pa-3>
      <v-layout :row="$vuetify.breakpoint.smAndUp" :column="$vuetify.breakpoint.xsOnly" wrap text-xs-right>
        <v-btn @click="reset" class="mt-2" flat>초기화</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="save" color="primary" :loading="loading" class="mt-2">저장</v-btn>
      </v-layout>
    </v-card-actions>
  </v-card>
</template>
<script>
import draggable from "vuedraggable";
export default {
  name: "MyBoard",
  components: {
    draggable: draggable
  },
  data() {
    return {
      loading: false,
      topics: [{boardId: 1, boardName: "aaa"}, {boardId: 2, boardName: "adaa"}, {boardId: 3, boardName: "afaa"}, {boardId: 4, boardName: "aasaa"}, {boardId: 5, boardName: "agdgaa"}, {boardId: 6, boardName: "aagga"}, {boardId: 7, boardName: "azzzaa"}, {boardId: 8, boardName: "aeeeaa"}, {boardId: 9, boardName: "azzzzzzaab"}],
      lounges: [{boardId: 1, boardName: "aaa"}, {boardId: 2, boardName: "adaa"}, {boardId: 3, boardName: "afaa"}, {boardId: 4, boardName: "aasaa"}, {boardId: 5, boardName: "agdgaa"}, {boardId: 6, boardName: "aagga"}, {boardId: 7, boardName: "azzzaa"}, {boardId: 8, boardName: "aeeeaa"}, {boardId: 9, boardName: "azzzzzzaab"}]
    };
  },
  methods: {
    reset() {},
    save() {}
  },
  render(h) {
    return h("myBoard", {attrs: {id: "app"}}, this.draggable);
  }
};
</script>

