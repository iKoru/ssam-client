<template>
  <v-card flat>
    <v-card-title>
      <v-layout row>
        <v-flex xs12 sm10 lg8 class="mx-auto">
          <v-layout row>
            <h3 class="headline">내가 쓴 글 목록</h3>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card-title>
    <v-layout row>
      <v-flex xs12 sm10 lg8 class="mx-auto">
        <v-data-table :headers="headers" xs12 :items="userDocuments" id="userDocumentTable" :rows-per-page-items="[15]" :loading="loading" :total-items="totalUserDocuments" :pagination.sync="pagination" :class="{customAction:true, 'noResult':totalUserDocuments === 0}">
          <template slot="items" slot-scope="props">
            <tr @click="selected = (selected===props.index?null:props.index)">
              <td>
                <v-checkbox :input-value="selected === props.index" primary hide-details></v-checkbox>
              </td>
              <td class="text-xs-left px-2" v-if="$vuetify.breakpoint.smAndUp">{{ boardItems.some(x=>x.boardId === props.item.boardId)?boardItems.find(x=>x.boardId === props.item.boardId).boardName:'(삭제된 게시판)' }}</td>
              <td :class="{'text-xs-left multi-row cursor-pointer':true, 'px-0':$vuetify.breakpoint.xsOnly}" @click.stop="openLink(`/${props.item.boardId}/${props.item.documentId}`)">
                {{props.item.title}}<span class="accent--text" title="댓글 수">{{props.item.commentCount > 0?'['+props.item.commentCount+']':''}}</span>
              </td>
              <td class="text-xs-right px-2">{{ props.item.voteUpCount }}</td>
              <td class="text-xs-right px-2">{{ $moment(props.item.writeDateTime, 'YYYYMMDDHHmmss').format('Y-MM-DD') }}</td>
            </tr>
          </template>
          <template slot="no-data">
            {{this.noresult}}
            <v-btn color="primary" @click="getMyDocuments">새로고침</v-btn>
          </template>
          <template slot="actions-prepend">
            <v-btn color="error" @click="deleteRow" :disabled="selected === null" :small="$vuetify.breakpoint.xsOnly" :class="{short:$vuetify.breakpoint.xsOnly}">삭제</v-btn>
            <v-spacer></v-spacer>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-card>
</template>
<script>
export default {
  name: 'MyDocument',
  data () {
    return {
      selected: null,
      userDocuments: [],
      loading: false,
      totalUserDocuments: 0,
      pagination: {}
    };
  },
  computed: {
    boardItems () {
      return this.$store.getters.boards;
    },
    noresult () {
      return this.loading ? '작성한 글을 불러오고 있습니다. 잠시만 기다려주세요...' : '아직 작성한 글이 없으시군요!';
    },
    headers () {
      return this.$vuetify.breakpoint.xsOnly ? [{ text: '', sortable: false, value: '' }, { text: '제목', sortable: false, align: 'center', value: 'title', class: 'ellipsis', width: '100%' }, { text: '추천', align: 'right', class: this.$vuetify.breakpoint.xsOnly ? 'px-1' : undefined, sortable: false, value: 'voteUpCount' }, { text: '작성일', sortable: false, align: 'right', value: 'writeDateTime' }] : [{ text: '', sortable: false, value: '' }, { text: '게시판', align: 'center', sortable: false, value: 'boardId' }, { text: '제목', sortable: false, align: 'center', value: 'title', class: 'ellipsis', width: '100%' }, { text: '추천', align: 'right', sortable: false, value: 'voteUpCount' }, { text: '작성일', sortable: false, align: 'right', value: 'writeDateTime' }];
    }
  },
  methods: {
    getMyDocuments () {
      this.loading = true;
      this.$axios
        .get('/user/document', {
          params: {
            page: this.pagination.page
          },
          headers: { silent: true }
        })
        .then(response => {
          this.userDocuments = response.data;
          this.totalUserDocuments = response.data.length > 0 ? response.data[0].totalCount : 0;
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          this.$router.app.$emit('showSnackbar', `내가 쓴 글 목록을 불러오지 못했습니다.[${err.response.data ? err.response.data.message : ''}]`, 'error');
        });
    },
    openLink (path) {
      const routeData = this.$router.resolve({ path: path });
      window.open(routeData.href, '_blank');
    },
    deleteRow () {
      if (this.selected !== null) {
        this.$axios
          .put('/document', { documentId: this.userDocuments[this.selected].documentId, isDeleted: true })
          .then(response => {
            if (this.userDocuments.length === 1 && this.pagination.page > 1) {
              this.pagination.page--;
            }
            this.getMyDocuments();
            this.selected = null;
            this.$store.dispatch('showSnackbar', { text: '글을 삭제하였습니다.', color: 'success' });
          })
          .catch(error => {
            console.log(error);
            this.$store.dispatch('showSnackbar', { text: error.response ? error.response.data.message || '글을 삭제하지 못했습니다.' : '글을 삭제하지 못했습니다.', color: 'error' });
          });
      } else {
        this.$store.dispatch('showSnackbar', { text: '삭제할 글을 선택해주세요.', color: 'error' });
      }
    }
  },
  watch: {
    pagination: {
      handler () {
        this.getMyDocuments();
      },
      deep: true
    }
  },
  created () {
    this.getMyDocuments();
  }
};
</script>
