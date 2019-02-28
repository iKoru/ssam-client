 <template>
  <v-container>
    <v-layout row justify-center align-center>
      <v-card width="100%" flat>
        <v-card-title primary-title>
          <v-flex xs12>
            <h3 class="headline mb-0">내 계정 정보</h3>
            <div :class="{'text-xs-center justify-center align-center':true, 'pa-3':$vuetify.breakpoint.smAndUp}">
              <p>
                <component :is="$vuetify.breakpoint.xsOnly?'v-bottom-sheet':'v-menu'" v-model="bottomSheet" absolute offset-y v-if="profile.picturePath">
                  <v-avatar :size="$vuetify.breakpoint.xsOnly?100:200" class="cursor-pointer" slot="activator" title="클릭하여 이미지 변경 또는 삭제">
                    <img :src="webUrl+ profile.picturePath" alt="프로필 이미지">
                  </v-avatar>
                  <v-list>
                    <v-list-tile @click="deleteProfilePath">
                      <v-list-tile-title>프로필 사진 삭제</v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile @click="bottomSheet = false;selectImage()">
                      <v-list-tile-title>프로필 사진 변경</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </component>
                <v-avatar :size="$vuetify.breakpoint.xsOnly?100:200" class="cursor-pointer" @click="selectImage" title="클릭하여 이미지 등록" v-else>
                  <img :src="require('@/static/img/defaultUser.svg')" alt="기본 프로필 이미지">
                </v-avatar>
              </p>
              <v-form ref="form" lazy-validation>
                <v-container fluid grid-list-xs>
                  <v-layout row wrap>
                    <v-flex sm2 xs4 py-0>
                      <v-subheader @click="focus('loungeNickName')">라운지 필명</v-subheader>
                    </v-flex>
                    <v-flex sm4 xs8 py-0>
                      <v-text-field ref="loungeNickName" placeholder="라운지 필명" :rules="nickNameRules" @keydown.enter.stop="submit" @blur="checkNickName('loungeNickName')" v-model="profile.loungeNickName" :error-messages="loungeNickNameErrors" :readonly="!checkLoungeNickNameUpdatable" class="mt-0 pt-0 dense" :hint="checkLoungeNickNameUpdatable?'라운지와 프로필 등에서 사용되는 필명입니다.':'마지막 수정 1개월 후에 다시 바꿀 수 있습니다.'"></v-text-field>
                    </v-flex>
                    <v-flex sm2 xs4 py-0>
                      <v-subheader @click="focus('topicNickName')">토픽 닉네임</v-subheader>
                    </v-flex>
                    <v-flex sm4 xs8 py-0>
                      <v-text-field ref="topicNickName" placeholder="토픽 닉네임" :rules="nickNameRules" @keydown.enter.stop="submit" @blur="checkNickName('topicNickName')" v-model="profile.topicNickName" :error-messages="topicNickNameErrors" :readonly="!checkTopicNickNameUpdatable" class="mt-0 pt-0 dense" :hint="checkTopicNickNameUpdatable?'토픽에서 사용되는 닉네임입니다.':'마지막 수정 1개월 후에 다시 바꿀 수 있습니다.'"></v-text-field>
                    </v-flex>
                    <v-flex sm2 xs4 py-0>
                      <v-subheader :style="{'padding-bottom':$vuetify.breakpoint.xsOnly?'12px':false}">인증상태</v-subheader>
                    </v-flex>
                    <v-flex sm4 xs8 py-0 text-xs-left>
                      <div class="d-inline-flex align-center fill-height" style="padding-bottom:12px;">
                        <router-link v-if="profile.auth !== 'A'" to="/auth" class="primary--text" title="이메일 인증 페이지로 이동">{{userAuthItems[profile.auth || 'NORMAL']}}</router-link>
                        <span v-else>{{userAuthItems[profile.auth || 'NORMAL']}}</span>
                        <small title="인증한 날짜" v-if="profile.emailVerifiedDate && profile.auth === 'A'">({{$moment(profile.emailVerifiedDate, 'YYYYMMDD').format('Y.M.D')}})</small>
                      </div>
                    </v-flex>
                    <v-flex sm2 xs4 py-0>
                      <v-subheader class="pr-0 text-xs-left" @click="focus('password')">비밀번호 변경</v-subheader>
                    </v-flex>
                    <v-flex sm4 xs8 py-0>
                      <v-text-field ref="password" dense placeholder="변경할 비밀번호" type="password" @keydown.enter.stop="submit" :rules="passwordRules" v-model="password" hint="비워두면 현재 비밀번호가 유지됩니다." class="my-0 pt-0 dense"></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row></v-layout>
                  <v-divider class="my-2"></v-divider>
                  <v-layout>
                    <v-tooltip bottom>
                      <v-switch slot="activator" class="pl-4" label="프로필 공개" color="primary" v-model="profile.isOpenInfo"></v-switch>
                      <span>다른 회원들이 내 프로필(사진, 필명, 지역, 학년, 전공)을 볼 수 있습니다.</span>
                    </v-tooltip>
                  </v-layout>
                  <v-layout row align-end>
                    <v-flex xs4>
                      <v-tooltip bottom>
                        <v-text-field slot="activator" v-model="profile.region" label="지역" class="mt-0 pt-0" disabled hint="NEIS이메일로 자동선택됩니다." placeholder="(미지정)" hide-details></v-text-field>
                        <span>NEIS이메일로 자동선택됩니다.</span>
                      </v-tooltip>
                    </v-flex>
                    <v-flex xs4>
                      <v-tooltip bottom>
                        <v-select slot="activator" :items="majorItems" v-model="major" label="전공" class="dense mt-0 pt-0" dense :disabled="!checkProfileUpdatable" hide-details></v-select>
                        <span>{{!checkProfileUpdatable?(isMarch?'이미 올해에 변경하셨습니다.':'매년 3월에만 변경 가능합니다.'):'해당 전공 라운지에 글을 쓸 수 있습니다.'}}</span>
                      </v-tooltip>
                    </v-flex>
                    <v-flex xs4>
                      <v-tooltip bottom>
                        <v-select slot="activator" :items="gradeItems" v-model="grade" label="학년" class="dense mt-0 pt-0" dense :disabled="!checkProfileUpdatable" hide-details></v-select>
                        <span>{{!checkProfileUpdatable?(isMarch?'이미 올해에 변경하셨습니다.':'매년 3월에만 변경 가능합니다.'):'해당 학년 라운지에 글을 쓸 수 있습니다.'}}</span>
                      </v-tooltip>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </div>
          </v-flex>
        </v-card-title>
        <v-card-actions pa-3>
          <v-layout :row="$vuetify.breakpoint.smAndUp" :column="$vuetify.breakpoint.xsOnly" text-xs-right>
            <v-btn @click="reset" flat class="mt-2">초기화</v-btn>
            <template v-if="$vuetify.breakpoint.smAndUp">
              <v-flex class="mt-2">
                <v-subheader>
                  <v-btn @click="exit" class="short" flat>
                    <small>탈퇴</small>
                  </v-btn>
                </v-subheader>
              </v-flex>
              <v-flex>
                <v-spacer></v-spacer>
              </v-flex>
            </template>
            <v-flex class="mt-2">
              <v-btn @click="submit" color="primary" :loading="loading" :block="$vuetify.breakpoint.xsOnly">저장</v-btn>
            </v-flex>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import MainLayout from '../layouts/MainLayout';

