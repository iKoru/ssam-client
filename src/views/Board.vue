<template>
  <v-container fluid v-if="board">
    <v-card style="box-shadow:none">
      <v-card-title primary-title class="py-2">
        <v-layout column>
          <v-flex>
            <v-layout row>
              <v-flex>
                <span class="title">{{board.boardName}}</span>
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
    writeButton: true
  }),
  components: {},
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
      document.title = board.boardName ? board.boardName + ' - Pedagy' : 'Pedagy'
      this.$store.dispatch("switchBoardType", this.board.boardType === "T" ? "T" : "L");
    }
  },
  created() {
    this.$emit("update:layout", MainLayout);
  },
  async beforeRouteUpdate(to, from, next) {
    if(this.$store.getters.boards.some(x=>x.boardId === to.params.boardId)){
      this.setBoard(this.$store.getters.boards.find(x=>x.boardId === to.params.boardId));
      next();
    }else if (await this.getBoard(to.params.boardId)) {
      //TODO : get notifications request
      next();
    } else {
      next('/error?error=404');
    }
  },
  async beforeRouteEnter(to, from, next) {
    if(router.app.$store.getters.boards.some(x=>x.boardId === to.params.boardId)){
      next(vm => {
        vm.setBoard(router.app.$store.getters.boards.find(x=>x.boardId === to.params.boardId))
      });
    }else{
      let board;
      try {
        board = await router.app.$axios.get("/board", {params: {boardId: to.params.boardId}});
      } catch (error) {
        console.log(from);
        console.log(error, JSON.stringify(error));
        console.log("fail!!!");
        next('/error?error=' + (error.response ? error.response.status || '404':'404'));
        return;
      }
      next(vm => {
        vm.setBoard(board.data);
      });
    }
  }
};
</script>
