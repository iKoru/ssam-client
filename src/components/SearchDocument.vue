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
            <v-data-table :headers="headers" xs12 :items="documents" id="searchDocumentTable" :rows-per-page-items="[10]" :loading="loading" :total-items="totalDocuments" :pagination.sync="pagination" hide-actions>
              <template slot="headers" slot-scope="props">
                <tr>
                  <th v-for="header in props.headers" :key="header.value" :class="{'px-1':true, 'text-xs-center':header.align === 'center', 'text-xs-left':header.align === 'left', 'text-xs-right':header.align === 'right', 'font-weight-bold':true, 'black--text':true}" :width="header.width || false">{{header.text}}</th>
                </tr>
              </template>
              <template slot="items" slot-scope="props">
                <tr @click="$router.push('/'+props.item.boardId + '/'+props.item.documentId)">
                  <td class="pa-1 grey--text lighten-1">
                    <!--prettyhtml-ignore-->
                    <v-layout row justify-center>
                      [{{ boards.some(x=>x.boardId === props.item.boardId)?($vuetify.breakpoint.smAndUp?boards.find(x=>x.boardId === props.item.boardId).boardName:boards.find(x=>x.boardId === props.item.boardId).boardName.replace(/\s/g, '').substring(0,2)):'' }}]
                    </v-layout>
                  </td>
                  <td class="text-xs-left pa-1 multi-row cursor-pointer" @click.stop="openLink(`/${props.item.boardId}/${props.item.documentId}`)">
                    <a :href="`/${props.item.boardId}/${props.item.documentId}`" target="_blank">
                      {{props.item.title}}
                      <span class="primary--text" title="댓글 수">{{props.item.commentCount > 0?'['+props.item.commentCount+']':''}}</span>
                    </a>
                  </td>
                  <td class="text-xs-right pa-1">{{ props.item.voteUpCount }}</td>
                  <td class="text-xs-right pa-1">{{ $moment(props.item.writeDateTime, 'YYYYMMDDHHmmss').isSame($moment(), 'day')?$moment(props.item.writeDateTime, 'YYYYMMDDHHmmss').format('HH:mm'):$moment(props.item.writeDateTime, 'YYYYMMDDHHmmss').format('M/D') }}</td>
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
          <v-flex text-xs-center mt-2 xs12>
            <v-pagination id="searchDocumentPagination" v-model="pagination.page" :length="pages" :total-visible="$vuetify.breakpoint.smAndUp?10:undefined"></v-pagination>
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
    boards(){
      return this.$store.getters.boards;
    },
    boardItems() {
      const auth = this.$store.getters.profile.auth
      const userBoards = this.$store.getters.userBoards;
      let boardItems = this.boards.filter(x=>(x.boardType !== 'T' && x.statusAuth.read.includes(auth)) || (x.boardType === 'T' && userBoards.some(y=>y.boardId === x.boardId && y.boardType === 'T'))).map(x=>({text:x.boardName, value:x.boardId}));
      boardItems.splice(0, 0, {text:'(공개 게시판 전체)', value:null})
      return boardItems
    },
    noresult(){
      return this.targetYear + '년을 대상으로 검색한 결과입니다.' + (this.targetYear > 2018? ' 이전 연도로 계속 검색할 수 있습니다.' : '')
    },
    headers() {
      return [{text: "게시판", align: "center", sortable: false, value: "boardId", width: this.$vuetify.breakpoint.smAndUp ? "100" : "50"}, {text: "제목", sortable: false, align: "center", value: "title", class: "ellipsis", width: "100%"}, {text: "추천", align: "right", sortable: false, value: "voteUpCount", width: "30"}, {text: "날짜", sortable: false, align: "right", value: "writeDateTime", width: this.$vuetify.breakpoint.xsOnly ? "50" : "100"}];
    },
    pages() {
      return this.pagination.rowsPerPage ? Math.ceil(this.totalDocuments / this.pagination.rowsPerPage) : 0;
    }
  },
  methods: {
    search(){
      if(!this.searchQuery){
        this.$store.dispatch('showSnackbar', {text:'검색할 단어를 입력해주세요.',color:'error'});
        return;
      }
      this.targetYear = new Date().getFullYear()
      this.getDocuments(this.targetYear);
      this.searched = true;
    },
    searchMore(){
      if(!this.searchQuery){
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
#searchDocumentTable tbody tr:last-child {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
#searchDocumentPagination .v-pagination__item,
#searchDocumentPagination .v-pagination__item--active,
#searchDocumentPagination .v-pagination__navigation {
  box-shadow: none;
  margin: 0;
  padding: 0;
}
#searchDocumentPagination .v-pagination__item--active {
  color: black;
  font-weight: bold;
  font-size: 16px;
  background-color: white !important;
  border-color: white !important;
}
</style>
