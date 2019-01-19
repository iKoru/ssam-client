<template>
  <v-container fluid v-if="board">
    <v-card flat class="mb-2">
      <v-card-title primary-title class="py-2">
        <v-layout column>
          <v-flex>
            <v-layout row>
              <v-flex>
                <v-layout row align-center>
                  <span class="title">{{board.boardName}}</span>
                  <v-tooltip bottom v-if="reservedContents" close-delay="500">
                    <v-icon slot="activator" small class="ml-1" color="primary">calendar_today</v-icon>
                    <span v-html="reservedContents"></span>
                  </v-tooltip>
                  <span class="ml-2" v-if="childBoardItems.length > 1">
                    <v-select id="childBoardSelector" class="hideLine dense childBoardSelector cursor-pointer mt-0 pt-0" flat dense v-model="childBoardId" :items="childBoardItems" item-text="boardName" item-value="boardId" single-line hide-details @input="childBoardChanged"></v-select>
                  </span>
                </v-layout>
              </v-flex>
              <v-spacer/>
              <router-link :to="`/${this.boardId}/write`" v-if="!$route.path.endsWith('write')">
                <v-btn depressed color="primary" icon class="ma-0">
                  <v-icon small>edit</v-icon>
                </v-btn>
              </router-link>
            </v-layout>
          </v-flex>
          <v-flex>
            <span class="caption">{{board.boardDescription}}</span>
          </v-flex>
        </v-layout>
      </v-card-title>
    </v-card>
    <v-card flat :class="{'my-3':$route.path.endsWith('write')}">
      <router-view/>
    </v-card>
    <v-card flat v-if="!$route.path.endsWith('write')">
      <document-list :board="board" :hasChildren="!board.parentBoardId && childBoardItems.length > 1"/>
    </v-card>
  </v-container>
</template>

<script>
import MainLayout from "../layouts/MainLayout";
import router from "../router";
import BoardMixins from "@/components/mixins/BoardMixins";
export default {
  name: "Board",
  data: () => ({
    board: undefined,
    boardId: null,
    writeButton: true,
    childBoardId: null
  }),
  mixins: [BoardMixins],
  components: {
    DocumentList: () => import("@/components/board/DocumentList")
  },
  computed: {
    childBoardItems() {
      if (this.board.parentBoardId) {
        let siblings = this.$store.getters.boards.filter(x => x.parentBoardId === this.board.parentBoardId && x.boardId !== this.boardId);
        siblings.splice(0, 0, this.$store.getters.boards.find(x => x.boardId === this.board.parentBoardId));
        siblings.splice(0, 0, {boardId: null, boardName: this.childBoardLabel});
        return siblings;
      } else {
        let children = this.$store.getters.boards.filter(x => x.parentBoardId === this.boardId);
        children.splice(0, 0, {boardId: null, boardName: this.childBoardLabel});
        return children;
      }
    },
    childBoardLabel() {
      return (this.board.parentBoardId ? "관련 " : "하위 ") + this.boardTypeItems[this.board.boardType];
    },
    reservedContents() {
      if (this.board && this.board.reservedContents) {
        let reservedContents = this.board.reservedContents;
        let string = this.$moment(this.board.reservedDate, "YYYYMMDD").format("Y.M.D 이후 아래와 같이 변경될 예정입니다.<br>");
        for (let key in reservedContents) {
          switch (key) {
            case "boardName":
              string += `${this.boardTypeItems[this.board.boardType]} 이름 : ${reservedContents[key]}<br>`;
              break;
            case "boardDescription":
              string += `${this.boardTypeItems[this.board.boardType]} 설명 : ${reservedContents[key]}<br>`;
              break;
            case "allowAnonymous":
              string += `익명글 : ${reservedContents[key] ? "허용" : "비허용"}<br>`;
              break;
            case "useCategory":
              string += `카테고리 : ${reservedContents[key] ? "사용" : "미사용"}<br>`;
              break;
            case "allGroupAuth":
              string += `${this.boardTypeItems[this.board.boardType]} 공개/비공개 : ${this.allGroupAuthItems[reservedContents[key]]}<br>`;
              break;
            case "ownerNickName":
              string += `${this.boardTypeItems[this.board.boardType]}지기 : ${reservedContents[key]}<br>`;
              break;
            case "auth":
              string += `구독(글쓰기) 권한 : ${reservedContents[key]
                .filter(x => this.groupItems.some(y => y.value === x.groupId))
                .map(x => this.groupItems.find(y => y.value === x.groupId).text + (x.command === "INSERT" ? " 추가" : x.command === "DELETE" ? " 삭제" : ""))
                .join(", ")}<br>`;
              break;
            case "status":
              string += reservedContents[key] === "DELETED" ? `<b>${this.boardTypeItems[this.board.boardType]} 삭제 예정</b><br>` : "";
              break;
          }
        }
        return string;
      } else {
        return null;
      }
    }
  },
  methods: {
    async getBoard(boardId) {
      let response;
      try {
        response = await this.$axios.get(`/board?boardId=${boardId}`);
      } catch (error) {
        console.log(error);
        return false;
      }
      this.setBoard(response.data);
      return true;
    },
    writeDocument() {
      this.$router.push(`/${this.$route.params.boardId}/write`);
    },
    setBoard(board) {
      this.board = board;
      this.boardId = board.boardId;
      document.title = board.boardName ? board.boardName + " - Pedagy" : "Pedagy";
      this.$store.dispatch("switchBoardType", this.board.boardType === "T" ? "T" : "L");
    },
    childBoardChanged() {
      if (this.childBoardId) {
        this.$router.push("/" + this.childBoardId);
      }
    }
  },
  created() {
    this.$emit("update:layout", MainLayout);
    this.$store.dispatch("setColumnType", "HIDE_SM");
  },
  async beforeRouteUpdate(to, from, next) {
    console.log("update!!");
    if (this.$store.getters.boards.some(x => x.boardId === to.params.boardId)) {
      this.setBoard(this.$store.getters.boards.find(x => x.boardId === to.params.boardId));
      this.$store.dispatch("setColumnType", "HIDE_SM");
      this.$nextTick(() => (this.childBoardId = null));
      next();
    } else if (await this.getBoard(to.params.boardId)) {
      this.$store.dispatch("setColumnType", "HIDE_SM");
      this.$nextTick(() => (this.childBoardId = null));
      next();
    } else {
      next("/error?error=404");
    }
  },
  async beforeRouteEnter(to, from, next) {
    if (router.app.$store.getters.boards.some(x => x.boardId === to.params.boardId)) {
      next(vm => {
        vm.setBoard(router.app.$store.getters.boards.find(x => x.boardId === to.params.boardId));
      });
    } else {
      let board;
      try {
        board = await router.app.$axios.get("/board", {params: {boardId: to.params.boardId}});
      } catch (error) {
        next("/error?error=" + (error.response ? error.response.status || "404" : "404"));
        return;
      }
      next(vm => {
        vm.setBoard(board.data);
      });
    }
  }
};
</script>
<style>
#childBoardSelector {
  width: 5px;
}
.childBoardSelector {
  font-size: 14px;
  cursor: pointer;
}
.childBoardSelector .v-input__append-inner {
  margin-left: -16px;
}
.childBoardSelector .v-input__slot {
  padding-bottom: 0;
}
</style>
