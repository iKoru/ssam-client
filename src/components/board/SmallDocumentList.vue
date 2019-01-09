<template>
  <div class="mt-3">
    <template v-if="!list || list.length === 0">
      <div>표시할 내용이 없습니다.</div>
    </template>
    <v-list v-else dense light>
      <template v-for="n in (maxCount || 10)">
        <v-subheader v-if="list[n-1].header" :key="n-1">{{ list[n-1].header }}</v-subheader>
        <v-divider v-else-if="list[n-1].divider" :inset="list[n-1].inset" :key="n-1"></v-divider>

        <v-list-tile v-else :key="n-1" :to="'/'+list[n-1].boardId+'/'+list[n-1].documentId" ripple>
          <v-list-tile-content>
            <v-list-tile-title>
              <v-layout row>
                <span class="ellipsis">{{list[n-1].title}}</span>
                <v-spacer/>
                <span class="tiny align-center">
                  <v-icon color="red darken-2">favorite</v-icon>
                  {{list[n-1].voteUpCount}}
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
  props: ["list", "maxCount"]
};
</script>
<style scoped>
.ellipsis {
  max-width: 275px;
}
</style>