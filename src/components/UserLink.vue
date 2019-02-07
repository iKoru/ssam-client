<template>
  <span class="d-inline-flex">
    <template v-if="nickName !== ''">
      <component :is="$vuetify.breakpoint.xsOnly?'v-bottom-sheet':'v-menu'" v-model="userLinkMenu" open-on-hover bottom lazy offset-y>
        <span slot="activator" class="cursor-pointer font-weight-bold body--text">{{nickName}}</span>
        <v-list dense>
          <v-list-tile v-if="boardType !== 'T'" @click="showProfile">
            <v-list-tile-title>
              프로필보기
            </v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="sendMessage">
            <v-list-tile-title>
              메시지 보내기
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </component>
      <v-dialog v-model="dialog" max-width="500" lazy>
        <v-card>
          <v-card-title class="headline" primary-title>
            <span>프로필</span>
            <v-spacer/>
            <v-icon @click="dialog = false">close</v-icon>
          </v-card-title>
          <v-card-text>
            <v-flex xs12>
              <div class="text-xs-center justify-center align-center">
                <p>
                  <v-avatar size="200">
                    <img :src="profile.picturePath? webUrl+ profile.picturePath : require('@/static/img/defaultUser.png')" alt="프로필 이미지">
                  </v-avatar>
                </p>
                <v-layout row wrap>
                  <v-flex xs4>
                    <v-subheader>라운지 필명</v-subheader>
                  </v-flex>
                  <v-flex xs8>
                    <div class="v-subheader">{{profile.nickName}}</div>
                  </v-flex>
                  <v-flex xs4>
                    <v-subheader>회원 구분</v-subheader>
                  </v-flex>
                  <v-flex xs8>
                    <div class="v-subheader">{{userAuthItems[profile.auth]}}</div>
                  </v-flex>
                  <template v-if="profile.isOpenInfo">
                    <v-flex xs4>
                      <v-subheader>지역</v-subheader>
                    </v-flex>
                    <v-flex xs8>
                      <div class="v-subheader">{{profile.region && groupItems.some(x=>x.value === profile.region) ? groupItems.find(x=>x.value === profile.region).text : '지역정보 없음'}}</div>
                    </v-flex>
                    <v-flex xs4>
                      <v-subheader>전공</v-subheader>
                    </v-flex>
                    <v-flex xs8>
                      <div class="v-subheader">{{profile.major && groupItems.some(x=>x.value === profile.major) ? groupItems.find(x=>x.value === profile.major).text : '전공정보 없음'}}</div>
                    </v-flex>
                    <v-flex xs4>
                      <v-subheader>학년</v-subheader>
                    </v-flex>
                    <v-flex xs8>
                      <div class="v-subheader">{{profile.grade && groupItems.some(x=>x.value === profile.grade) ? groupItems.find(x=>x.value === profile.grade).text : '학년정보 없음'}}</div>
                    </v-flex>
                  </template>
                  <div v-else class="text-xs-center flex mt-3">상세 프로필이 비공개로 설정되어 있습니다.</div>
                </v-layout>
              </div>

            </v-flex>
          </v-card-text>
          <v-card-actions>
            <v-layout row text-xs-center>
              <v-spacer/>
              <v-btn @click="sendMessage">메시지 보내기</v-btn>
              <v-btn color="primary" @click="dialog = false">닫기</v-btn>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <span v-else class="grey--text lighten-1">익명</span>
  </span>
</template>
<script>
import BoardMixins from '@/components/mixins/BoardMixins';
const groupName = { M: '전공', G: '학년', N: '일반', R: '지역', Z: '인증' };
export default {
  name: 'UserLink',
  props: ['nickName', 'boardType'],
  data () {
    return {
      userLinkMenu: false,
      dialog: false,
      profile: {},
      groupItems: [],
      userAuthItems: {
        N: '예비교사(미인증)',
        A: '현직교사(인증)',
        E: '전직교사(인증 만료)',
        D: '인증제한'
      }
    };
  },
  mixins: [BoardMixins],
  methods: {
    sendMessage () {
      this.$axios.post('/message/list', { nickName: this.nickName, chatType: this.boardType === 'T' ? 'T' : 'L' })
        .then(response => {
          this.$router.push('/message?chatId=' + response.data.chatId);
        })
        .catch(error => {
          if (error.response && error.response.status === 409 && error.response.data.chatId) {
            this.$router.push('/message?chatId=' + error.response.data.chatId);
          } else {
            console.log(error);
            this.$store.dispatch('showSnackbar', { text: `${error.response ? error.response.data.message : '채팅을 만들지 못했습니다.'}`, color: 'error' });
          }
        })
    },
    showProfile () {
      if (this.profile && this.profile.nickName === this.nickName) {
        this.dialog = true;
      } else {
        this.$axios.get('/profile', { params: { nickName: this.nickName } })
          .then(response => {
            this.profile = response.data
            this.dialog = true;
          })
          .catch(error => {
            console.log(error);
            this.$store.dispatch('showSnackbar', { text: `${error.response ? error.response.data.message : '프로필을 불러오지 못했습니다.'}`, color: 'error' });
          })
      }
    }
  },
  created () {
    if (this.$store.getters.groups) {
      this.groupItems = this.$store.getters.groups;
    } else {
      this.$axios
        .get('/group', { headers: { silent: true } })
        .then(response => {
          response.data.forEach(x => {
            if (x.groupType === 'N' || x.groupType === 'D' || x.groupType === 'E') {
              x.groupType = 'Z';
            }
          });
          this.groupItems = response.data.sort((a, b) => (a.groupType < b.groupType ? -1 : a.groupType === b.groupType ? 0 : 1));
          let previous = null;
          let i = 0;
          while (i < this.groupItems.length) {
            if (previous !== this.groupItems[i].groupType) {
              if (previous) {
                previous = this.groupItems[i].groupType;
                this.groupItems.splice(i, 0, { divider: true });
                i++;
              } else {
                previous = this.groupItems[i].groupType;
              }
              this.groupItems.splice(i, 0, { header: groupName[previous] });
              i++;
            }
            i++;
          }
          this.groupItems = this.groupItems.map(x => (x.groupName ? { text: x.groupName, value: x.groupId } : x));
          this.$store.dispatch('setGroups', this.groupItems);
        })
        .catch(error => {
          this.$store.dispatch('showSnackbar', { text: `그룹 목록을 가져오지 못했습니다.${error && error.response && error.response.data ? '[' + error.response.data.message + ']' : ''}` });
        });
    }
  }
};
</script>
