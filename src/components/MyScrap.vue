<template>
  <v-card flat>
    <v-card-title>
      <v-layout row>
        <v-flex xs12 sm10 lg8 xl6 class="mx-auto">
          <v-layout row align-center>
            <h3 class="headline">내 스크랩 목록</h3>
            <v-spacer v-if="$vuetify.breakpoint.smAndUp"/>
            <v-select class="selectScrapGroup" v-model="scrapGroupId" :items="scrapGroups" label="그룹 선택" hide-details dense item-text="scrapGroupName" item-value="scrapGroupId" append-outer-icon="settings" @click:append-outer="openDialog" id="selectScrapGroup"></v-select>
            <v-dialog v-model="dialog" :fullscreen="$vuetify.breakpoint.xsOnly" :transition="$vuetify.breakpoint.xsOnly?'dialog-bottom-transition':'fade-transition'" lazy scrollable max-width="700px">
              <scrap-group-manager :scrapGroups="scrapGroups" :dialog="dialog" @closeDialog="closeDialog" @updateScrapGroup="getScrapGroups"/>
            </v-dialog>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card-title>
    <v-layout>
      <v-flex xs12 sm10 lg8 xl6 class="mx-auto">
        <v-data-table :headers="headers" xs12 :items="userScraps" id="userScrapTable" :rows-per-page-items="[10]" :loading="loading" :total-items="totalUserScraps" :pagination.sync="pagination" class="customAction">
          <template slot="items" slot-scope="props">
            <tr @click="selected = (selected===props.index?null:props.index)">
              <td>
                <v-checkbox :input-value="selected === props.index" primary hide-details></v-checkbox>
              </td>
              <td class="text-xs-left" v-if="$vuetify.breakpoint.smAndUp">{{ boardItems.some(x=>x.boardId === props.item.boardId)?boardItems.find(x=>x.boardId === props.item.boardId).boardName:'(삭제된 게시판)' }}</td>
              <td class="text-xs-left multi-row cursor-pointer" @click.stop="openLink(`/${props.item.boardId}/${props.item.documentId}`)">
                <a :href="`/${props.item.boardId}/${props.item.documentId}`" target="_blank">
                  {{ props.item.title }}
                  <span class="primary--text" title="댓글 수">{{props.item.commentCount > 0?'['+props.item.commentCount+']':''}}</span>
                </a>
              </td>
              <td class="text-xs-right">{{ props.item.voteUpCount }}</td>
              <td class="text-xs-right">{{ $moment(props.item.writeDateTime, 'YYYYMMDDHHmmss').format('Y-MM-DD') }}</td>
            </tr>
          </template>
          <template slot="no-data">
            {{this.noresult}}
            <v-btn color="primary" @click="getMyScraps">새로고침</v-btn>
          </template>
          <template slot="actions-prepend">
            <v-btn color="error" @click="deleteRow" :disabled="selected === null">삭제</v-btn>
            <v-spacer></v-spacer>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-card>
</template>
<script>
export default {
  name: "MyScrap",
  components: {
    ScrapGroupManager: () => import("./ScrapGroupManager")
  },
  data() {
    return {
      dialog: false,
      selected: null,
      userScraps: [],
      scrapGroupId: null,
      scrapGroups: [],
      loading: false,
      totalUserScraps: 0,
      pagination: {}
    };
  },
  computed: {
    boardItems() {
      return this.$store.getters.boards;
    },
    noresult() {
      return this.loading ? "스크랩한 글을 불러오고 있습니다. 잠시만 기다려주세요..." : "아직 스크랩한 글이 없으시군요!";
    },
    headers() {
      return this.$vuetify.breakpoint.xsOnly ? [{text: "", sortable: false, value: ""}, {text: "제목", sortable: false, align: "left", value: "title", class: "ellipsis", width: "100%"}, {text: "추천", align: "right", sortable: false, value: "voteUpCount"}, {text: "작성일", sortable: false, align: "right", value: "writeDateTime"}] : [{text: "", sortable: false, value: ""}, {text: "게시판", align: "left", sortable: false, value: "boardId"}, {text: "제목", sortable: false, align: "left", value: "title", class: "ellipsis", width: "100%"}, {text: "추천", align: "right", sortable: false, value: "voteUpCount"}, {text: "작성일", sortable: false, align: "right", value: "writeDateTime"}];
    }
  },
  methods: {
    getMyScraps() {
      this.loading = true;
      this.$axios
        .get("/scrap", {
          params: {
            scrapGroupId: this.scrapGroupId,
            page: this.pagination.page
          }
        })
        .then(response => {
          this.userScraps = response.data;
          this.totalUserScraps = response.data.length > 0 ? response.data[0].totalCount : 0;
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          this.$router.app.$emit("showSnackbar", `스크랩 목록을 불러오지 못했습니다.[${err.response.data ? err.response.data.message : ""}]`, "error");
          return;
        });
    },
    openLink(path) {
      const routeData = this.$router.resolve({path: path});
      window.open(routeData.href, "_blank");
    },
    deleteRow() {
      if (this.selected) {
        this.$axios
          .delete(`/scrap/${this.scrapGroupId}/${this.userScraps[this.selected].documentId}`)
          .then(response => {
            this.getMyScraps();
            this.selected = null;
            this.$store.dispatch("showSnackbar", {text: "스크랩을 삭제하였습니다.", color: "success"});
          })
          .catch(error => {
            this.$store.dispatch("showSnackbar", {text: error.response ? error.response.data.message || "스크랩을 삭제하지 못했습니다." : "스크랩을 삭제하지 못했습니다.", color: "error"});
          });
      } else {
        this.$store.dispatch("showSnackbar", {text: "삭제할 스크랩을 선택해주세요.", color: "error"});
      }
    },
    getScrapGroups() {
      this.$axios
        .get("/scrap/group", {headers: {silent: true}})
        .then(response => {
          this.scrapGroups = response.data;
          if (this.scrapGroupId !== this.scrapGroups[0].scrapGroupId || this.pagination.page !== 1) {
            this.pagination.page = 1;
            this.scrapGroupId = this.scrapGroups[0].scrapGroupId;
            this.getMyScraps();
          }
        })
        .catch(error => {
          this.$store.dispatch("showSnackbar", {text: error.response ? error.response.data.message || "스크랩 그룹 목록을 가져오지 못했습니다." : "스크랩 그룹 목록을 가져오지 못했습니다.", color: "error"});
        });
    },
    openDialog() {
      this.dialog = true;
      document.body.style.position = "fixed";
    },
    closeDialog() {
      document.body.style.position = "initial";
      this.dialog = false;
    }
  },
  watch: {
    pagination: {
      handler(val) {
        if (this.scrapGroupId) {
          this.getMyScraps();
        }
      },
      deep: true
    },
    scrapGroupId(val) {
      this.$nextTick(() => {
        this.pagination.page = 1;
        this.getMyScraps();
      });
    },
    dialog(val) {}
  },
  created() {
    this.getScrapGroups();
  }
};
</script>
<style>
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
@media (max-width: 599px) {
  .selectScrapGroup {
    max-width: 130px;
    margin-left: auto;
    /*margin-right:34px;*/
  }
  .selectScrapGroup .v-input__slot {
    max-width: 100px;
  }
  .selectScrapGroup .v-select__slot,
  .selectScrapGroup .v-select__selections,
  .selectScrapGroup .v-select__selection.v-select__selection--comma {
    max-width: 72px;
    min-width: 72px;
  }
  .selectScrapGroup .v-select__selection.v-select__selection--comma {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.selectScrapGroup input[type="text"] {
  display: none;
}
</style>
