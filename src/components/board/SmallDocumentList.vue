<template>
  <div class="mt-3">
    <template v-if="!list || list.length === 0">
      <div>표시할 내용이 없습니다.</div>
    </template>
    <v-list v-else dense light class="dense-list">
      <template v-for="n in Math.min((maxCount || 10), list.length)">
        <v-subheader v-if="list[n-1].header" :key="n-1">{{ list[n-1].header }}</v-subheader>
        <v-divider v-else-if="list[n-1].divider" :inset="list[n-1].inset" :key="n-1"></v-divider>

        <v-list-tile v-else :key="n-1" :to="'/'+list[n-1].boardId+'/'+list[n-1].documentId" class="dense-list" ripple>
          <v-list-tile-content>
            <v-list-tile-title>
              <v-layout row>
                <span class="ellipsis">{{list[n-1].title}}</span>
                <span v-if="list[n-1].commentCount > 0" class="primary--text">[{{list[n-1].commentCount}}]</span>
                <v-spacer/>
                <v-subheader class="tiny align-center mx-1 px-0" v-if="showDateTime">
                  <small>
                    <timeago :datetime="list[n-1].writeDateTime" :autoUpdate="true"></timeago>
                  </small>
                </v-subheader>
                <span class="tiny align-center">
                  <v-icon small color="red darken-2">favorite</v-icon>
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
  props: ["list", "maxCount", "showDateTime"]
};
</script>