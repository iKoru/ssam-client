<template>
  <v-container px-0 py-0 fluid>
    <v-layout class="menu">
      <v-flex p-2>
        <v-chip>게시판 목록</v-chip>
        <v-btn :key="index" v-for="(board, index) in boards">
          <router-link :to="{path:`/board/${board.boardId}`}" exact>{{board.boardName}}</router-link>
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
//import axios from 'axios'
export default {
  name: "MenuBar",
  props: ["boards"]
};
</script>

<style>
.menu {
  height: 150px;
  background-color: lightgrey;
}
@media(max-width:600px){
  .menu{
    height:35px;
    overflow:auto;
  }
}
</style>