export default {
  name: 'MyPage',
  data () {
    return {
      loading: false,
      grade: null,
      major: null,
      password: null,
      gradeItems: [],
      majorItems: [],
      loungeNickNameErrors: [],
      topicNickNameErrors: [],
      passwordRules: [v => !v || (v.length > 3 && v.length < 26) || '4~25자'],
      nickNameRules: [v => (!!v && v !== '') || '닉네임/필명을 입력해주세요.', v => (!!v && v.length > 1 && v.length <= 50) || '2~50자로 입력해주세요.'],
      bottomSheet: false,
      labels: {},
      userAuthItems: {
        N: '미인증(예비교사)',
        A: '인증',
        E: '인증만료(전직교사)',
        D: '인증제한'
      }
    };
  },
  computed: {
    isMarch () {
      return process.env.NODE_ENV === 'development' || new Date().getMonth() === 2;
    },
    checkProfileUpdatable () {
      return (!this.profile.infoModifiedDate || (this.isMarch && this.$moment(this.profile.infoModifiedDate, 'YYYYMMDD').isBefore(this.$moment().date(1).month(2))));
    },
    checkLoungeNickNameUpdatable () {
      return (
        !this.profile.loungeNickNameModifiedDate ||
        this.$moment(this.profile.loungeNickNameModifiedDate, 'YYYYMMDD')
          .add(1, 'months')
          .isBefore(this.$moment())
      );
    },
    checkTopicNickNameUpdatable () {
      return (
        !this.profile.topicNickNameModifiedDate ||
        this.$moment(this.profile.topicNickNameModifiedDate, 'YYYYMMDD')
          .add(1, 'months')
          .isBefore(this.$moment())
      );
    },
    webUrl () {
      return process.env.VUE_APP_WEB_URL;
    },
    profile () {
      return Object.assign({}, this.$store.getters.profile);
    }
  },
  created () {
    this.$emit('update:layout', MainLayout);
    this.$store.dispatch('setColumnType', 'HIDE_ALWAYS');
    this.reset();
    this.$axios
      .get('/group', { params: { groupType: ['M', 'G'] }, headers: { silent: true } })
      .then(response => {
        if (this.checkProfileUpdatable) {
          this.majorItems = response.data.filter(x => x.groupType === 'M').map(x => ({ text: x.groupName, value: x.groupId }));
          this.majorItems.splice(0, 0, { text: '(미지정)', value: null });
          this.gradeItems = response.data.filter(x => x.groupType === 'G').map(x => ({ text: x.groupName, value: x.groupId }));
          this.gradeItems.splice(0, 0, { text: '(미지정)', value: null });
        } else {
          this.majorItems = response.data.filter(x => x.groupType === 'M' && x.groupId === this.profile.major).map(x => ({ text: x.groupName, value: x.groupId }));
          this.majorItems.splice(0, 0, { text: '(미지정)', value: null });
          this.gradeItems = response.data.filter(x => x.groupType === 'G' && x.groupId === this.profile.grade).map(x => ({ text: x.groupName, value: x.groupId }));
          this.gradeItems.splice(0, 0, { text: '(미지정)', value: null });
        }
      })
      .catch(error => {
        console.log(error);
        this.$store.dispatch('showSnackbar', { text: `전공, 학년 목록을 가져오지 못했습니다.${error && error.response && error.response.data ? '[' + error.response.data.message + ']' : ''}`, color: 'error' });
      });
  },
  methods: {
    reset () {
      if (this.profile.major === undefined) {
        this.major = null;
      } else {
        this.major = this.profile.major;
      }
      if (this.profile.grade === undefined) {
        this.grade = null;
      } else {
        this.grade = this.profile.grade;
      }
      this.password = null;
    },
    checkNickName (target, callback) {
      let errors, nickName;
      switch (target) {
        case 'loungeNickName':
          this.loungeNickNameErrors = [];
          this.$refs.loungeNickName.validate();
          nickName = this.profile.loungeNickName;
          errors = this.loungeNickNameErrors;
          break;
        case 'topicNickName':
          this.topicNickNameErrors = [];
          this.$refs.topicNickName.validate();
          nickName = this.profile.topicNickName;
          errors = this.topicNickNameErrors;
          break;
        default:
          if (typeof callback === 'function') {
            callback.call(this);
          }
          return;
      }
      if (errors.length === 0 && nickName !== this.$store.getters.profile[target]) {
        this.$axios
          .get('/nickName', { params: { nickName: nickName }, headers: { silent: true } })
          .then(() => {
            if (typeof callback === 'function') {
              callback.call(this);
            }
          })
          .catch(error => {
            errors.push(error.response ? error.response.data.message || '사용할 수 없는 닉네임/필명입니다.' : '사용할 수 없는 닉네임/필명입니다.');
            if (typeof callback === 'function') {
              callback.call(this);
            }
          });
      } else if (typeof callback === 'function') {
        callback.call(this);
      }
    },
    focus (target) {
      if (this.$refs[target]) {
        this.$refs[target].focus();
      }
    },
    submit () {
      if (this.$refs.form.validate()) {
        this.checkNickName('topicNickName', () => {
          this.checkNickName('loungeNickName', () => {
            if (this.loungeNickNameErrors.length === 0 && this.topicNickNameErrors.length === 0) {
              let params = {};
              const origin = this.$store.getters.profile;
              if (this.profile.topicNickName !== origin.topicNickName) {
                this.checkNickName('topicNickName');
                params.topicNickName = this.profile.topicNickName;
              }
              if (this.profile.loungeNickName !== origin.loungeNickName) {
                this.checkNickName('loungeNickName');
                params.loungeNickName = this.profile.loungeNickName;
              }
              if (this.profile.isOpenInfo !== origin.isOpenInfo) {
                params.isOpenInfo = this.profile.isOpenInfo;
              }
              if (this.major !== origin.major && !(this.major === null && origin.major === undefined) && this.checkProfileUpdatable) {
                params.major = this.major;
              }
              if (this.grade !== origin.grade && !(this.grade === null && origin.grade === undefined) && this.checkProfileUpdatable) {
                params.grade = this.grade;
              }
              if (this.password && this.password !== '') {
                params.password = this.password;
              }
              if (Object.keys(params).length > 0) {
                if (params.major !== undefined || params.grade !== undefined) {
                  if (!confirm(`전공을 ${params.major && this.majorItems.find(x => x.value === params.major) ? this.majorItems.find(x => x.value === params.major).text + '로 지정' : '지정해제'}, 학년을 ${params.grade && this.gradeItems.find(x => x.value === params.grade) ? this.gradeItems.find(x => x.value === params.grade).text + '로 지정' : '지정해제'}하시겠습니까?\n한 번 변경하면 올해에는 추가로 변경이 불가능하니, 신중히 선택해주세요.`)) {
                    return;
                  }
                }
                this.loading = true;
                this.$axios
                  .put('/user', params)
                  .then(response => {
                    this.password = null;
                    this.loading = false;
                    this.$store.dispatch('showSnackbar', { text: '내 정보를 변경하였습니다.', color: 'success' });
                    if (params.major !== undefined || params.grade !== undefined) {
                      params.infoModifiedDate = this.$moment().format('YMMDD');
                      this.profile.infoModifiedDate = params.infoModifiedDate;
                    }
                    if (params.topicNickName) {
                      params.topicNickNameModifiedDate = this.$moment().format('YMMDD');
                      this.profile.topicNickNameModifiedDate = params.topicNickNameModifiedDate;
                    }
                    if (params.loungeNickName) {
                      params.loungeNickNameModifiedDate = this.$moment().format('YMMDD');
                      this.profile.loungeNickNameModifiedDate = params.loungeNickNameModifiedDate;
                    }
                    this.$store.dispatch('updateProfile', params);
                  })
                  .catch(error => {
                    this.loading = false;
                    this.$store.dispatch('showSnackbar', { text: `정보를 변경하지 못했습니다.${error.response ? '[' + error.response.data.message + ']' : ''}`, color: 'error' });
                    console.log(error);
                  });
              } else {
                this.$store.dispatch('showSnackbar', { text: '변경된 내용이 없습니다.' });
              }
            }
          });
        });
      } else {
        this.$store.dispatch('showSnackbar', { text: '변경할 정보를 확인해주세요.', color: 'error' });
      }
    },
    deleteProfilePath () {
      this.$axios
        .put('/user', { picturePath: '' })
        .then(response => {
          this.$store.dispatch('updateProfile', { picturePath: null });
          this.profile.picturePath = null;
        })
        .catch(error => {
          console.log(error);
          this.$store.dispatch('showSnackbar', { text: `${error.response ? error.response.data.message : '프로필 이미지를 삭제하지 못했습니다.'}`, color: 'error' });
        });
      this.bottomSheet = false;
    },
    exit () {
      if (confirm('정말 탈퇴하시겠습니까?\n등록한 이메일로의 재가입은 불가능합니다.')) {
        this.$axios
          .put('/user', { status: 'DELETED' })
          .then(response => {
            this.$store.dispatch('showSnackbar', { text: '정상적으로 탈퇴처리되었습니다. 이용해주셔서 감사합니다.' });
            this.$store.dispatch('signout');
            this.$router.push('/index');
          })
          .catch(error => {
            console.log(error);
            this.$store.dispatch('showSnackbar', { text: `${error.response ? error.response.data.message : '탈퇴하지 못했습니다. 관리자에게 문의해주세요.'}`, color: 'error' });
          });
      }
    },
    selectImage () {
      let input = document.getElementById('profileFile')
      if (!input) {
        input = document.createElement('input');
        input.setAttribute('id', 'profileFile');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.classList.add('d-none');
        document.body.appendChild(input);
      }
      // Listen upload local image and save to server
      input.onchange = () => {
        if (input.files[0] && input.files[0].type.startsWith('image/')) {
          if (input.files[0].size > 1024 * 400) {
            this.$store.dispatch('showSnackbar', { text: '최대 400KB 이하의 이미지만 업로드할 수 있습니다.', color: 'error' });
          } else {
            const formData = new FormData();
            formData.append('picture', input.files[0], input.files[0].name);
            this.$axios
              .post('/user/picture', formData)
              .then(response => {
                this.profile.picturePath = response.data.picturePath;
                this.$store.dispatch('updateProfile', { picturePath: this.profile.picturePath });
              })
              .catch(error => {
                this.$store.dispatch('showSnackbar', { text: `${error.response ? error.response.data.message : '프로필 이미지를 업로드하지 못했습니다.'}`, color: 'error' });
              });
          }
        } else {
          this.$store.dispatch('showSnackbar', { text: '이미지 파일만 업로드할 수 있습니다.', color: 'error' });
        }
      };
      input.click();
    }
  },
  watch: {
    'profile.loungeNickName' () {
      if (this.loungeNickNameErrors.length > 0) {
        this.loungeNickNameErrors = [];
      }
    },
    'profile.topicNickName' () {
      if (this.topicNickNameErrors.length > 0) {
        this.topicNickNameErrors = [];
      }
    }
  }
};
</script>
