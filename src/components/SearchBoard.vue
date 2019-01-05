 <template>
  <v-container>
    <v-layout row justify-center align-center wrap>
      <v-card width="100%" flat>
        <v-card-title primary-title class="px-0">
          <v-flex xs12 sm11 md10 lg9 class="mx-auto px-3 pb-2">
            <div :class="{'text-xs-center':true, 'justify-center':true, 'align-center':true, 'pa-3':$vuetify.breakpoint.smAndUp}">
              <v-container fluid grid-list-xs>
                <v-layout row>
                  <v-flex py-0>
                    <v-text-field ref="searchQuery" append-icon="search" placeholder="검색할 라운지/토픽/아카이브 이름" v-model="searchQuery" class="mt-0 pt-0 dense" hint="각각의 주소, 이름, 설명으로 검색할 수 있습니다."></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </div>
          </v-flex>
          <v-flex xs12 sm11 md10 lg9 class="mx-auto">
            <v-data-table hide-headers :headers="headers" :items="boards" :search="searchQuery" :rows-per-page-items="[15]" :loading="loading" class="customAction">
              <template slot="items" slot-scope="props">
                <tr @click="openDialog(props.item)" class="cursor-pointer">
                  <td>{{boardTypeItems[props.item.boardType]}}</td>
                  <td class="ellipsis">
                    <v-layout column>
                      <v-flex xs12>
                        <span>{{props.item.boardName}}</span>
                      </v-flex>
                      <v-flex xs12 class="ellipsis">
                        <small>{{props.item.boardDescription}}</small>
                      </v-flex>
                    </v-layout>
                  </td>
                  <td>
                    <router-link :to="'/'+props.item.boardId" v-if="props.item.boardType !== 'T' || userBoards.some(x=>x.boardId === props.item.boardId)">
                      <v-btn small flat class="short">바로가기</v-btn>
                    </router-link>
                    <v-btn small class="short" v-else @click.stop="openDialog(props.item, true)" color="primary">구독하기</v-btn>
                  </td>
                </tr>
              </template>
              <template slot="actions-prepend">
                <v-btn color="primary" flat @click="topicCreator = true">토픽 만들기</v-btn>
                <v-spacer></v-spacer>
              </template>
            </v-data-table>
          </v-flex>
        </v-card-title>
      </v-card>
      <v-dialog v-model="dialog" :full-screen="$vuetify.breakpoint.xsOnly" max-width="800" lazy>
        <v-card>
          <v-card-title class="headline" primary-title>
            <span>상세정보</span>
            <v-spacer/>
            <v-icon @click="dialog = false">close</v-icon>
          </v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs4 md2>
                <v-subheader>구분</v-subheader>
              </v-flex>
              <v-flex xs8 md4>
                <div class="v-subheader">{{boardTypeItems[selected.boardType]}}</div>
              </v-flex>
              <v-flex xs4 md2>
                <v-subheader>이름</v-subheader>
              </v-flex>
              <v-flex xs8 md4>
                <div class="v-subheader">
                  {{selected.boardName}}(
                  <router-link class="primary--text" :to="'/'+selected.boardId">/{{selected.boardId}}</router-link>)
                </div>
              </v-flex>
              <template v-if="selected.boardType === 'T'">
                <v-flex xs4 md2>
                  <v-subheader>토픽지기</v-subheader>
                </v-flex>
                <v-flex xs8 md4>
                  <div class="v-subheader">{{selected.owner}}</div>
                </v-flex>
                <v-flex md6 v-if="$vuetify.breakpoint.mdAndUp"></v-flex>
              </template>
              <v-flex xs4 md2>
                <v-subheader>설명</v-subheader>
              </v-flex>
              <v-flex xs8 md10>
                <div class="v-subheader">{{selected.boardDescription || '(등록된 설명이 없습니다.)'}}</div>
              </v-flex>
              <v-flex xs4 md2>
                <v-subheader>공개여부</v-subheader>
              </v-flex>
              <v-flex xs8 md4>
                <div class="v-subheader">{{selected.allGroupAuth === 'NONE'?'비공개':'공개'}}</div>
              </v-flex>
              <v-flex xs4 md2>
                <v-subheader>익명 게시물</v-subheader>
              </v-flex>
              <v-flex xs8 md4>
                <div class="v-subheader">{{selected.allowAnonymous?'허용':'비허용'}}</div>
              </v-flex>
              <template v-if="selected.allGroupAuth !== 'READWRITE'">
                <v-flex xs4 md2>
                  <v-subheader class="pr-0">
                    <span v-if="selected.boardType === 'T'">구독/</span>글쓰기 조건
                  </v-subheader>
                </v-flex>
                <v-flex xs8 md10>
                  <div class="v-subheader">{{selected.boardAuth.map(x=>x.groupName).join(', ')}}</div>
                </v-flex>
              </template>
            </v-layout>
            <p v-if="selected.boardType === 'T'" class="justify-center align-center text-xs-center">
              <template v-if="userBoards.some(x=>x.boardId === selected.boardId)">내가 구독중인 토픽입니다.</template>
              <template v-else-if="selected.allGroupAuth === 'READWRITE' || selected.boardAuth.some(x=>userGroups.some(y=>y === x.groupId))">이 토픽을 구독할 수 있습니다.</template>
              <template v-else-if="selected.allGroupAuth === 'READONLY'">이 토픽을 구독할 수 없지만 글을 읽을 수 있습니다.</template>
              <template v-else>내가 구독할 수 없는 조건의 토픽입니다.</template>
            </p>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="leave" flat v-if="selected.boardType === 'T' && userBoards.some(x=>x.boardId === selected.boardId)">구독취소</v-btn>
            <v-spacer/>
            <template v-if="selected.boardType === 'T' && !userBoards.some(x=>x.boardId === selected.boardId) && (selected.allGroupAuth === 'READWRITE' || selected.boardAuth.some(x=>userGroups.some(y=>y === x.groupId)))">
              <v-btn flat @click="dialog=false">취소</v-btn>
              <v-btn color="primary" @click="join" :loading="loadingJoin">구독</v-btn>
            </template>
            <template v-else>
              <v-btn color="primary" @click="dialog=false">닫기</v-btn>
            </template>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="topicCreator" :fullscreen="$vuetify.breakpoint.xsOnly" :transition="$vuetify.breakpoint.xsOnly?'dialog-bottom-transition':'fade-transition'" lazy scrollable max-width="700px">
        <topic-creator @closeDialog="closeTopicDialog" @resetBoard="resetBoard"/>
      </v-dialog>
      <v-layout v-show="dialog"></v-layout>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "SearchBoard",
  components: {
    TopicCreator: () => import("../components/TopicCreator")
  },
  data() {
    return {
      loading: false,
      loadingJoin: false,
      dialog: false,
      topicCreator: false,
      boardTypeItems: {
        T: "토픽",
        L: "라운지",
        D: "아카이브",
        E: "기타"
      },
      searchQuery: "",
      allowedToJoin: false,
      selected: {boardAuth: []},
      groupItems: [],
      headers: [{text: "구분", value: "boardType", sortable: false}, {text: "이름", value: "boardName", sortable: false}, {text: "주소", value: "boardId", sortable: false}, {text: "설명", value: "boardDescription", sortable: false}]
    };
  },
  computed: {
    boards() {
      return this.$store.getters.boards;
    },
    userBoards() {
      return this.$store.getters.userBoards;
    },
    userGroups() {
      return this.$store.getters.profile.groups;
    },
    totalBoards() {
      return this.boards.length;
    }
  },
  created() {
    this.$axios
      .get("/group", {params: {groupType: ["N", "R", "M", "G"]}, headers: {silent: true}})
      .then(response => {
        this.groupItems = response.data;
      })
      .catch(error => {
        console.log(error);
        this.$store.dispatch("showSnackbar", {text: `그룹 목록을 가져오지 못했습니다.${error && error.response && error.response.data ? "[" + error.response.data.message + "]" : ""}`, color: "error"});
      });
  },
  methods: {
    openDialog(item, join) {
      this.$axios
        .get("/board", {params: {boardId: item.boardId}})
        .then(response => {
          this.selected = response.data;
          this.allowedToJoin = join && (this.selected.allGroupAuth === "READWRITE" || this.selected.boardAuth.some(x => this.userGroups.some(y => y.groupId === x)));
          this.dialog = true;
        })
        .catch(error => {
          console.log(error);
          this.$store.dispatch("showSnackbar", {text: `정보를 가져오지 못했습니다.${error && error.response && error.response.data ? "[" + error.response.data.message + "]" : ""}`, color: "error"});
        });
    },
    join() {
      this.loadingJoin = true;
      this.$axios
        .post("/user/board", {boardId: this.selected.boardId}, {headers: {silent: true}})
        .then(response => {
          this.$store.dispatch("addUserBoard", Object.assign({}, this.selected));
          this.loadingJoin = false;
          this.dialog = false;
          this.$store.dispatch("showSnackbar", {text: "토픽을 구독하였습니다.", color: "success"});
        })
        .catch(error => {
          console.log(error);
          this.loadingJoin = false;
          this.$store.dispatch("showSnackbar", {text: `토픽을 구독하지 못했습니다.${error && error.response && error.response.data ? "[" + error.response.data.message + "]" : ""}`, color: "error"});
        });
    },
    leave() {
      this.$axios
        .delete("/user/board/" + this.selected.boardId)
        .then(response => {
          this.$store.dispatch("removeUserBoard", this.selected.boardId);
          this.dialog = false;
          this.$store.dispatch("showSnackbar", {text: "토픽을 구독 해제하였습니다.", color: "success"});
        })
        .catch(error => {
          console.log(error.response);
          this.$store.dispatch("showSnackbar", {text: error.response ? error.response.data.message || "토픽을 구독 해제하지 못했습니다." : "토픽을 구독 해제하지 못했습니다.", color: "error"});
        });
    },
    closeTopicDialog() {
      this.topicCreator = false;
    },
    resetBoard() {}
  }
};
</script>
<style>
.v-subheader {
  height: 32px;
}
td.ellipsis {
  width: 100%;
  max-width: 0;
}
table.v-table thead td:not(:nth-child(1)),
table.v-table tbody td:not(:nth-child(1)),
table.v-table thead th:not(:nth-child(1)),
table.v-table tbody th:not(:nth-child(1)),
table.v-table thead td:first-child,
table.v-table tbody td:first-child,
table.v-table thead th:first-child,
table.v-table tbody th:first-child {
  padding: 0 12px;
}
</style>
