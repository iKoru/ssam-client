<template>
  <v-stepper v-model="step" :vertical="$vuetify.breakpoint.xsOnly" id="signupStepper">
    <template v-if="$vuetify.breakpoint.smAndUp">
      <v-stepper-header>
        <v-stepper-step :complete="step > 1" step="1">약관 동의</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="step > 2" step="2">회원정보 입력</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3">이메일 인증</v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card class="mb-3 stepperContents">
            <div id="contractContents">이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.</div>
            <v-layout row class="py-2">
              <v-spacer></v-spacer>
              <v-checkbox v-model="agreeContract" label="약관에 동의합니다." hide-details class="justify-center my-0"></v-checkbox>
              <v-spacer></v-spacer>
            </v-layout>
          </v-card>
          <v-layout row>
            <v-spacer></v-spacer>
            <v-btn color="primary" :disabled="!agreeContract" @click="step = 2">다음</v-btn>
          </v-layout>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card class="mb-3 stepperContents">
            <v-container>
              <v-layout>
                <v-flex>
                  <v-form ref="form" v-model="valid">
                    <v-layout row xs12 wrap>
                      <v-flex sm12>
                        <v-text-field v-model="userId" class="dense" :rules="userIdRules" :error="userIdError" :error-messages="userIdErrors" maxlength="50" label="아이디" required hint="최대 50자" validate-on-blur autofocus @blur="checkUserId"></v-text-field>
                      </v-flex>
                      <v-flex sm6>
                        <v-text-field v-model="password" class="dense" type="password" :rules="passwordRules" maxlength="25" label="비밀번호" required hint="4~25자" validate-on-blur></v-text-field>
                      </v-flex>
                      <v-flex sm6>
                        <v-text-field ref="rePassword" v-model="rePassword" class="dense" type="password" :rules="rePasswordRules" maxlength="25" label="비밀번호 재입력" required hint="4~25자" validate-on-blur @blur="checkRePassword"></v-text-field>
                      </v-flex>
                      <v-flex sm6>
                        <v-text-field ref="email" v-model="email" class="dense" :rules="emailRules" maxlength="90" :error="emailErrors.length > 0" :error-messages="emailErrors" label="이메일" hint="최대 90자" validate-on-blur @blur="checkEmail" placeholder="NEIS 이메일"></v-text-field>
                      </v-flex>
                      <v-flex sm6>
                        <v-autocomplete ref="emailHost" v-model="emailHost" class="dense" :items="emailHostItems" :error="emailHostErrors.length > 0" :error-messages="emailHostErrors" :rules="emailHostRules" dense prepend-icon="alternate_email" label="NEIS 이메일 뒷자리" validate-on-blur @blur="checkEmailHost"></v-autocomplete>
                      </v-flex>
                      <v-flex sm4>
                        <v-select v-model="emailHost" class="dense" :items="regionItems" disabled dense label="지역" placeholder="이메일 입력시 자동입력"></v-select>
                      </v-flex>
                      <v-flex sm4>
                        <v-select v-model="major" class="dense" :items="majorItems" label="전공과목" dense hint="전공과목별 게시판에 글을 쓸 수 있습니다."></v-select>
                      </v-flex>
                      <v-flex sm4>
                        <v-select v-model="grade" class="dense" :items="gradeItems" label="학년" dense hint="학년별 게시판에 글을 쓸 수 있습니다."></v-select>
                      </v-flex>
                      <v-flex sm4>
                        <v-text-field v-model="inviter" class="dense" maxlength="10" label="추천인코드"></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-form>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
          <v-layout row>
            <v-spacer/>
            <v-btn flat @click="step=1">취소</v-btn>
            <v-btn color="primary" @click="submit">회원가입</v-btn>
          </v-layout>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card class="mb-3 stepperContents" height="200px">
            <v-layout row justify-center align-center fill-height text-xs-center>
              <div>회원가입 되었습니다.
                <br>
                <span v-show="emailHost && !!email">인증을 위한 메일을 보냈으니 확인해주세요.</span>
                <template v-show="!emailHost && !email">
                  인증을 위해서는 이메일을 입력해주시거나,
                  <br>증명서 등을
                  <span>webmaster@pedagy.com</span>으로 보내주셔서 수동으로 인증해주세요.
                </template>
              </div>
            </v-layout>
          </v-card>
          <v-layout row>
            <v-spacer/>
            <v-btn color="primary" @click="goIndex">로그인</v-btn>
          </v-layout>
        </v-stepper-content>
      </v-stepper-items>
    </template>
    <template v-else>
      <v-stepper-step :complete="step > 1" step="1">약관 동의</v-stepper-step>
      <v-stepper-content step="1">
        <div id="contractContents">이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.이용약관입니다. 동의해주세용.</div>
        <v-layout row>
          <v-spacer></v-spacer>
          <v-checkbox v-model="agreeContract" label="약관에 동의합니다." hide-details class="justify-center"></v-checkbox>
          <v-spacer></v-spacer>
        </v-layout>
        <v-layout row>
          <v-spacer></v-spacer>
          <v-btn color="primary" :disabled="!agreeContract" @click="step = 2">다음</v-btn>
        </v-layout>
      </v-stepper-content>

      <v-stepper-step :complete="step > 2" step="2">회원정보 입력</v-stepper-step>
      <v-stepper-content step="2">
        <v-container>
          <v-layout>
            <v-flex>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-layout row xs12 wrap>
                  <v-flex xs12>
                    <v-text-field v-model="userId" class="dense" :rules="userIdRules" :error="userIdError" :error-messages="userIdErrors" maxlength="50" label="아이디" required hint="최대 50자" validate-on-blur @blur="checkUserId"></v-text-field>
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field v-model="password" class="dense" type="password" :rules="passwordRules" maxlength="25" label="비밀번호" required hint="4~25자" validate-on-blur></v-text-field>
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field ref="rePassword" v-model="rePassword" class="dense" type="password" :rules="rePasswordRules" maxlength="25" label="비밀번호 재입력" required hint="4~25자" validate-on-blur @blur="checkRePassword"></v-text-field>
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field ref="email" v-model="email" class="dense" :rules="emailRules" :error="emailErrors.length > 0" :error-messages="emailErrors" maxlength="90" label="이메일" hint="최대 90자" validate-on-blur @blur="checkEmail" placeholder="NEIS 이메일"></v-text-field>
                  </v-flex>
                  <v-flex xs6>
                    <v-autocomplete ref="emailHost" v-model="emailHost" class="dense" :items="emailHostItems" :error="emailHostErrors.length > 0" :error-messages="emailHostErrors" :rules="emailHostRules" dense prepend-icon="alternate_email" label="NEIS 뒷자리" validate-on-blur @blur="checkEmailHost"></v-autocomplete>
                  </v-flex>
                  <v-flex xs6>
                    <v-select v-model="major" class="dense" :items="majorItems" label="전공과목" dense hint="전공과목별 게시판에 글을 쓸 수 있습니다."></v-select>
                  </v-flex>
                  <v-flex xs6>
                    <v-select v-model="grade" class="dense" :items="gradeItems" label="학년" dense hint="학년별 게시판에 글을 쓸 수 있습니다."></v-select>
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field v-model="inviter" class="dense" maxlength="10" label="추천인코드"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-flex>
          </v-layout>
        </v-container>
        <v-layout row>
          <v-spacer></v-spacer>
          <v-btn flat @click="step=1">취소</v-btn>
          <v-btn color="primary" @click="submit">회원가입</v-btn>
        </v-layout>
      </v-stepper-content>

      <v-stepper-step step="3">이메일 인증</v-stepper-step>
      <v-stepper-content step="3">
        <v-layout row justify-center align-center fill-height text-xs-center>
          <div>회원가입 되었습니다.
            <br>
            <span v-show="emailHost && !!email">인증을 위한 메일을 보냈으니 확인해주세요.</span>
            <template v-show="!emailHost && !email">
              인증을 위해서는 이메일을 입력해주시거나,
              <br>증명서 등을
              <span>webmaster@pedagy.com</span>으로 보내주셔서 수동으로 인증해주세요.
            </template>
          </div>
        </v-layout>

        <v-btn color="primary" @click="goIndex">로그인</v-btn>
      </v-stepper-content>
    </template>
  </v-stepper>
