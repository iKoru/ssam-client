<template>
  <v-flex>
    <v-layout column>
      <v-flex>
        <template v-if="isCardView">
          <v-divider/>
          <v-list class="py-0 border-x-light" dense>
            <template v-for="document in documents.filter(x=>x.isNotice)">
              <v-list-tile :to="`/${board.boardId}/${document.documentId}`" :key="document.documentId" class="grey lighten-3">
                <v-list-tile-content>
                  <v-list-tile-title>
                    <div class="ellipsis text-xs-left body-1 font-weight-bold">
                      <router-link :to="`/${board.boardId}/${document.documentId}`" @click.native.stop>[공지] {{document.title}}</router-link>
                    </div>
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider :key="'divider'+document.documentId"/>
            </template>
            <template v-if="documents.length === 0">
              <v-list-tile class="grey lighten-3">
                <v-list-tile-content>
                  <v-list-tile-title text-xs-center>아직 작성된 글이 없습니다. 첫 글을 작성해보세요!</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider/>
            </template>
          </v-list>
          <v-list two-line class="py-0 border-x-light" id="cardView">
            <template v-for="document in documents.filter(x=>!x.isNotice)">
              <v-list-tile :to="`/${board.boardId}/${document.documentId}`" :key="document.documentId" class="grey lighten-5">
                <v-list-tile-content>
                  <v-list-tile-title>
                    <v-layout row>
                      <!--prettyhtml-ignore-->
                      <small v-if="hasChildren" class="grey--text lighten-1 mr-1">
                        [<router-link :to="'/'+document.boardId" class="grey--text lighten-1" @click.native.stop>{{ boardItems.some(x=>x.boardId === document.boardId)?($vuetify.breakpoint.smAndUp?boardItems.find(x=>x.boardId === document.boardId).boardName.replace(/\s/g, '').substring(0,5):boardItems.find(x=>x.boardId === document.boardId).boardName.replace(boardTypeItems[board.boardType],'').replace(/\s/g, '').substring(0,2)):'' }}</router-link>]
                      </small>
                      <small v-else-if="board.categories && board.categories.some(x=>x) && document.category" class="grey--text lighten-1 mr-1">[{{document.category}}]</small>
                      <div class="ellipsis font-weight-bold body-2">{{document.title}}</div>
                      <v-spacer/>
                      <!--prettyhtml-ignore-->
                      <div class="caption">
                        <span v-if="document.nickName !== '' && $vuetify.breakpoint.smAndUp">{{document.nickName}} </span>
                        <v-icon :color="$store.getters.isLight?'primary':'secondary'" small>thumb_up_alt</v-icon><span :class="{'primary--text':$store.getters.isLight, 'secondary--text': !$store.getters.isLight, 'font-weight-bold':true}">{{document.voteUpCount}}</span>&nbsp;
                        <v-icon color="accent" small>chat_bubble_outline</v-icon><span class="accent--text font-weight-bold">{{document.commentCount}}</span>&nbsp;
                        <span class="grey--text lighten-1">{{ $moment(document.writeDateTime, 'YYYYMMDDHHmmss').isSame($moment(), 'day')?$moment(document.writeDateTime, 'YYYYMMDDHHmmss').format('HH:mm'):$moment(document.writeDateTime, 'YYYYMMDDHHmmss').format($vuetify.breakpoint.xsOnly?'M/D':'Y/M/D') }}</span>
                      </div>
                    </v-layout>
                  </v-list-tile-title>
                  <v-list-tile-sub-title>{{(!document.previewContents || document.previewContents.trim() === '')? '(텍스트가 없는 글입니다.)' : document.previewContents}}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider :key="'divider'+document.documentId"/>
            </template>
          </v-list>
        </template>
        <v-data-table v-else :headers="headers" xs12 :items="documents" class="last-tr-border" id="documentTable" hide-actions :rows-per-page-items="[$vuetify.breakpoint.xsOnly?10:20]" :loading="loading" :total-items="totalDocuments" :pagination.sync="pagination" :no-data-text="noDataText">
          <template slot="headers" slot-scope="props">
            <tr>
              <th v-for="header in props.headers" :key="header.value" role="columnheader" scope="col" :class="{'column px-1 font-weight-bold black--text body-2':true, 'ellipsis':header.value === 'title', 'text-xs-center':header.align === 'center', 'text-xs-left':header.align === 'left', 'text-xs-right':header.align === 'right'}" :width="header.value === 'title'? '100%' : false">
                <v-select v-if="header.value === 'category'" :items="categoryItems" dense solo flat hide-details :class="{'mt-0 pt-0':true, 'primary--text':(category !== '') && $store.getters.isLight, 'secondary--text':(category !== '') && !$store.getters.isLight}" :append-icon="null" v-model="category"></v-select>
                <span v-else>
                  {{header.text}}
                </span>
              </th>
            </tr>
          </template>
          <template slot="items" slot-scope="props">
            <tr v-if="!props.item.isNotice">
              <td class="pa-1 grey--text lighten-1" v-if="hasChildren">
                <!--prettyhtml-ignore-->
                <v-layout row justify-center>
                  [<router-link :to="'/'+props.item.boardId" class="grey--text lighten-1">{{ boardItems.some(x=>x.boardId === props.item.boardId)?($vuetify.breakpoint.smAndUp?boardItems.find(x=>x.boardId === props.item.boardId).boardName.replace(/\s/g, '').substring(0,5):boardItems.find(x=>x.boardId === props.item.boardId).boardName.replace(boardTypeItems[board.boardType],'').replace(/\s/g, '').substring(0,2)):'' }}</router-link>]
                </v-layout>
              </td>
              <td class="text-xs-center pa-1 grey--text lighten-1" v-if="!hasChildren && board.categories.some(x=>x)"><template v-if="props.item.category">[<div class="ellipsis limit-width d-inline-flex">{{ props.item.category }}</div>]</template></td>
              <td :class="{'text-xs-left py-1 ellipsis cursor-pointer':true, 'px-2':!hasChildren, 'px-0':hasChildren, 'font-weight-bold':$route.params.documentId === props.item.documentId}" @click.stop="$router.push(`/${board.boardId}/${props.item.documentId}`)">
                <v-layout row>
                  <div class="ellipsis text-xs-left">
                    <router-link :to="`/${board.boardId}/${props.item.documentId}`" @click.native.stop>{{props.item.title}}</router-link>
                  </div>
                  <span class="accent--text" title="댓글 수">{{props.item.commentCount > 0?'['+props.item.commentCount+']':''}}</span>
                </v-layout>
              </td>
              <td class="text-xs-center pa-1" v-if="$vuetify.breakpoint.smAndUp"><div class="ellipsis limit-width2">{{ props.item.nickName }}</div></td>
              <td class="text-xs-right pa-1">{{ props.item.voteUpCount }}</td>
              <td class="text-xs-right pa-1 grey--text lighten-1">{{ $moment(props.item.writeDateTime, 'YYYYMMDDHHmmss').isSame($moment(), 'day')?$moment(props.item.writeDateTime, 'YYYYMMDDHHmmss').format('HH:mm'):$moment(props.item.writeDateTime, 'YYYYMMDDHHmmss').format($vuetify.breakpoint.xsOnly?'M/D':'Y/M/D') }}</td>
            </tr>
            <tr v-else class="grey lighten-3">
              <td :colspan="headers.length" class="font-weight-bold px-2 cursor-pointer py-1" @click.stop="$router.push(`/${board.boardId}/${props.item.documentId}`)">
                <v-layout row>
                  <div class="ellipsis text-xs-left">
                    <router-link :to="`/${board.boardId}/${props.item.documentId}`" @click.native.stop>[공지] {{props.item.title}}</router-link>
                  </div>
                </v-layout>
              </td>
            </tr>
          </template>
          <template slot="no-data">
            <tr>
              <td :colspan="$vuetify.breakpoint.smAndUp?4+(hasChildren?1:0)+(headers.some(x=>x.value === 'category')?1:0):3+(hasChildren?1:0)+(headers.some(x=>x.value === 'category')?1:0)" class="text-xs-center multi-row px-0">{{noDataText}}</td>
            </tr>
          </template>
        </v-data-table>
      </v-flex>
      <v-flex>
        <v-layout row pa-2 align-center>
          <v-btn flat small @click="switchView" icon class="ma-0" :title="isCardView?'목록형 보기':'카드형 보기'">
            <v-icon>{{isCardView?'list':'dashboard'}}</v-icon>
          </v-btn>
          <v-btn flat small @click="getDocuments" :icon="$vuetify.breakpoint.xsOnly" :class="{'ma-0':true, 'short grey--text':$vuetify.breakpoint.smAndUp, 'ml-1':$vuetify.breakpoint.xsOnly}" :loading="loading">
            <v-icon v-if="$vuetify.breakpoint.xsOnly">refresh</v-icon>
            <span v-else>새로고침</span>
          </v-btn>
          <v-spacer/>
          <v-flex xs6 sm4 id="searchDocumentForm">
            <v-text-field hide-details dense class="dense mt-0 pt-0" v-model="searchQuery" append-outer-icon="search" @keydown.enter.stop="search" @click:append-outer="search" placeholder="제목, 내용으로 검색"></v-text-field>
          </v-flex>
          <v-btn v-show="($route.params.boardId !== 'notice' || (board && board.isOwner)) && (($route.params.boardId !== 'loungeBest' && $route.params.boardId !== 'topicBest') || (documentBoardId && $route.params.documentId))" depressed small class="short my-0" :color="$store.getters.isLight?'primary':'secondary'" @click="$emit('write')">쓰기</v-btn>
        </v-layout>
      </v-flex>
      <v-flex text-xs-center mt-2 xs12>
        <v-pagination v-model="page" :length="pages" :total-visible="$vuetify.breakpoint.smAndUp?10:undefined"></v-pagination>
      </v-flex>
    </v-layout>
  </v-flex>
