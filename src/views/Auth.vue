 <template>
  <component :is="$vuetify.breakpoint.smAndUp?'v-container':'div'">
    <v-layout row height="200px" justify-center align-center>
      <v-card width="100%" flat>
        <v-img src="/img/index.jpg" aspect-ratio="2.75" :max-height="$vuetify.breakpoint.xsOnly?'200px':'calc(100vh - 535px)'"></v-img>
        <v-card-title primary-title>
          <v-flex xs12>
            <h3 class="headline mb-0">교사 인증</h3>
            <div class="text-xs-center justify-center align-center pa-3">
              <div v-if="$store.getters.auth.needEmail">
                <p>
                  선생님들의 노다지, Pedagy에 오신 것을 환영합니다.
                  <br>교사임을 인증하여 지역&middot;학년&middot;전공별 라운지, 학습자료가 모인 아카이브, 관심사별 토픽을 이용해보세요.
                  <br>아래에서 NEIS 이메일을 등록하여 인증하시거나,
                  <a href="mailto:webmaster@pedagy.com">webmaster@pedagy.com</a>으로 정교사 자격증을 보내주시면 인증하실 수 있습니다.
                </p>
                <v-form ref="form" lazy-validation>
                  <v-layout row xs12 wrap>
                    <v-flex xs6>
                      <v-text-field ref="email" v-model="email" class="dense" :rules="emailRules" :error-messages="emailErrors" maxlength="90" label="이메일" hint="최대 90자" validate-on-blur @blur="checkEmail" placeholder="NEIS 이메일계정"></v-text-field>
                    </v-flex>
                    <v-flex xs6>
                      <v-autocomplete ref="emailHost" v-model="emailHost" class="dense" :items="emailHostItems" :error-messages="emailHostErrors" dense prepend-icon="alternate_email" label="NEIS 이메일 뒷자리" validate-on-blur @blur="checkEmail"></v-autocomplete>
                    </v-flex>
                  </v-layout>
                </v-form>
              </div>
              <p v-else-if="$store.getters.auth.imminent">{{$store.getters.profile.loungeNickName}}님, 이메일을 통한 정기 인증 기간의 만료일이 {{$store.getters.profile.emailVerifiedDate?$moment($store.getters.profile.emailVerifiedDate, 'YYYYMMDD').add(1, 'years').format('Y년 M월 D일까지로 '):''}}얼마 남지 않았습니다.
                <br>인증 메일 전송 버튼을 눌러 인증을 연장해주세요.
              </p>
              <p v-else>{{$store.getters.profile.loungeNickName}}님, 이메일을 통한 정기 인증이 {{$store.getters.profile.emailVerifiedDate?$moment($store.getters.profile.emailVerifiedDate, 'YYYYMMDD').add(1, 'years').format('Y년 M월 D일까지로 '):''}}만료되었습니다.
                <br>아래에서 인증 메일을 전송하여 다시 인증해주세요.
              </p>
            </div>
          </v-flex>
        </v-card-title>
        <v-card-actions pa-3>
          <v-layout :row="$vuetify.breakpoint.smAndUp" :column="$vuetify.breakpoint.xsOnly" wrap text-xs-right>
            <template v-if="$store.getters.profile.auth === 'E' && $store.getters.profile.emailVerifiedDate">
              <v-btn @click="notAnymore" flat class="mt-2" :block="$vuetify.breakpoint.xsOnly" depressed>더이상 보지 않기</v-btn>
              <div v-if="$vuetify.breakpoint.xsOnly"></div>
            </template>
            <template v-if="$store.getters.profile.auth !== 'E' || $store.getters.profile.emailVerifiedDate">
              <v-btn @click="notToday" class="mt-2" :block="$vuetify.breakpoint.xsOnly" depressed>오늘 더이상 보지 않기</v-btn>
              <div v-if="$vuetify.breakpoint.xsOnly"></div>
            </template>
            <v-btn @click="goNext" class="mt-2" :block="$vuetify.breakpoint.xsOnly" depressed>다음에 인증하기</v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="sendAuth" color="primary" :loading="loading" class="mt-2" :block="$vuetify.breakpoint.xsOnly" depressed>{{$store.getters.auth.needEmail?'이메일 등록 및 ':''}}인증메일 보내기</v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-layout>
  </component>
</template>

