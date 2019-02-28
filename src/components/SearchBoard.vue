 <template>
  <v-container>
    <v-layout row justify-center align-center wrap>
      <v-card width="100%" flat>
        <v-card-title primary-title class="px-0">
          <v-flex xs12 sm11 md10 lg9 class="mx-auto px-3 pb-2">
            <div :class="{'text-xs-center':true, 'justify-center':true, 'align-center':true, 'pa-3':$vuetify.breakpoint.smAndUp}">
              <v-container fluid grid-list-xs>
                <v-layout row>
                  <v-flex py-0>
                    <v-text-field ref="searchQuery" append-icon="search" placeholder="검색할 라운지/토픽/아카이브 이름" v-model="searchQuery" class="mt-0 pt-0 dense" hint="각각의 주소, 이름, 설명으로 검색할 수 있습니다."></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </div>
          </v-flex>
          <v-flex xs12 sm11 md10 lg9 class="mx-auto">
            <v-data-table hide-headers :headers="headers" id="searchBoardTable" :items="boards" :search="searchQuery" :rows-per-page-items="[15]" :pagination.sync="pagination" :loading="loading" :class="{customAction:true, 'noResult':pagination.totalItems === 0}">
              <template slot="items" slot-scope="props">
                <tr @click="openDialog(props.item)" class="cursor-pointer">
                  <td class="px-1 text-xs-center">{{boardTypeItems[props.item.boardType]}}</td>
                  <td class="ellipsis px-1">
                    <v-layout column class="d-inline">
                      <v-flex xs12>
                        <span>{{props.item.boardName}}</span>
                      </v-flex>
                      <v-flex xs12 class="ellipsis grey--text lighten-1">
                        <small>{{props.item.boardDescription}}</small>
                      </v-flex>
                    </v-layout>
                  </td>
                  <td class="px-1">
                    <router-link :to="'/'+props.item.boardId" v-if="props.item.boardType !== 'T' || userBoards.some(x=>x.boardId === props.item.boardId)">
                      <v-btn small flat class="short">바로가기</v-btn>
                    </router-link>
                    <v-btn small class="short" v-else @click.stop="openDialog(props.item, true)" color="secondary">구독하기</v-btn>
                  </td>
                </tr>
              </template>
              <template slot="actions-prepend">
                <v-btn color="secondary" flat @click="openTopicDialog">토픽 만들기</v-btn>
                <v-spacer></v-spacer>
              </template>
            </v-data-table>
          </v-flex>
        </v-card-title>
      </v-card>
      <v-dialog v-model="dialog" max-width="800" lazy>
        <board-information :board="selected" @closeDialog="closeDialog"></board-information>
      </v-dialog>
      <v-dialog v-model="topicCreator" :fullscreen="$vuetify.breakpoint.xsOnly" :transition="$vuetify.breakpoint.xsOnly?'dialog-bottom-transition':'fade-transition'" lazy scrollable max-width="700px">
        <topic-creator @closeDialog="closeTopicDialog" @resetBoard="resetBoard" :board="null"/>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'SearchBoard',
  components: {
    TopicCreator: () => import('../components/TopicCreator'),
    BoardInformation: () => import('../components/BoardInformation')
  },
  data () {
    return {
      loading: false,
      loadingJoin: false,
      dialog: false,
      topicCreator: false,
      boardTypeItems: {
        T: '토픽',
        L: '라운지',
        D: '아카이브',
        X: '기타',
        E: '전직교사',
        N: '예비교사'
      },
      searchQuery: '',
      selected: { boardAuth: [] },
      groupItems: [],
      pagination: {},
      headers: [{ text: '구분', value: 'boardType', sortable: false }, { text: '이름', value: 'boardName', sortable: false }, { text: '주소', value: 'boardId', sortable: false }, { text: '설명', value: 'boardDescription', sortable: false }]
    };
  },
  computed: {
    boards () {
      const original = this.$store.getters.boards;
      return original.filter(x => !x.parentBoardId);
    },
    userBoards () {
      return this.$store.getters.userBoards;
    },
    userGroups () {
      return this.$store.getters.profile.groups;
    },
    totalBoards () {
      return this.boards.length;
    }
  },
  created () {
    this.$axios
      .get('/group', { params: { groupType: ['N', 'R', 'M', 'G'] }, headers: { silent: true } })
      .then(response => {
        this.groupItems = response.data;
      })
      .catch(error => {
        console.log(error);
        this.$store.dispatch('showSnackbar', { text: `그룹 목록을 가져오지 못했습니다.${error && error.response && error.response.data ? '[' + error.response.data.message + ']' : ''}`, color: 'error' });
      });
  },
  methods: {
    openDialog (item, join) {
      if (this.selected && this.selected.boardId === item.boardId) {
        this.dialog = true;
      } else {
        this.$axios
          .get('/board', { params: { boardId: item.boardId } })
          .then(response => {
            this.selected = response.data;
            this.dialog = true;
          })
          .catch(error => {
            console.log(error);
            this.$store.dispatch('showSnackbar', { text: `정보를 가져오지 못했습니다.${error && error.response && error.response.data ? '[' + error.response.data.message + ']' : ''}`, color: 'error' });
          });
      }
    },
    closeTopicDialog () {
      this.topicCreator = false;
    },
    openTopicDialog () {
      if (this.$store.getters.profile.auth !== 'A') {
        this.$store.dispatch('showSnackbar', { text: '인증을 받은 회원만 토픽을 만들 수 있습니다.', color: 'error' });
        return;
      }
      this.topicCreator = true;
    },
    resetBoard () {},
    closeDialog () {
      this.dialog = false;
    }
  },
  watch: {
    topicCreator (val) {
      document.body.style.position = val ? 'fixed' : 'initial';
    }
  }
};
</script>
