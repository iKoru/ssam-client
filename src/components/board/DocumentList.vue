<template>
  <v-flex>
    <v-layout column>
      <v-flex>
        <v-data-table :headers="headers" xs12 :items="documents" id="documentTable" hide-actions :rows-per-page-items="[$vuetify.breakpoint.xsOnly?10:20]" :loading="loading" :total-items="totalDocuments" :pagination.sync="pagination" :no-data-text="noDataText">
          <template slot="headers" slot-scope="props">
            <tr>
              <th v-for="header in props.headers" :key="header.value" :class="{'px-1 font-weight-bold black--text body-2':true, 'text-xs-center':header.align === 'center', 'text-xs-left':header.align === 'left', 'text-xs-right':header.align === 'right'}" :width="header.width || false">{{header.text}}</th>
            </tr>
          </template>
          <template slot="items" slot-scope="props">
            <tr>
              <td class="pa-1 grey--text lighten-1" v-if="hasChildren">
                <!--prettyhtml-ignore-->
                <v-layout row justify-center>
                  [<router-link :to="'/'+props.item.boardId" class="grey--text lighten-1">{{ boardItems.some(x=>x.boardId === props.item.boardId)?($vuetify.breakpoint.smAndUp?boardItems.find(x=>x.boardId === props.item.boardId).boardName.replace(/\s/g, '').substring(0,5):boardItems.find(x=>x.boardId === props.item.boardId).boardName.replace(boardTypeItems[board.boardType],'').replace(/\s/g, '').substring(0,2)):'' }}</router-link>]
                </v-layout>
              </td>
              <td class="text-xs-left pa-1" v-if="!hasChildren && board.category && board.category.length > 0">{{ props.item.category }}</td>
              <td :class="{'text-xs-left py-1 ellipsis cursor-pointer':true, 'px-2':!hasChildren, 'px-0':hasChildren, 'font-weight-bold':$route.params.documentId === props.item.documentId}" @click.stop="$router.push(`/${props.item.boardId}/${props.item.documentId}`)">
                <v-layout row>
                  <div class="ellipsis text-xs-left">
                    <router-link :to="`/${board.boardId}/${props.item.documentId}`">{{props.item.title}}</router-link>
                  </div>
                  <span class="accent--text" title="댓글 수">{{props.item.commentCount > 0?'['+props.item.commentCount+']':''}}</span>
                </v-layout>
              </td>
              <td class="text-xs-center pa-1 ellipsis" v-if="$vuetify.breakpoint.smAndUp">{{ props.item.nickName }}</td>
              <td class="text-xs-right pa-1">{{ props.item.voteUpCount }}</td>
              <td class="text-xs-right pa-1 grey--text lighten-1">{{ $moment(props.item.writeDateTime, 'YYYYMMDDHHmmss').isSame($moment(), 'day')?$moment(props.item.writeDateTime, 'YYYYMMDDHHmmss').format('HH:mm'):$moment(props.item.writeDateTime, 'YYYYMMDDHHmmss').format($vuetify.breakpoint.xsOnly?'M/D':'Y/M/D') }}</td>
            </tr>
          </template>
          <template slot="no-data">
            <tr><td colspan="4" class="text-xs-center multi-row">{{noDataText}}</td></tr>
          </template>
        </v-data-table>
      </v-flex>
      <v-flex>
        <v-layout row pa-2 align-center>
          <v-spacer/>
          <v-flex xs6 sm4>
            <v-text-field hide-details dense class="dense mt-0 pt-0" v-model="searchQuery" append-outer-icon="search" @keydown.enter.stop="search" @click:append-outer="search" placeholder="제목 또는 내용으로 검색"></v-text-field>
          </v-flex>
          <v-btn v-show="$route.params.documentId" depressed small class="short" color="primary" @click="$emit('write')">쓰기</v-btn>
        </v-layout>
      </v-flex>
      <v-flex text-xs-center mt-2 xs12>
        <v-pagination id="documentPagination" v-model="page" :length="pages" :total-visible="$vuetify.breakpoint.smAndUp?10:undefined"></v-pagination>
      </v-flex>
    </v-layout>
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
      pagination: {}, // page object for data table component
      page: null, // page element for pagination component
      boardId: null, //local current boardId,
      noDataText: "아직 작성된 글이 없습니다. 첫 글을 작성해보세요!",
      searchQuery: null
    };
  },
  computed: {
    headers() {
      let headers = [{text: "제목", value: "title", sortable: false, align: "center"}, {text: "추천", value: "voteUpCount", sortable: false, align: "right", width: this.$vuetify.breakpoint.xsOnly ? "30" : "50"}, {text: "날짜", value: "writeDateTime", sortable: false, align: "right", width: this.$vuetify.breakpoint.xsOnly ? "50" : "100"}];
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
    },
    pages() {
      return this.pagination.rowsPerPage ? Math.ceil(this.totalDocuments / this.pagination.rowsPerPage) : 1;
    }
  },
  methods: {
    getDocuments() {
      this.loading = true;
      this.$axios
        .get(`/${this.boardId}`, {params: {page: this.pagination.page, rowsPerPage: this.$vuetify.breakpoint.xsOnly ? 10 : 20}, headers: {silent: true}})
        .then(response => {
          this.documents = response.data;
          this.totalDocuments = this.documents.length > 0 ? this.documents[0].totalCount : 0;
          this.noDataText = "아직 작성된 글이 없습니다. 첫 글을 작성해보세요!";
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
          console.log(error);
          this.noDataText = error.response ? error.response.data.message : "글 목록을 가져오지 못했습니다.";
          this.$store.dispatch("showSnackbar", {text: `${error.response ? error.response.data.message : "글 목록을 가져오지 못했습니다."}`, color: "error"});
        });
    },
    search(){
      if(this.searchQuery){
        this.$router.push(`/searchDocument?boardId=${this.board.boardId}&searchQuery=${this.searchQuery}`);
      }
    }
  },
  created() {
    this.page = this.$route.query.page * 1 > 0 && Number.isInteger(this.$route.query.page * 1) ? this.$route.query.page * 1 : 1; //set page and trigger the watch function
  },
  watch: {
    "$route.params": {
      handler(val) {
        if (this.boardId !== val.boardId) {
          this.documents = [];
          this.totalDocuments = 0;
          const queryPage = this.$route.query.page * 1 > 0 && Number.isInteger(this.$route.query.page * 1) ? this.$route.query.page * 1 : 1;
          this.boardId = val.boardId;
          this.$nextTick(() => {
            this.pagination.page = queryPage;
            this.page = queryPage;
            this.getDocuments();
          });
        }
      },
      deep: true,
      immediate: true
    },
    page(val) {
      if (this.pagination.page !== val) {
        this.pagination.page = val;
        this.getDocuments();
      }
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
#documentPagination .v-pagination__item,
#documentPagination .v-pagination__item--active,
#documentPagination .v-pagination__navigation {
  box-shadow: none;
  margin: 0;
  padding: 0;
}
#documentPagination .v-pagination__item--active {
  color: black;
  font-weight: bold;
  font-size: 16px;
  background-color: white !important;
  border-color: white !important;
}
</style>