</template>

<script>
import PublicLayout from "../layouts/PublicLayout";
export default {
  created() {
    this.$emit("update:layout", PublicLayout);
    this.$axios
      .get("/group", {headers: {silent: true}})
      .then(response => {
        this.majorItems = response.data.filter(x => x.groupType === "M").map(x => ({text: x.groupName, value: x.groupId}));
        this.gradeItems = response.data.filter(x => x.groupType === "G").map(x => ({text: x.groupName, value: x.groupId}));
      })
      .catch(error => {
        this.$store.dispatch("showSnackbar", {text: `전공, 학년 목록을 가져오지 못했습니다.${error && error.response && error.response.data ? "[" + error.response.data.message + "]" : ""}`});
      });
  },
  data: () => ({
    agreeContract: false,
    step: 1,
    valid: true,
    userId: null,
    password: null,
    rePassword: null,
    email: null,
    grade: null,
    major: null,
    region: null,
    emailHost: null,
    inviter: decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent("inviter").replace(/[.+*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1")) || null,
    gradeItems: [],
    majorItems: [],
    userIdError: false,
    userIdErrors: [],
    emailErrors: [],
    emailHostErrors: [],
    emailHostItems: ["sen.go.kr", "goe.go.kr", "ice.go.kr", "gwe.go.kr", "cbe.go.kr", "cne.go.kr", "dje.go.kr", "sje.go.kr", "jbe.go.kr", "jne.go.kr", "gen.go.kr", "gbe.go.kr", "gne.go.kr", "use.go.kr", "pen.go.kr", "jje.go.kr"],
    regionItems: [{value: "sen.go.kr", text: "서울"}, {value: "goe.go.kr", text: "경기"}, {value: "ice.go.kr", text: "인천"}, {value: "gwe.go.kr", text: "강원"}, {value: "cbe.go.kr", text: "충북"}, {value: "cne.go.kr", text: "충남"}, {value: "dje.go.kr", text: "대전"}, {value: "sje.go.kr", text: "세종"}, {value: "jbe.go.kr", text: "전북"}, {value: "jne.go.kr", text: "전남"}, {value: "gen.go.kr", text: "광주"}, {value: "gbe.go.kr", text: "경북"}, {value: "gne.go.kr", text: "경남"}, {value: "use.go.kr", text: "울산"}, {value: "pen.go.kr", text: "부산"}, {value: "jje.go.kr", text: "제주"}],
    rePasswordRules: [],
    userIdRules: [v => !!v || "ID를 입력해주세요.", v => (v && /^[a-zA-Z0-9_^&$]{4,50}$/.test(v)) || "알파벳, 숫자, _, ^, &, $만을 포함한 4~50자", v => (v && /^.*[a-zA-Z]+.*$/.test(v)) || "최소 1글자 이상의 알파벳 포함"],
    passwordRules: [v => !!v || "비밀번호를 입력해주세요.", v => (v && (v.length > 3 && v.length < 26)) || "4~25자"],
    emailRules: [v => !v || /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*/.test(v) || "이메일이 올바르지 않습니다."],
    emailHostRules: [],
    debounce: null
  }),
  methods: {
    submit() {
      this.checkRePassword();
      this.checkEmail();
      this.checkEmailHost();
      if (this.$refs.form.validate() && this.rePasswordRules.length === 0 && this.emailRules.length === 1 && this.emailHostRules.length === 0) {
        this.$axios
          .post("/user", {
            userId: this.userId,
            password: this.password,
            email: this.email && this.emailHost ? this.email + "@" + this.emailHost : null,
            major: this.major,
            grade: this.grade,
            inviter: this.inviter
          })
          .then(response => {
            localStorage.setItem('userId', this.userId)
            this.step = 3;
          })
          .catch(error => {
            console.log(error.response);
            this.$store.dispatch("showSnackbar", {text: error.response ? error.response.data.message : "회원가입을 하지 못했습니다.", color: "error"});
          });
      } else {
        this.$store.dispatch("showSnackbar", {text: "회원 정보를 정확히 입력해주세요.", color: "error"});
      }
    },
    goIndex() {
      this.$router.push("/");
    },
    checkUserId() {
      if (this.userId && !this.userIdError) {
        this.$axios
          .get("/userId", {params: {userId: this.userId}, headers: {silent: true}})
          .then(response => {
            this.userIdErrors = [];
          })
          .catch(error => {
            this.userIdErrors = [error && error.response && error.response.data.message];
          });
      }
    },
    checkEmail() {
      console.log('blur email', this.emailRules.length);
      if (!this.email && this.emailHost) {
        this.emailRules.push(() => "이메일을 입력해주세요");
      } 
      if(this.email && this.email.length > 0 && this.emailHost){
        this.$axios.get('/email', {params:{email:this.email + '@' + this.emailHost}, headers:{silent:true}})
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error, error.response);
          if(error && error.response){
            switch(error.response.data.target){
              case 'emailHost':
                this.emailHostErrors = [error.response.data.message];
                this.emailHostRules = [() => error.response.data.message];
                break;
              case 'email':
              default:
                this.emailErrors = [error.response.data.message || '이메일을 정확히 입력해주세요.']
                this.emailRules.push(() => error.response.data.message || '이메일을 정확히 입력해주세요.');
                break;
            }
          }
        });
      }
    },
    checkEmailHost() {
      if (this.debounce) {
        clearTimeout(this.debounce);
      }
      this.debounce = setTimeout(()=> {
        if (this.email && !this.emailHost) {
          this.emailHostRules = [() => "이메일 뒷자리를 선택해주세요."];
        } else if(this.email && this.email.length > 0 && this.emailHost){
          this.$axios.get('/email', {params:{email:this.email + '@' + this.emailHost}, headers:{silent:true}})
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            if(error && error.response){
              switch(error.response.data.target){
                case 'emailHost':
                  this.emailHostErrors = [error.response.data.message];
                  this.emailHostRules = [() => error.response.data.message];
                  break;
                case 'email':
                default:
                  this.emailErrors = [error.response.data.message || '이메일을 정확히 입력해주세요.']
                  this.emailRules.push(() => error.response.data.message || '이메일을 정확히 입력해주세요.');
                  break;
              }
            }
          });
        }
      }, 300);
    },
    checkRePassword() {
      if (this.rePassword === this.password) {
        this.rePasswordRules = [];
      } else {
        this.rePasswordRules = [() => "두 비밀번호가 일치하지 않습니다."];
      }
    }
  },
  watch:{
    email(){
      if(this.emailErrors.length > 0){
        this.$nextTick(() => (this.emailErrors = []));
      }
      if(this.emailRules.length >= 2){
        this.$nextTick(() => {
          this.emailRules.shift();
          this.$refs.email.resetValidation();
          console.log('reset', this.$refs.email)
        });
      }
    },
    emailHost(){
      if(this.emailHostErrors.length > 0){
        this.$nextTick(() => (this.emailHostErrors = []));
      }
      if(this.emailHostRules.length > 0){
        this.$nextTick(() => {
          this.emailHostRules = [];
          this.$refs.emailHost.resetValidation();
          console.log('reset2')
        });
      }
    }
  }
};
</script>
<style>
@media (max-width: 600px) {
  #signupStepper {
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  .publicLayout {
    background-color: white;
  }
}
div.v-input__slot {
  margin-bottom: 0 !important;
  min-height: unset !important;
  padding: 5px 0 !important;
}
#contractContents {
  height: 200px;
  overflow-y: scroll;
}
#signupStepper {
  max-width: 900px;
  margin: 3rem auto auto auto;
}
.stepperContents {
  min-height: 200px;
}
form .flex {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
form .v-icon.v-icon--disabled {
  display: none;
}
</style>
