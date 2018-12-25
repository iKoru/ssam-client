<template>
  <v-card flat>
    <v-card-title>
      <v-layout row wrap>
        <v-flex xs12>
          <h3 class="headline">내가 쓴 글 목록</h3>
        </v-flex>
        <v-flex xs12>
          <v-data-table :headers="headers" xs12 :items="userDocuments" id="userDocumentTable" :rows-per-page-items="[15]" :loading="loading" :total-items="totalUserDocuments" :pagination.sync="pagination">
            <template slot="items" slot-scope="props">
              <tr>
                <td class="text-xs-left" v-if="$vuetify.breakpoint.smAndUp">{{ boardItems.find(x=>x.boardId === props.item.boardId).boardName }}</td>
                <td class="text-xs-left ellipsis">
                  <a :href="`/${props.item.boardId}/${props.item.documentId}`" target="_blank">
                    {{ props.item.title }}
                    <span class="primary--text">{{props.item.commentCount > 0?'['+props.item.commentCount+']':''}}</span>
                  </a>
                </td>
                <td class="text-xs-right">{{ props.item.voteUpCount }}</td>
                <td class="text-xs-right">{{ $moment(props.item.writeDateTime, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm:ss') }}</td>
              </tr>
            </template>
            <template slot="no-data">
              {{this.noresult}}
              <v-btn color="primary" @click="getMyDocuments">새로고침</v-btn>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-card-title>
  </v-card>
</template>
<script>
export default {
  name: "MyDocument",
  data() {
    return {
      userDocuments: [],
      loading: false,
      totalUserDocuments: 0,
      pagination: {}
    };
  },
  computed: {
    boardItems() {
      return this.$store.getters.boards;
    },
    noresult() {
      return this.loading ? "작성한 글을 불러오고 있습니다. 잠시만 기다려주세요..." : "아직 작성한 글이 없으시군요!";
    },
    headers() {
      return this.$vuetify.breakpoint.xsOnly ? [{text: "제목", sortable: false, align: "left", value: "title", class: "ellipsis", width: "100%"}, {text: "추천", align: "right", sortable: false, value: "voteUpCount"}, {text: "작성일", sortable: false, align: "right", value: "writeDateTime"}] : [{text: "게시판", align: "left", sortable: false, value: "boardId"}, {text: "제목", sortable: false, align: "left", value: "title", class: "ellipsis", width: "100%"}, {text: "추천", align: "right", sortable: false, value: "voteUpCount"}, {text: "작성일", sortable: false, align: "right", value: "writeDateTime"}];
    }
  },
  methods: {
    getMyDocuments() {
      this.loading = true;
      this.$axios
        .get("/user/document", {
          params: {
            page: this.pagination.page
          },
          headers: {silent: true}
        })
        .then(response => {
          this.userDocuments = response.data;
          this.totalUserDocuments = response.data.length > 0 ? response.data[0].totalCount : 0;
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          this.$router.app.$emit("showSnackbar", `회원게시물 리스트를 불러오지 못했습니다.[${err.response.data ? err.response.data.message : ""}]`, "error");
          return;
        });
    }
  },
  watch: {
    pagination: {
      handler() {
        this.getMyDocuments();
      },
      deep: true
    }
  },
  created() {
    this.getMyDocuments();
  }
};
</script>
<style>
td {
  white-space: nowrap;
}
</style>
