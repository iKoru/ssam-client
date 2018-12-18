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

        <v-stepper-content step="2">
          <v-card class="mb-5 stepperContents">
            <v-container>
              <v-layout>
                <v-flex>
                  <v-form ref="form" v-model="valid">
                    <v-layout row xs12 wrap>
                      <v-flex sm12>
                        <v-text-field v-model="userId" class="dense" :rules="userIdRules" maxlength="50" label="아이디" required hint="최대 50자"></v-text-field>
                      </v-flex>
                      <v-flex sm6>
                        <v-text-field v-model="password" class="dense" :rules="passwordRules" maxlength="25" label="비밀번호" required hint="4~25자"></v-text-field>
                      </v-flex>
                      <v-flex sm6>
                        <v-text-field v-model="rePassword" class="dense" :rules="passwordRules" maxlength="25" label="비밀번호 재입력" required hint="4~25자"></v-text-field>
                      </v-flex>
                      <v-flex sm6>
                        <v-text-field v-model="email" class="dense" :rules="emailRules" maxlength="90" label="이메일" required hint="최대 90자"></v-text-field>
                      </v-flex>
                      <v-flex sm6>
                        <v-autocomplete v-model="emailHost" class="dense" :items="emailHostItems" required dense prepend-icon="alternate_email" label="교육청 메일 뒷자리"></v-autocomplete>
                      </v-flex>
                      <v-flex sm4>
                        <v-select v-model="emailHost" class="dense" :items="regionItems" disabled dense label="지역" placeholder="이메일을 입력하면 자동입력됩니다."></v-select>
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
          <v-card class="mb-5 stepperContents">회원가입 되었습니다. 이메일을 인증해주세요.</v-card>

          <v-btn color="primary" @click="goMain">메인페이지로 이동</v-btn>
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
        <v-card class="mb-5 stepperContents">
          <v-container>
            <v-layout>
              <v-flex>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-layout row xs12 wrap>
                    <v-flex xs12>
                      <v-text-field v-model="userId" class="dense" :rules="userIdRules" maxlength="50" label="아이디" required hint="최대 50자"></v-text-field>
                    </v-flex>
                    <v-flex xs6>
                      <v-text-field v-model="password" class="dense" :rules="passwordRules" maxlength="25" label="비밀번호" required hint="4~25자"></v-text-field>
                    </v-flex>
                    <v-flex xs6>
                      <v-text-field v-model="rePassword" class="dense" :rules="passwordRules" maxlength="25" label="비밀번호 재입력" required hint="4~25자"></v-text-field>
                    </v-flex>
                    <v-flex xs6>
                      <v-text-field v-model="email" class="dense" :rules="emailRules" maxlength="90" label="이메일" required hint="최대 90자"></v-text-field>
                    </v-flex>
                    <v-flex xs6>
                      <v-autocomplete v-model="emailHost" class="dense" :items="emailHostItems" required dense prepend-icon="alternate_email" label="교육청 메일 뒷자리"></v-autocomplete>
                    </v-flex>
                    <v-flex xs4>
                      <v-select v-model="emailHost" class="dense" :items="regionItems" disabled dense label="지역" placeholder="이메일로 지정"></v-select>
                    </v-flex>
                    <v-flex xs4>
                      <v-select v-model="major" class="dense" :items="majorItems" label="전공과목" dense hint="전공과목별 게시판에 글을 쓸 수 있습니다."></v-select>
                    </v-flex>
                    <v-flex xs4>
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
        </v-card>
        <v-layout row>
          <v-spacer></v-spacer>
          <v-btn flat @click="step=1">취소</v-btn>
          <v-btn color="primary" @click="submit">회원가입</v-btn>
        </v-layout>
      </v-stepper-content>

      <v-stepper-step step="3">이메일 인증</v-stepper-step>
      <v-stepper-content step="3">
        <v-card class="mb-5 stepperContents">회원가입 되었습니다. 이메일을 인증해주세요.</v-card>

        <v-btn color="primary" @click="goMain">메인페이지로 이동</v-btn>
      </v-stepper-content>
    </template>
  </v-stepper>
</template>

<script>
import PublicLayout from "../layouts/PublicLayout";
export default {
  created() {
    this.$emit("update:layout", PublicLayout);
  },
  data: () => ({
    agreeContract: false,
    step: 1,
    valid: true,
    userId: "",
    password: "",
    rePassword: "",
    email: "",
    grade: null,
    major: null,
    region: null,
    emailHost: null,
    inviter: null,
    gradeItems: [],
    majorItems: [],
    emailHostItems: ["sen.go.kr", "goe.go.kr", "ice.go.kr", "gwe.go.kr", "cbe.go.kr", "cne.go.kr", "dje.go.kr", "sje.go.kr", "jbe.go.kr", "jne.go.kr", "gen.go.kr", "gbe.go.kr", "gne.go.kr", "use.go.kr", "pen.go.kr", "jje.go.kr"],
    regionItems: [{value: "sen.go.kr", text: "서울"}, {value: "goe.go.kr", text: "경기"}, {value: "ice.go.kr", text: "인천"}, {value: "gwe.go.kr", text: "강원"}, {value: "cbe.go.kr", text: "충북"}, {value: "cne.go.kr", text: "충남"}, {value: "dje.go.kr", text: "대전"}, {value: "sje.go.kr", text: "세종"}, {value: "jbe.go.kr", text: "전북"}, {value: "jne.go.kr", text: "전남"}, {value: "gen.go.kr", text: "광주"}, {value: "gbe.go.kr", text: "경북"}, {value: "gne.go.kr", text: "경남"}, {value: "use.go.kr", text: "울산"}, {value: "pen.go.kr", text: "부산"}, {value: "jje.go.kr", text: "제주"}],
    userIdRules: [v => !!v || "ID를 입력해주세요.", v => (v && /(?=.*[a-zA-Z]+)(?=.*[a-zA-Z0-9_!^&*$]{4,50}).*/.test(v)) || "ID는 알파벳을 포함한 4~50자로 입력해주세요."],
    passwordRules: [v => !!v || "비밀번호를 입력해주세요."],
    emailRules: [v => !!v || "이메일을 입력해주세요.", v => /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*/.test(v) || "이메일 계정이 올바르지 않습니다."]
  }),
  watch: {
    step(val) {
      if (val === 3) {
        console.log(val);
      }
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        this.$axios
          .post("/user", {
            userId: this.userId,
            password: this.password,
            email: this.email
          })
          .then(response => {
            if (alert(response.data.message)) {
              this.$router.push("/");
            }
          })
          .catch(error => {
            console.log(error.response);
          });
      }
    },
    clear() {
      this.$refs.form.reset();
    },
    goMain() {
      this.$router.push("/");
    }
  }
};
</script>
<style>
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
  min-height: 300px;
}
form .flex {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
form .v-icon.v-icon--disabled {
  display: none;
}
</style>
