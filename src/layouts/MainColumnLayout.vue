<template>
  <v-container fluid pb-0 :pt-0="$route.path !== '/'">
    <v-layout row wrap align-center>
      <v-layout row wrap>
        <v-flex xs12 :md9="columnType !== 'HIDE_ALWAYS'">
          <slot></slot>
        </v-flex>
        <v-flex xs12 md3 v-show="(columnType === 'SHOW_ALWAYS') || (columnType === 'HIDE_SM' && $vuetify.breakpoint.mdAndUp)" id="columnAside">
          <v-layout column>
            <v-flex xs12>
              <v-card flat>
                <v-card-title>
                  <v-layout column class="border-primary">
                    <v-flex class="py-2 px-3 bg-light">
                      <router-link to="/notice">
                        <span class="subheading font-weight-bold">공지사항</span>
                      </router-link>
                    </v-flex>
                    <v-flex class="px-2">
                      <small-document-list :list="notice? notice.documents : []" :maxCount="2" :showDateTime="false" :showVoteUpCount="false"></small-document-list>
                    </v-flex>
                    <v-flex class="py-2 px-3 bg-light">
                      <span class="subheading font-weight-bold cursor-default">따끈따끈 베스트</span>
                    </v-flex>
                    <v-flex class="px-2">
                      <small-document-list :list="best? best.documents : []" :maxCount="5" :showDateTime="false" :showVoteUpCount="false"></small-document-list>
                    </v-flex>
                    <v-flex class="py-2 px-3 bg-light">
                      <router-link to="/tools" class="subheading font-weight-bold">생활기록부 도구
                        <v-chip id="hotChip" color="error ma-0" text-color="white" label>hot</v-chip>
                      </router-link>
                    </v-flex>
                    <v-flex class="text-xs-center"><!--ad--></v-flex>
                  </v-layout>
                </v-card-title>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'MainColumnLayout',
  components: {
    SmallDocumentList: () => import('@/components/board/SmallDocumentList.vue')
  },
  data () {
    return {
      notice: {},
      best: {}
    };
  },
  computed: {
    columnType () {
      return this.$store.getters.columnType;
    }
  },
  mounted () {
    if (this.$store.getters.recents) {
      this.notice = this.$store.getters.recents.find(x => x.boardId === 'notice');
      this.best = this.$store.getters.recents.find(x => x.boardId === null);
    } else {
      this.$axios
        .get('/recent', { headers: { silent: true } })
        .then(response => {
          response.data.forEach(x => {
            x.documents.forEach(y => {
              if (y.writeDateTime) {
                y.writeDateTime = this.$moment(y.writeDateTime, 'YYYYMMDDHHmmss');
              }
            });
          });
          this.notice = response.data.find(x => x.boardId === 'notice');
          this.best = response.data.find(x => x.boardId === null);
          this.$store.dispatch('setRecents', response.data);
        })
        .catch(error => {
          console.log(error);
          this.$store.dispatch('showSnackbar', { text: `최근 게시물을 가져오는 데 오류가 발생했습니다.${error.response ? '[' + error.response.data.message + ']' : ''}`, color: 'error' });
        });
    }
  },
  methods: {}
};
</script>
<style>
.cover-title {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
#columnAside {
  display: flex;
}
#hotChip {
  height: 18px;
  vertical-align:baseline;
}
#hotChip .v-chip__content {
  cursor:pointer;
  padding:2px 4px;
  font-size: 12px;
}
</style>
