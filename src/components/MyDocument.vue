<template>
  <v-card flat>
    <v-card-title>
      <v-layout row>
        <v-flex xs12 sm10 lg8 xl6 class="mx-auto">
          <v-layout row>
            <h3 class="headline">내가 쓴 글 목록</h3>
          </v-layout>
          <v-flex xs12>
            <v-data-table :headers="headers" xs12 :items="userDocuments" id="userDocumentTable" :rows-per-page-items="[15]" :loading="loading" :total-items="totalUserDocuments" :pagination.sync="pagination">
              <template slot="items" slot-scope="props">
                <tr @click="selected = (selected===props.index?null:props.index)">
                  <td>
                    <v-checkbox :input-value="selected === props.index" primary hide-details></v-checkbox>
                  </td>
                  <td class="text-xs-left" v-if="$vuetify.breakpoint.smAndUp">{{ boardItems.some(x=>x.boardId === props.item.boardId)?boardItems.find(x=>x.boardId === props.item.boardId).boardName:'(삭제된 게시판)' }}</td>
                  <td class="text-xs-left ellipsis cursor-pointer" @click.stop="openLink(`/${props.item.boardId}/${props.item.documentId}`)">
                    <a :href="`/${props.item.boardId}/${props.item.documentId}`" target="_blank">
                      {{ getShortContents(props.item.title) }}
                      <span class="primary--text" title="댓글 수">{{props.item.commentCount > 0?'['+props.item.commentCount+']':''}}</span>
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
  name: "MyDocument",
  data() {
    return {
      selected:null,
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
      return this.$vuetify.breakpoint.xsOnly ? [{text:'', sortable:false, value:''}, {text: "제목", sortable: false, align: "left", value: "title", class: "ellipsis", width: "100%"}, {text: "추천", align: "right", sortable: false, value: "voteUpCount"}, {text: "작성일", sortable: false, align: "right", value: "writeDateTime"}] : [{text:'', sortable:false, value:''}, {text: "게시판", align: "left", sortable: false, value: "boardId"}, {text: "제목", sortable: false, align: "left", value: "title", class: "ellipsis", width: "100%"}, {text: "추천", align: "right", sortable: false, value: "voteUpCount"}, {text: "작성일", sortable: false, align: "right", value: "writeDateTime"}];
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
          this.$router.app.$emit("showSnackbar", `내가 쓴 글 목록을 불러오지 못했습니다.[${err.response.data ? err.response.data.message : ""}]`, "error");
          return;
        });
    },
    openLink(path) {
      const routeData = this.$router.resolve({path: path});
      window.open(routeData.href, "_blank");
    },
    getShortContents(contents) {
      if (this.$vuetify.breakpoint.xsOnly) {
        return contents.length > 15 ? contents.substring(0, 15) + "..." : contents;
      } else if (this.$vuetify.breakpoint.smOnly) {
        return contents.length > 8 ? contents.substring(0, 8) + "..." : contents;
      } else if (this.$vuetify.breakpoint.mdOnly) {
        return contents.length > 19 ? contents.substring(0, 19) + "..." : contents;
      } else if (this.$vuetify.breakpoint.lgOnly) {
        return contents.length > 23 ? contents.substring(0, 23) + "..." : contents;
      } else {
        return contents.length > 32 ? contents.substring(0, 32) + "..." : contents;
      }
    },
    deleteRow(){
      if(this.selected){
        this.$axios.put('/document', {documentId:this.userDocuments[this.selected].documentId, isDeleted:true})
        .then(response => {
          if(this.userDocuments.length === 1 && this.pagination.page > 1){
            this.pagination.page --;
          }
          this.getMyDocuments();
          this.selected = null;
          this.$store.dispatch('showSnackbar', {text:'글을 삭제하였습니다.', color:'success'});
        })
        .catch(error => {
          this.$store.dispatch("showSnackbar", {text: error.response ? error.response.data.message || "글을 삭제하지 못했습니다." : "글을 삭제하지 못했습니다.", color: "error"});
        })
      }else{
        this.$store.dispatch('showSnackbar', {text:'삭제할 글을 선택해주세요.', color:'error'})
      }
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
.v-datatable__actions {
  justify-content: space-between;
}
</style>
