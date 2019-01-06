<template>
  <v-container fluid v-if="board">
    <v-card style="box-shadow:none">
      <v-card-title primary-title class="py-2">
        <div class="w-100">
          <h3 class="w-100">
            {{board.boardName}}
            <v-icon v-if="!$route.path.includes('writeDocument')" class="float-right" color="indigo" @click.stop="writeDocument">mdi-lead-pencil</v-icon>
          </h3>
          <div>
          <v-icon size="medium" color="orange">mdi-lightbulb-outline</v-icon>
          <h5 color="grey" class="w-100 d-inline">{{board.boardDescription}}</h5>
          </div>
        </div>
      </v-card-title>
    </v-card>
    <v-divider/>
    <v-card>
      <router-view/>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Board",
  data: () => ({
    board: undefined,
    writeButton: true
  }),
  components: {},
  methods: {
    getBoard: function(boardId) {
      // let boardId = this.$route.params.boardId;
      console.log(boardId)
      this.$axios
        .get(`/board?boardId=${boardId}`)
        .then(response => {
          console.log(response);
          this.board = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    writeDocument: function () {
      this.$router.push(`/${this.$route.params.boardId}/writeDocument`)
    }
  },
  created () {
    this.getBoard(this.$route.params.boardId)
  },
  beforeRouteUpdate (to, from, next) {
    this.getBoard(to.path.split('/')[1])
    next()
  }
};
</script>

<style scoped>
</style>