<template>
  <v-container px-0 py-0 fluid>
    <v-layout class="menu">
      <v-flex p-2>
        <v-chip>게시판 목록</v-chip>
        <v-btn :key="index" v-for="(board, index) in boards" @click.stop="$router.replace(`/board/${board.boardId}`)">
          {{board.boardName}}
        </v-btn>
        
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import axios from 'axios'
import { createNamespacedHelpers } from 'vuex';
  export default {
    name: 'Signin',
    props: ['boards']
  }
</script>

<style scoped>
.menu {
    height: 150px;
    background-color: lightgrey;  
}
</style>