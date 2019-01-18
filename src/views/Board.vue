<template>
  <v-container fluid v-if="board">
    <v-card style="box-shadow:none">
      <v-card-title primary-title class="py-2">
        <v-layout column>
          <v-flex>
            <v-layout row>
              <v-flex>
                <v-layout row>
                  <span class="title">{{board.boardName}}</span>
                  <v-flex xs3 md2 xl1 ml-2>
                    <v-select class="hideLine dense mt-0 pt-0" dense v-model="childBoardId" :items="childBoardItems" item-text="boardName" item-value="boardId" single-line hide-details :label="childBoardLabel" @input="childBoardChanged" v-if="childBoardItems.length > 0"></v-select>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-spacer/>
              <router-link :to="`/${this.boardId}`">
                <v-icon color="primary">list</v-icon>
              </router-link>
              <router-link :to="`/${this.boardId}/write`" v-if="!$route.path.endsWith('write')">
                <v-icon color="indigo">edit</v-icon>
              </router-link>
            </v-layout>
          </v-flex>
          <v-flex>
            <v-icon color="primary" small>outlined_flag</v-icon>
            <span class="body-1">{{board.boardDescription}}</span>
          </v-flex>
        </v-layout>
      </v-card-title>
    </v-card>
    <v-divider/>
    <v-card>
      <router-view/>
    </v-card>
  </v-container>
</template>

<script>
import MainLayout from "../layouts/MainLayout";
import router from "../router";
export default {
  name: "Board",
  data: () => ({
    board: undefined,
    boardId: null,
    writeButton: true,
    childBoardId:null,
    boardTypeItems: {
        T: "토픽",
        L: "라운지",
        D: "아카이브",
        X: "기타",
        E: '전직교사',
        N: '예비교사'
      }
  }),
  computed:{
    childBoardItems(){
      if(this.board.parentBoardId){
        let siblings = this.$store.getters.boards.filter(x=>x.parentBoardId === this.board.parentBoardId)
        siblings.splice(0,0,this.$store.getters.boards.find(x=>x.boardId === this.board.parentBoardId));
        return siblings
      }else{
        return this.$store.getters.boards.filter(x=>x.parentBoardId === this.boardId)
      }
    },
    childBoardLabel(){
      return (this.board.parentBoardId?'관련 ':'하위 ')+this.boardTypeItems[this.board.boardType]
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
    childBoardChanged(){
      this.$router.push('/'+this.childBoardId)
    }
  },
  created() {
    this.$emit("update:layout", MainLayout);
    this.$store.dispatch('setColumnType', 'HIDE_SM')
  },
  async beforeRouteUpdate(to, from, next) {
    if (this.$store.getters.boards.some(x => x.boardId === to.params.boardId)) {
      this.setBoard(this.$store.getters.boards.find(x => x.boardId === to.params.boardId));
      this.$store.dispatch('setColumnType', 'HIDE_SM')
      this.$nextTick(() => (this.childBoardId = null));
      next();
    } else if (await this.getBoard(to.params.boardId)) {
      this.$store.dispatch('setColumnType', 'HIDE_SM')
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
        console.log(from);
        console.log(error, JSON.stringify(error));
        console.log("fail!!!");
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
