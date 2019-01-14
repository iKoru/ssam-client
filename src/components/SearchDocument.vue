 <template>
  <v-container>
    <v-layout row justify-center align-center wrap>
      <v-card width="100%" flat>
        <v-card-title primary-title class="px-0">
          <v-flex xs12 sm11 md10 lg9 class="mx-auto px-3 pb-2">
            <div :class="{'text-xs-center':true, 'justify-center':true, 'align-center':true, 'pa-3':$vuetify.breakpoint.smAndUp}">
              <v-container fluid grid-list-xs>
                <v-layout row>
                  <v-flex xs3>
                    <v-autocomplete ref="searchBoard" class="dense" placeholder="검색할 게시판" v-model="boardId" :items="boardItems"></v-autocomplete>
                  </v-flex>
                  <v-flex xs9 pl-3>
                    <v-text-field ref="searchQuery" placeholder="글의 제목, 내용으로 검색할 수 있습니다." v-model="searchQuery" class="dense" @keyup.enter.stop="search" append-outer-icon="search" @click:append-outer="search"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </div>
          </v-flex>
          <v-flex xs12 sm11 md10 lg9 class="mx-auto">
            <v-data-table :headers="headers" xs12 :items="documents" id="documentTable" :rows-per-page-items="[10]" :loading="loading" :total-items="totalDocuments" :pagination.sync="pagination" :class="{'noResult':totalDocuments === 0}">
              <template slot="items" slot-scope="props">
                <tr @click="$router.push('/'+props.item.boardId + '/'+props.item.documentId)">
                  <td class="text-xs-left" v-if="$vuetify.breakpoint.smAndUp">{{ boardItems.some(x=>x.value === props.item.boardId)?boardItems.find(x=>x.value === props.item.boardId).text:'(삭제된 게시판)' }}</td>
                  <td class="text-xs-left multi-row cursor-pointer" @click.stop="openLink(`/${props.item.boardId}/${props.item.documentId}`)">
                    <a :href="`/${props.item.boardId}/${props.item.documentId}`" target="_blank">
                      {{props.item.title}}
                      <span class="primary--text" title="댓글 수">{{props.item.commentCount > 0?'['+props.item.commentCount+']':''}}</span>
                    </a>
                  </td>
                  <td class="text-xs-right">{{ props.item.voteUpCount }}</td>
                  <td class="text-xs-right">{{ $moment(props.item.writeDateTime, 'YYYYMMDDHHmmss').format('Y-MM-DD') }}</td>
                </tr>
              </template>
              <template slot="footer">
                <td :colspan="headers.length" v-if="searched" class="multi-row">
                  {{this.noresult}}
                  <v-btn color="primary" @click="searchMore" small v-if="targetYear > 2018">계속 검색</v-btn>
                </td>
              </template>
            </v-data-table>
          </v-flex>
        </v-card-title>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "SearchDocument",
  data() {
    return {
      loading: false,
      boardTypeItems: {
        T: "토픽",
        L: "라운지",
        D: "아카이브",
        E: "기타"
      },
      boardId: null,
      targetYear: new Date().getFullYear(),
      searchQuery: "",
      groupItems: [],
      documents:[],
      totalDocuments:0,
      searched: false,
      pagination:{}
    };
  },
  computed: {
    boardItems() {
      return this.$store.getters.boards.filter(x=>x.boardType !== 'T').concat(this.$store.getters.userBoards.filter(x=>x.boardType === 'T')).map(x=>({text:x.boardName, value:x.boardId}));
    },
    noresult(){
      return this.targetYear + '년을 대상으로 검색한 결과입니다.' + (this.targetYear > 2018? ' 이전 연도로 계속 검색할 수 있습니다.' : '')
    },
    headers() {
      return this.$vuetify.breakpoint.xsOnly ? [{text: "제목", sortable: false, align: "left", value: "title", class: "ellipsis", width: "100%"}, {text: "추천", align: "right", sortable: false, value: "voteUpCount"}, {text: "작성일", sortable: false, align: "right", value: "writeDateTime"}] : [{text: "게시판", align: "left", sortable: false, value: "boardId"}, {text: "제목", sortable: false, align: "left", value: "title", class: "ellipsis", width: "100%"}, {text: "추천", align: "right", sortable: false, value: "voteUpCount"}, {text: "작성일", sortable: false, align: "right", value: "writeDateTime"}];
    }
  },
  methods: {
    search(){
      if(!this.boardId){
        this.$store.dispatch('showSnackbar', {text:'검색할 게시판을 선택해주세요.',color:'error'});
        return;
      }else if(!this.searchQuery){
        this.$store.dispatch('showSnackbar', {text:'검색할 단어를 입력해주세요.',color:'error'});
        return;
      }
      this.targetYear = new Date().getFullYear()
      this.getDocuments(this.targetYear);
      this.searched = true;
    },
    searchMore(){
      if(!this.boardId){
        this.$store.dispatch('showSnackbar', {text:'검색할 게시판을 선택해주세요.',color:'error'});
        return;
      }else if(!this.searchQuery){
        this.$store.dispatch('showSnackbar', {text:'검색할 단어를 입력해주세요.',color:'error'});
        return;
      }
      this.getDocuments(--this.targetYear);
    },
    getDocuments(targetYear){
      this.loading = true;
      this.$axios.get('/document', {params:{targetYear:targetYear, boardId:this.boardId, searchQuery:this.searchQuery, searchTarget:'titleContents', page:this.pagination.page}, headers:{silent:true}})
      .then(response => {
        this.documents = Array.isArray(response.data)?response.data : [];
        this.totalDocuments = this.documents[0]?this.documents[0].totalCount:0
        this.loading = false;
      })
      .catch(error => {
        this.loading = false;
        console.log(error);
        this.$store.dispatch("showSnackbar", {text: error.response ? error.response.data.message || "글을 검색하지 못했습니다." : "글을 검색하지 못했습니다.", color: "error"});
      })
    }
  },
  watch:{
    pagination: {
      handler() {
        this.getDocuments(this.targetYear);
      },
      deep: true
    }
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
</style>
