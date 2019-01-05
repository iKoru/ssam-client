<template>
  <v-card flat>
    <v-card-title>
      <v-layout row>
        <v-flex xs12 sm10 lg8 xl6 class="mx-auto">
          <v-layout row>
            <h3 class="headline">내가 쓴 댓글 목록</h3>
          </v-layout>
          <v-flex xs12>
            <v-data-table :headers="headers" xs12 :items="userComments" id="userCommentTable" :rows-per-page-items="[15]" :loading="loading" :total-items="totalUserComments" :pagination.sync="pagination" class="customAction">
              <template slot="items" slot-scope="props">
                <tr @click="selected = (selected===props.index?null:props.index)">
                  <td>
                    <v-checkbox :input-value="selected === props.index" primary hide-details></v-checkbox>
                  </td>
                  <td class="text-xs-left" v-if="$vuetify.breakpoint.mdAndUp">{{ boardItems.some(x=>x.boardId === props.item.boardId)?boardItems.find(x=>x.boardId === props.item.boardId).boardName:'(삭제된 게시판)' }}</td>
                  <td class="text-xs-left cursor-pointer" @click.stop="openLink(`/${props.item.boardId}/${props.item.documentId}`)">
                    <a :href="`/${props.item.boardId}/${props.item.documentId}`" target="_blank">
                      {{ getShortContents(props.item.contents) }}
                      <span class="primary--text" title="대댓글 수">{{props.item.childCount > 0?'['+props.item.childCount+']':''}}</span>
                    </a>
                  </td>
                  <td class="text-xs-right">{{ props.item.voteUpCount }}</td>
                  <td class="text-xs-right">{{ $moment(props.item.writeDateTime, 'YYYYMMDDHHmmss').format('YYYY-MM-DD') }}</td>
                </tr>
              </template>
              <template slot="no-data">
                {{this.noresult}}
                <v-btn color="primary" @click="getMyComments">새로고침</v-btn>
              </template>
              <template slot="actions-prepend">
                <v-btn color="error" @click="deleteRow" :disabled="selected === null">삭제</v-btn>
                <v-spacer></v-spacer>
              </template>
            </v-data-table>
          </v-flex>
        </v-flex>
      </v-layout>
    </v-card-title>
  </v-card>
</template>
<script>
export default {
  name: "MyComment",
  data() {
    return {
      selected: null,
      userComments: [],
      loading: false,
      totalUserComments: 0,
      pagination: {}
    };
  },
  computed: {
    boardItems() {
      return this.$store.getters.boards;
    },
    noresult() {
      return this.loading ? "작성한 댓글을 불러오고 있습니다. 잠시만 기다려주세요..." : "아직 작성한 댓글이 없으시군요!";
    },
    headers() {
      return this.$vuetify.breakpoint.smAndDown ? [{text: "", sortable: false, value: ""}, {text: "내용", sortable: false, align: "left", value: "contents", class: "ellipsis", width: "100%"}, {text: "추천", align: "right", sortable: false, value: "voteUpCount"}, {text: "작성일", sortable: false, align: "right", value: "writeDateTime"}] : [{text: "", sortable: false, value: ""}, {text: "게시판", align: "left", sortable: false, value: "boardId"}, {text: "내용", sortable: false, align: "left", value: "contents", class: "ellipsis", width: "100%"}, {text: "추천", align: "right", sortable: false, value: "voteUpCount"}, {text: "작성일", sortable: false, align: "right", value: "writeDateTime"}];
    }
  },
  methods: {
    getMyComments() {
      this.loading = true;
      this.$axios
        .get("/user/comment", {
          params: {
            page: this.pagination.page
          },
          headers: {silent: true}
        })
        .then(response => {
          this.userComments = response.data;
          this.totalUserComments = response.data.length > 0 ? response.data[0].totalCount : 0;
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          this.$router.app.$emit("showSnackbar", `내가 쓴 댓글 목록을 불러오지 못했습니다.[${err.response.data ? err.response.data.message : ""}]`, "error");
          return;
        });
    },
    openLink(path) {
      const routeData = this.$router.resolve({path: path});
      window.open(routeData.href, "_blank");
    },
    getShortContents(contents) {
      if (this.$vuetify.breakpoint.xsOnly) {
        return contents.length > 10 ? contents.substring(0, 10) + "..." : contents;
      } else if (this.$vuetify.breakpoint.smOnly) {
        return contents.length > 13 ? contents.substring(0, 13) + "..." : contents;
      } else if (this.$vuetify.breakpoint.mdOnly) {
        return contents.length > 24 ? contents.substring(0, 24) + "..." : contents;
      } else if (this.$vuetify.breakpoint.lgOnly) {
        return contents.length > 30 ? contents.substring(0, 28) + "..." : contents;
      } else {
        return contents.length > 36 ? contents.substring(0, 36) + "..." : contents;
      }
    },
    deleteRow() {
      if (this.selected) {
        this.$axios
          .put("/comment", {commentId: this.userComments[this.selected].commentId, isDeleted: true})
          .then(response => {
            if (this.userComments.length === 1 && this.pagination.page > 1) {
              this.pagination.page--;
            }
            this.getMyComments();
            this.selected = null;
            this.$store.dispatch("showSnackbar", {text: "댓글을 삭제하였습니다.", color: "success"});
          })
          .catch(error => {
            this.$store.dispatch("showSnackbar", {text: error.response ? error.response.data.message || "댓글을 삭제하지 못했습니다." : "댓글을 삭제하지 못했습니다.", color: "error"});
          });
      } else {
        this.$store.dispatch("showSnackbar", {text: "삭제할 댓글을 선택해주세요.", color: "error"});
      }
    }
  },
  watch: {
    pagination: {
      handler() {
        this.getMyComments();
      },
      deep: true
    }
  },
  created() {
    this.getMyComments();
  }
};
</script>
<style>
td {
  white-space: nowrap;
}
table.v-table thead td:not(:nth-child(1)),
table.v-table tbody td:not(:nth-child(1)),
table.v-table thead th:not(:nth-child(1)),
table.v-table tbody th:not(:nth-child(1)),
table.v-table thead td:first-child,
table.v-table tbody td:first-child,
table.v-table thead th:first-child,
table.v-table tbody th:first-child {
  padding: 0 12px;
}
td:first-child {
  padding: 0 12px;
}
td:first-child .v-input--selection-controls__input {
  margin-right: 0;
}
</style>