<script>
import MainLayout from '../layouts/MainLayout';
function setCookie (name, value, days) {
  var expires = '';
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

export default {
  name: 'Auth',
  created () {
    this.$emit('update:layout', MainLayout);
    this.$store.dispatch('setColumnType', 'HIDE_ALWAYS');
  },
  data () {
    return {
      loading: false,
      email: null,
      emailHost: null,
      emailErrors: [],
      emailHostErrors: [],
      emailHostItems: ['sen.go.kr', 'goe.go.kr', 'ice.go.kr', 'gwe.go.kr', 'cbe.go.kr', 'cne.go.kr', 'dje.go.kr', 'sje.go.kr', 'jbedu.kr', 'jne.go.kr', 'gen.go.kr', 'gbe.go.kr', 'gne.go.kr', 'use.go.kr', 'pen.go.kr', 'jje.go.kr'],
      emailRules: [v => !!v || '이메일을 입력해주세요', v => !v || /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*/.test(v) || '이메일이 올바르지 않습니다.']
    };
  },
  methods: {
    goNext () {
      const redirectTo = decodeURIComponent(window.location.search.replace(new RegExp('^(?:.*[&\\?]' + encodeURIComponent('redirectTo').replace(/[.+*]/g, '\\$&') + '(?:\\=([^&]*))?)?.*$', 'i'), '$1'));
      this.$router.push(redirectTo && redirectTo !== '/auth' ? redirectTo : '/');
    },
    notToday () {
      setCookie('authRequirement', this.$moment(new Date()).format('YMMDD'), 1);
      this.goNext();
    },
    notAnymore () {
      if (confirm('더이상 인증을 하지 않으면 다양한 라운지와 아카이브, 그리고 토픽을 이용할 수 없습니다.\n정말 더이상 인증을 하지 않으시겠습니까?')) {
        this.$axios
          .put('/user', { emailVerifiedDate: null })
          .then(response => {
            this.$store.dispatch('updateProfile', { emailVerifiedDate: null });
          })
          .catch(error => {
            console.log(error);
            if (error.response) {
              this.$store.dispatch('showSnackbar', { text: error.response.data.message || '다시보지 않기 처리를 하지 못했습니다.', color: 'error' });
            }
          });
        this.goNext();
      }
    },
    sendAuth () {
      this.loading = true;
      if (this.$store.getters.auth.needEmail && !(this.$refs.form.validate() && this.emailErrors.length === 0 && this.emailHostErrors.length === 0)) {
        this.$store.dispatch('showSnackbar', { text: '인증 메일을 받을 이메일 주소를 입력해주세요.', color: 'error' });
        this.loading = false;
        return;
      }
      const redirectTo = decodeURIComponent(window.location.search.replace(new RegExp('^(?:.*[&\\?]' + encodeURIComponent('redirectTo').replace(/[.+*]/g, '\\$&') + '(?:\\=([^&]*))?)?.*$', 'i'), '$1'));
      this.$axios
        .post('/auth', this.$store.getters.auth.needEmail ? { email: this.email + '@' + this.emailHost } : null, { headers: { silent: true } })
        .then(response => {
          this.$store.dispatch('showSnackbar', { text: '등록된 메일주소로 인증 메일을 보냈습니다. 메일을 확인해주세요.', color: 'info' });
          this.$router.push(redirectTo && redirectTo !== '/auth' ? redirectTo : '/');
        })
        .catch(error => {
          if (error.response) {
            this.$store.dispatch('showSnackbar', { text: error.response.data.message || '인증 메일을 보내지 못했습니다.', color: 'error' });
          }
          if (!this.$store.getters.auth.needEmail) {
            this.$router.push(redirectTo && redirectTo !== '/auth' ? redirectTo : '/');
          }
        });
    },
    checkEmail (event) {
      if (event instanceof MouseEvent) {
        return;
      }
      if (this.email && this.email.length > 0 && this.emailHost) {
        this.$axios
          .get('/email', { params: { email: this.email + '@' + this.emailHost }, headers: { silent: true } })
          .then(() => {
            if (typeof event === 'function') {
              event.call(this);
            }
          })
          .catch(error => {
            if (error && error.response) {
              switch (error.response.data.target) {
                case 'emailHost':
                  this.emailHostErrors = [error.response.data.message];
                  break;
                case 'email':
                default:
                  this.emailErrors = [error.response.data.message || '이메일을 정확히 입력해주세요.'];
                  break;
              }
            }
            if (typeof event === 'function') {
              event.call(this);
            }
          });
        this.emailErrors = [];
        this.$refs.email.resetValidation();
        this.emailHostErrors = [];
        this.$refs.emailHost.resetValidation();
        return;
      } else if (!this.email && this.emailHost) {
        this.emailErrors = ['이메일을 입력해주세요.'];
      } else if (this.email && !this.emailHost) {
        this.emailHostErrors = ['이메일 뒷자리를 선택해주세요.'];
      } else {
        this.emailErrors = [];
        this.$refs.email.resetValidation();
        this.emailHostErrors = [];
        this.$refs.emailHost.resetValidation();
      }
      if (typeof event === 'function') {
        event.call(this);
      }
    }
  }
};
</script>