</template>
<script>
import BoardMixins from '@/components/mixins/BoardMixins';
export default {
  name: 'DocumentList',
  mixins: [BoardMixins],
  props: ['board', 'hasChildren', 'documentBoardId'],
  data () {
    return {
      documents: [],
      totalDocuments: 0,
      loading: false,
      pagination: {}, // page object for data table component
      page: null, // page element for pagination component
      boardId: null, // local current boardId,
      noDataText: '아직 작성된 글이 없습니다. 첫 글을 작성해보세요!',
      searchQuery: null,
      isCardView: !!localStorage.getItem('CardView'),
      category: ''
    };
  },
  computed: {
    headers () {
      let headers = [{ text: '제목', value: 'title', align: 'center' }, { text: '추천', value: 'voteUpCount', align: 'right' }, { text: '날짜', value: 'writeDateTime', align: 'right' }];
      if (this.$vuetify.breakpoint.smAndUp) {
        headers.splice(1, 0, { text: '글쓴이', value: 'nickName', align: 'center' });
      }
      if (!this.hasChildren && this.board.categories.some(x => x)) {
        headers.splice(0, 0, { text: '분류', value: 'category', align: 'center' });
      }
      if (this.hasChildren) {
        headers.splice(0, 0, { text: this.boardTypeItems[this.board.boardType], value: 'boardId', align: 'center' });
      }
      return headers;
    },
    boardItems () {
      return this.$store.getters.boards;
    },
    pages () {
      return this.pagination.rowsPerPage && this.totalDocuments > 0 ? Math.ceil(this.totalDocuments / this.pagination.rowsPerPage) : 1;
    },
    categoryItems () {
      if (Array.isArray(this.board.categories) && this.board.categories.length > 0) {
        let categories = this.board.categories.map(x => ({ text: x, value: x }));
        categories.splice(0, 0, { text: '분류', value: '' })
        return categories
      } else {
        return []
      }
    }
  },
  methods: {
    getDocuments () {
      this.loading = true;
      this.$axios
        .get(`/${this.boardId}`, { params: { page: this.pagination.page, rowsPerPage: this.$vuetify.breakpoint.xsOnly ? 10 : 20, category: this.category === '' ? undefined : this.category }, headers: { silent: true } })
        .then(response => {
          this.documents = response.data;
          this.totalDocuments = response.data.length > 0 ? response.data[0].totalCount : 0;
          if (this.board.notices.length > 0) {
            let i = 0;
            while (i < this.board.notices.length) {
              this.documents.splice(i, 0, this.board.notices[i]);
              i++;
            }
          }
          this.noDataText = '아직 작성된 글이 없습니다. 첫 글을 작성해보세요!';
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
          console.log(error);
          this.noDataText = error.response ? error.response.data.message : '글 목록을 가져오지 못했습니다.';
          this.$store.dispatch('showSnackbar', { text: `${error.response ? error.response.data.message : '글 목록을 가져오지 못했습니다.'}`, color: 'error' });
        });
    },
    search () {
      if (this.searchQuery) {
        this.$router.push(`/searchDocument?boardId=${this.board.boardId}&searchQuery=${this.searchQuery}`);
      }
    },
    switchView () {
      this.isCardView = !this.isCardView;
      if (this.isCardView) {
        this.category = ''
        localStorage.setItem('CardView', this.isCardView);
      } else {
        localStorage.removeItem('CardView')
      }
    }
  },
  created () {
    this.page = this.$route.query.page * 1 > 0 && Number.isInteger(this.$route.query.page * 1) ? this.$route.query.page * 1 : 1; // set page and trigger the watch function
    this.$root.$on('updateDocumentList', this.getDocuments)
  },
  watch: {
    '$route.params': {
      handler (val) {
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
    page (val) {
      if (this.pagination.page !== val) {
        this.pagination.page = val;
        this.getDocuments();
      }
    },
    category (val) {
      this.getDocuments();
    }
  }
};
</script>
<style>
#documentTable thead tr {
  height: 24px;
}
#documentTable thead th {
  padding-left: 0;
  padding-right: 0;
}
#documentTable thead .v-text-field.v-text-field--solo .v-input__slot{
  padding:0;
}
#documentTable thead .v-text-field.v-text-field--solo .v-input__control{
  min-height:32px;
  font-size:14px;
}
#documentTable thead .v-select__selections{
  justify-content:center;
}
#documentTable thead .v-select__selections .v-select__selection--comma{
  margin:0;
}
#documentTable thead .primary--text .v-select__selections{
  color:#9dd1b7;
}
#documentTable thead .secondary--text .v-select__selections{
  color:#0067c2;
}
#documentTable thead .v-select__selections > input[type=text]{
  display:none;
}
#documentTable tbody td,
#documentTable tbody th {
  height: 32px;
}
#documentTable tbody .ellipsis.limit-width{
  max-width:70px;
}
#documentTable tbody .ellipsis.limit-width2{
  max-width:90px;
}
#searchDocumentForm {
  min-width: 170px;
}
#searchDocumentForm .v-input__append-outer{
  margin-top:auto;
  margin-bottom:auto;
}
#cardView .v-list__tile__content .v-icon {
  vertical-align: middle;
  margin-right: 4px;
}
</style>
