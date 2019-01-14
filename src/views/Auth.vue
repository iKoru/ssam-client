 <template>
  <component :is="$vuetify.breakpoint.smAndUp?'v-container':'div'">
    <v-layout row height="200px" justify-center align-center>
      <v-card width="100%" flat>
        <v-img src="@/static/img/index.jpg" aspect-ratio="2.75" :max-height="$vuetify.breakpoint.xsOnly?'200px':'calc(100vh - 535px)'"></v-img>
        <v-card-title primary-title>
          <v-flex xs12>
            <h3 class="headline mb-0">교사 인증</h3>
            <div class="text-xs-center justify-center align-center pa-3">
              <div v-if="$store.getters.auth.needEmail">
                <p>
                  아래에서 이메일을 등록하여 인증하시거나,
                  <span>webmaster@pedagy.com</span>으로 정교사 자격증을 제출해서 인증해주세요.
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
              <p v-else-if="$store.getters.auth.imminent">등록된 이메일로 인증을 해야합니다. 안쓰면 사용이 곧 제한될거에용
                <br>히히히
              </p>
              <p v-else>인증을 해야합니다. 시간끌어서 이미 만료되었어요.
                <br>히히히
              </p>
            </div>
          </v-flex>
        </v-card-title>
        <v-card-actions pa-3>
          <v-layout :row="$vuetify.breakpoint.smAndUp" :column="$vuetify.breakpoint.xsOnly" wrap text-xs-right>
            <template v-if="$store.getters.profile.auth === 'EXPIRED' && $store.getters.profile.emailVerifiedDate">
              <v-btn @click="notAnymore" flat class="mt-2">더이상 보지 않기</v-btn>
              <div v-if="$vuetify.breakpoint.xsOnly"></div>
            </template>
            <template v-if="$store.getters.profile.auth !== 'EXPIRED' || $store.getters.profile.emailVerifiedDate">
              <v-btn @click="notToday" class="mt-2">오늘 더이상 보지 않기</v-btn>
              <div v-if="$vuetify.breakpoint.xsOnly"></div>
            </template>
            <v-btn @click="goNext" class="mt-2">다음에 인증하기</v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="sendAuth" color="primary" :loading="loading" class="mt-2">{{$store.getters.auth.needEmail?'이메일 등록 및 ':''}}인증메일 보내기</v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-layout>
  </component>
</template>

<script>
import MainLayout from "../layouts/MainLayout";
export default {
  name: "Auth",
  created() {
    this.$emit("update:layout", MainLayout);
  },
  data() {
    return {
      loading: false,
      email: null,
      emailHost: null,
      emailErrors: [],
      emailHostErrors: [],
      emailHostItems: ["sen.go.kr", "goe.go.kr", "ice.go.kr", "gwe.go.kr", "cbe.go.kr", "cne.go.kr", "dje.go.kr", "sje.go.kr", "jbe.go.kr", "jne.go.kr", "gen.go.kr", "gbe.go.kr", "gne.go.kr", "use.go.kr", "pen.go.kr", "jje.go.kr"],
      emailRules: [v => !!v || "이메일을 입력해주세요", v => !v || /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*/.test(v) || "이메일이 올바르지 않습니다."]
    };
  },
  methods: {
    goNext() {
      const redirectTo = decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent("redirectTo").replace(/[.+*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
      this.$router.push(redirectTo && redirectTo !== "/auth" ? redirectTo : "/");
    },
    notToday() {
      localStorage.setItem("authRequirement", this.$moment(new Date()).format("YMMDD"));
      this.goNext();
    },
    notAnymore(){
      if(confirm('더이상 인증을 하지 않으면 다양한 라운지와 토픽에 들어갈 수 없습니다.\n정말 더이상 인증을 하지 않으시겠습니까?')){
        this.$axios.put('/user', {emailVerifiedDate:null})
        .then(response => {
          this.$store.dispatch('updateProfile', {emailVerifiedDate:null})
        })
        .catch(error => {
          console.log(error);
          if(error.response){
            this.$store.dispatch("showSnackbar", {text: error.response.data.message || "다시보지 않기 처리를 하지 못했습니다.", color: "error"});
          }
        })
        this.goNext();
      }
    },
    sendAuth() {
      this.loading = true;
      if (this.$store.getters.auth.needEmail && !(this.$refs.form.validate() && this.emailErrors.length === 0 && this.emailHostErrors.length === 0)) {
        this.$store.dispatch("showSnackbar", {text: "인증 메일을 받을 이메일 주소를 입력해주세요.", color: "error"});
        this.loading = false;
        return;
      }
      const redirectTo = decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent("redirectTo").replace(/[.+*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
      this.$axios
        .post("/auth", this.$store.getters.auth.needEmail ? {email: this.email + "@" + this.emailHost} : null, {headers: {silent: true}})
        .then(response => {
          this.$store.dispatch("showSnackbar", {text: "등록된 메일주소로 인증 메일을 보냈습니다. 메일을 확인해주세요.", color: "info"});
          this.$router.push(redirectTo && redirectTo !== "/auth" ? redirectTo : "/");
        })
        .catch(error => {
          if (error.response) {
            this.$store.dispatch("showSnackbar", {text: error.response.data.message || "인증 메일을 보내지 못했습니다.", color: "error"});
          }
          if (!this.$store.getters.auth.needEmail) {
            this.$router.push(redirectTo && redirectTo !== "/auth" ? redirectTo : "/");
          }
        });
    },
    checkEmail(event) {
      if (event instanceof MouseEvent) {
        return;
      }
      if (this.email && this.email.length > 0 && this.emailHost) {
        this.$axios
          .get("/email", {params: {email: this.email + "@" + this.emailHost}, headers: {silent: true}})
          .then(() => {
            if (typeof event === "function") {
              event.call(this);
            }
          })
          .catch(error => {
            if (error && error.response) {
              switch (error.response.data.target) {
                case "emailHost":
                  this.emailHostErrors = [error.response.data.message];
                  break;
                case "email":
                default:
                  this.emailErrors = [error.response.data.message || "이메일을 정확히 입력해주세요."];
                  break;
              }
            }
            if (typeof event === "function") {
              event.call(this);
            }
          });
        this.emailErrors = [];
        this.$refs.email.resetValidation();
        this.emailHostErrors = [];
        this.$refs.emailHost.resetValidation();
        return;
      } else if (!this.email && this.emailHost) {
        this.emailErrors = ["이메일을 입력해주세요."];
      } else if (this.email && !this.emailHost) {
        this.emailHostErrors = ["이메일 뒷자리를 선택해주세요."];
      } else {
        this.emailErrors = [];
        this.$refs.email.resetValidation();
        this.emailHostErrors = [];
        this.$refs.emailHost.resetValidation();
      }
      if (typeof event === "function") {
        event.call(this);
      }
    }
  }
};
</script>
