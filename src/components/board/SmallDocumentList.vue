<template>
  <div>
    <template v-if="list.length === 0">
      <div>표시할 내용이 없습니다.</div>
    </template>
    <v-list v-else dense>
      <template v-for="(item, index) in list">
        <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>

        <v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider>

        <v-list-tile v-else :key="item.documentId" :to="'/'+item.boardId+'/'+item.documentId" ripple>
          <v-list-tile-content>
            <v-list-tile-title>
              <v-layout row>
                <span class="ellipsis">{{item.title}}</span>
                <v-spacer/>
                <span class="tiny align-center">
                  <v-icon color="red darken-2">favorite</v-icon>
                  {{item.voteUpCount}}
                </span>
              </v-layout>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </div>
</template>
<script>
export default {
  name: "smallDocumentList",
  props: ["list"]
};
</script>
<style>
.ellipsis {
  max-width: 275px;
}
</style>