<template>
  <v-container fluid v-if="board">
    <v-card class>
      <v-card-title primary-title class="py-2">
        <div class="w-100">
          <h3 class="w-100">
            {{board.boardName}}
            <v-icon class="float-right" color="indigo" @click.stop="writeDocument">mdi-lead-pencil</v-icon>
          </h3>
        </div>
      </v-card-title>
    </v-card>
    <v-card class="mb-1">
      <v-card-title primary-title class="py-2">
        <div class="w-100">
          <v-icon size="medium" color="orange">mdi-lightbulb-outline</v-icon>
          <h5 color="grey" class="w-100 d-inline">{{board.boardDescription}}</h5>
        </div>
      </v-card-title>
    </v-card>
    <v-card>
      <router-view/>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Board",
  data: () => ({
    board: undefined
  }),
  components: {},
  created() {
    this.getBoard();
  },
  methods: {
    getBoard: function() {
      let boardId = this.$route.params.boardId;
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
      this.$router.push(`${this.$route.params.boardId}/writeDocument`)
    }
  },
  watch: {
    $route: {
      handler(to, from) {
        console.log("watchroute");
        if (to.params.boardId !== from.params.boardId) this.getBoard();
      }
    }
  }
};
</script>
