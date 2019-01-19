<template>
  <v-flex>
    <v-data-table :headers="headers" xs12 :items="documents" id="documentTable" hide-actions :rows-per-page-items="[10]" :loading="loading" :total-items="totalDocuments" :pagination.sync="pagination" class="noResult">
      <template slot="headers" slot-scope="props">
        <tr>
          <th v-for="header in props.headers" :key="header.value" :class="{'px-1':true, 'text-xs-center':header.align === 'center', 'text-xs-left':header.align === 'left', 'text-xs-right':header.align === 'right', 'font-weight-bold':true, 'black--text':true}" :width="header.width || false">{{header.text}}</th>
        </tr>
      </template>
      <template slot="items" slot-scope="props">
        <tr>
          <template v-if="$vuetify.breakpoint.xsOnly && hasChildren">
            <td class="text-xs-center pa-1 grey--text lighten-1" colspan="2">
              <!--prettyhtml-ignore-->
              <v-layout row>
                [<router-link :to="'/'+props.item.boardId" class="grey--text lighten-1">{{ boardItems.some(x=>x.boardId === props.item.boardId)?($vuetify.breakpoint.smAndUp?boardItems.find(x=>x.boardId === props.item.boardId).boardName:boardItems.find(x=>x.boardId === props.item.boardId).boardName.replace(boardTypeItems[board.boardType],'')):'' }}</router-link>]
                <div class="ellipsis ml-1">
                  <router-link :to="`/${props.item.boardId}/${props.item.documentId}`">{{props.item.title}}</router-link>
                </div>
                <span class="primary--text" title="댓글 수">{{props.item.commentCount > 0?'['+props.item.commentCount+']':''}}</span>
              </v-layout>
            </td>
          </template>
          <template v-else>
            <td class="pa-1 grey--text lighten-1" v-if="hasChildren">
              <!--prettyhtml-ignore-->
              <v-layout row justify-center>
                [<router-link :to="'/'+props.item.boardId" class="grey--text lighten-1">{{ boardItems.some(x=>x.boardId === props.item.boardId)?($vuetify.breakpoint.smAndUp?boardItems.find(x=>x.boardId === props.item.boardId).boardName:boardItems.find(x=>x.boardId === props.item.boardId).boardName.replace(boardTypeItems[board.boardType],'')):'' }}</router-link>]
              </v-layout>
            </td>
            <td class="text-xs-left pa-1" v-if="!hasChildren && board.category && board.category.length > 0">{{ props.item.category }}</td>
            <td :class="{'text-xs-left':true, 'py-1':true, 'px-2':!hasChildren, 'px-0':hasChildren, 'ellipsis':true, 'cursor-pointer':true}" @click.stop="$router.push(`/${props.item.boardId}/${props.item.documentId}`)">
              <v-layout row>
                <div class="ellipsis">
                  <router-link :to="`/${props.item.boardId}/${props.item.documentId}`">{{props.item.title}}</router-link>
                </div>
                <span class="primary--text" title="댓글 수">{{props.item.commentCount > 0?'['+props.item.commentCount+']':''}}</span>
              </v-layout>
            </td>
          </template>
          <td class="text-xs-center pa-1 multi-row" v-if="$vuetify.breakpoint.smAndUp">{{ props.item.nickName }}</td>
          <td class="text-xs-right pa-1">{{ props.item.voteUpCount }}</td>
          <td class="text-xs-right pa-1 grey--text lighten-1">{{ $moment(props.item.writeDateTime, 'YYYYMMDDHHmmss').isSame($moment(), 'day')?$moment(props.item.writeDateTime, 'YYYYMMDDHHmmss').format('HH:mm'):$moment(props.item.writeDateTime, 'YYYYMMDDHHmmss').format($vuetify.breakpoint.xsOnly?'M.D':'Y.M.D') }}</td>
        </tr>
      </template>
      <template slot="no-data">표시할 항목이 없습니다.
        <v-btn color="primary" @click="getDocuments">새로고침</v-btn>
      </template>
    </v-data-table>
  </v-flex>
</template>
<script>
import BoardMixins from "@/components/mixins/BoardMixins";
export default {
  name: "DocumentList",
  mixins: [BoardMixins],
  props: ["board", "hasChildren"],
  data() {
    return {
      documents: [],
      totalDocuments: 0,
      loading: false,
      pagination: {}
    };
  },
  computed: {
    headers() {
      let headers = [{text: "제목", value: "title", sortable: false, align: "center"}, {text: "추천", value: "voteUpCount", sortable: false, align: "right", width: "30"}, {text: "날짜", value: "writeDateTime", sortable: false, align: "right", width: this.$vuetify.breakpoint.xsOnly ? "50" : "100"}];
      if (this.$vuetify.breakpoint.smAndUp) {
        headers.splice(1, 0, {text: "글쓴이", value: "nickName", sortable: false, align: "center", width: "100"});
      }
      if (!this.hasChildren && this.board.category) {
        headers.splice(0, 0, {text: "카테고리", value: "category", sortable: false, align: "left"});
      }
      if (this.hasChildren) {
        headers.splice(0, 0, {text: this.boardTypeItems[this.board.boardType], value: "boardId", sortable: false, align: "center", width: this.$vuetify.breakpoint.smAndUp ? "100" : "50"});
      }
      return headers;
    },
    boardItems() {
      return this.$store.getters.boards;
    }
  },
  methods: {
    getDocuments(boardId) {
      this.$axios
        .get(`/${boardId || this.board.boardId}`, {params: {page: this.$route.params.page || 0}})
        .then(response => {
          console.log(response);
          this.documents = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.getDocuments(this.$route.params.boardId);
  },
  watch: {
    "$route.params": {
      handler(val) {
        this.getDocuments(val.boardId);
      },
      deep: true,
      immediate: true
    },
    pagination: {
      handler() {
        this.getDocuments();
      },
      deep: true
    }
  }
};
</script>
<style>
#documentTable table {
  table-layout: fixed;
}
#documentTable thead tr {
  height: 24px;
}
#documentTable thead th {
  padding-left: 0;
  padding-right: 0;
}
#documentTable tbody td,
#documentTable tbody th {
  height: 32px;
}
#documentTable tbody tr:last-child {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
</style>