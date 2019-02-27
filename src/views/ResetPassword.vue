 <template>
  <component :is="$vuetify.breakpoint.smAndUp?'v-container':'div'" class="publicLayoutContents">
    <v-layout row height="200px" justify-center align-center>
      <v-card width="100%" flat>
        <v-img src="@/static/img/index.jpg" aspect-ratio="2.75"></v-img>
        <v-card-title primary-title>
          <v-flex xs12>
            <h3 class="headline mb-0">비밀번호 찾기</h3>
            <div class="text-xs-center justify-center align-center pa-3">
              <p>
                임시 비밀번호를 만들기 위한 계정의 ID와 이메일 주소를 입력해주세요.
                <br>자격증을 통하여 인증하셨다면, 이용하셨던 메일로
                <span>webmaster@pedagy.com</span>에 문의해주세요.
              </p>
              <v-form ref="form" lazy-validation id="resetPasswordForm" class="mx-auto">
                <v-layout row xs12 wrap>
                  <v-flex xs12 md4>
                    <v-text-field v-model="userId" class="dense" :rules="userIdRules" maxlength="50" :error-messages="userIdErrors" label="아이디" required hint="최대 50자" validate-on-blur></v-text-field>
                  </v-flex>
                  <v-flex xs6 md4>
                    <v-text-field ref="email" v-model="email" class="dense" :rules="emailRules" maxlength="90" :error-messages="emailErrors" label="이메일" hint="최대 90자" validate-on-blur placeholder="NEIS 이메일계정"></v-text-field>
                  </v-flex>
                  <v-flex xs6 md4>
                    <v-autocomplete ref="emailHost" v-model="emailHost" class="dense" :items="emailHostItems" :rules="emailHostRules" dense prepend-icon="alternate_email" label="NEIS 이메일 뒷자리" validate-on-blur></v-autocomplete>
                  </v-flex>
                </v-layout>
              </v-form>
            </div>
          </v-flex>
        </v-card-title>
        <v-card-actions pa-3>
          <v-layout :row="$vuetify.breakpoint.smAndUp" :column="$vuetify.breakpoint.xsOnly" wrap text-xs-right>
            <v-btn @click="goIndex" class="mt-2" round depressed>돌아가기</v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="sendReset" color="primary" :loading="loading" class="mt-2" round depressed>임시 비밀번호 만들기</v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-layout>
  </component>
</template>

<script>
import PublicLayout from '../layouts/PublicLayout';
export default {
  name: 'ResetPassword',
  created () {
    this.$emit('update:layout', PublicLayout);
  },
  data () {
    return {
      loading: false,
      userId: null,
      userIdErrors: [],
      emailErrors: [],
      email: null,
      emailHost: null,
      emailHostItems: ['sen.go.kr', 'goe.go.kr', 'ice.go.kr', 'gwe.go.kr', 'cbe.go.kr', 'cne.go.kr', 'dje.go.kr', 'sje.go.kr', 'jbe.go.kr', 'jne.go.kr', 'gen.go.kr', 'gbe.go.kr', 'gne.go.kr', 'use.go.kr', 'pen.go.kr', 'jje.go.kr'],
      emailRules: [v => !!v || '이메일을 입력해주세요', v => !v || /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*/.test(v) || '이메일이 올바르지 않습니다.'],
      userIdRules: [v => !!v || 'ID를 입력해주세요.', v => (v && /^[a-zA-Z0-9_^&$]{4,50}$/.test(v)) || '알파벳, 숫자, _, ^, &, $만을 포함한 4~50자', v => (v && /^.*[a-zA-Z]+.*$/.test(v)) || '최소 1글자 이상의 알파벳 포함'],
      emailHostRules: [v => !!v || 'NEIS 이메일 뒷자리를 선택해주세요.']
    };
  },
  methods: {
    goIndex () {
      this.$router.push('/index');
    },
    sendReset () {
      this.loading = true;
      if (!this.$refs.form.validate() || this.userIdErrors.length > 0 || this.emailErrors.length > 0) {
        this.$store.dispatch('showSnackbar', { text: '비밀번호를 변경할 ID와 확인용 이메일을 입력해주세요.', color: 'error' });
        this.loading = false;
        return;
      }
      this.$axios
        .post('/resetPassword', { userId: this.userId, email: this.email + '@' + this.emailHost }, { headers: { silent: true } })
        .then(response => {
          this.$store.dispatch('showSnackbar', { text: '등록된 메일주소로 임시 비밀번호를 보냈습니다. 메일을 확인해주세요.', color: 'info' });
          this.$router.push('/signin');
        })
        .catch(error => {
          this.loading = false;
          if (error.response) {
            switch (error.response.data.target) {
              case 'userId':
                this.userIdErrors = [error.response.data.message];
                return;
              case 'email':
                this.emailErrors = [error.response.data.message];
                return;
            }
            this.$store.dispatch('showSnackbar', { text: error.response.data.message || '임시 비밀번호 메일을 보내지 못했습니다.', color: 'error' });
          } else {
            console.log(error);
            this.$store.dispatch('showSnackbar', { text: '임시 비밀번호 메일을 보내지 못했습니다.', color: 'error' });
          }
        });
    }
  },
  watch: {
    userId () {
      if (this.userIdErrors.length > 0) {
        this.userIdErrors = [];
      }
    },
    email () {
      if (this.emailErrors.length > 0) {
        this.emailErrors = [];
      }
    }
  }
};
</script>
<style scoped>
div.v-input__slot {
  margin-bottom: 0 !important;
  min-height: unset !important;
  padding: 5px 0 !important;
}
form .flex {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
#resetPasswordForm {
  max-width: 800px;
}
</style>
