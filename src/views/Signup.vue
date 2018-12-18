<template>
  <v-stepper v-model="step" :vertical="$vuetify.breakpoint.xsOnly">
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
          <v-card class="mb-5" color="grey lighten-1" height="200px">
            이용약관입니다. 동의해주세용.
          </v-card>
          <v-checkbox v-model="agreeContract" label="동의" hide-details></v-checkbox>
          <v-btn color="primary" :disabled="!agreeContract" @click="step = 2">다음</v-btn>
        </v-stepper-content>
  
        <v-stepper-content step="2">
          <v-card class="mb-5" color="grey lighten-1" height="200px">
            <v-container>
              <v-layout>
                <v-flex>
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field v-model="userId" :rules="userIdRules" :counter="10" label="아이디" required></v-text-field>
                    <v-text-field v-model="password" :rules="passwordRules" label="비밀번호" required></v-text-field>
                    <v-text-field v-model="email" :rules="emailRules" label="이메일" required></v-text-field>
                  </v-form>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
  
          <v-btn color="primary" @click="submit">회원가입</v-btn>
          <v-btn flat @click="step=1">취소</v-btn>
        </v-stepper-content>
  
        <v-stepper-content step="3">
          <v-card class="mb-5" color="grey lighten-1" height="200px">
            회원가입 되었습니다. 이메일을 인증해주세요.
          </v-card>
  
          <v-btn color="primary" @click="goMain">메인페이지로 이동</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </template>
    <template v-else>
      <v-stepper-step :complete="step > 1" step="1">약관 동의</v-stepper-step>
      <v-stepper-content step="1">
        <v-card class="mb-5" color="grey lighten-1" height="200px">
          이용약관입니다. 동의해주세용.
        </v-card>
        <v-checkbox v-model="agreeContract" label="동의" hide-details></v-checkbox>
        <v-btn color="primary" :disabled="!agreeContract" @click="step = 2">다음</v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="step > 2" step="2">회원정보 입력</v-stepper-step>
      <v-stepper-content step="2">
        <v-card class="mb-5" color="grey lighten-1" height="200px">
          <v-container>
            <v-layout>
              <v-flex>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field v-model="userId" :rules="userIdRules" :counter="10" label="아이디" required></v-text-field>
                  <v-text-field v-model="password" :rules="passwordRules" label="비밀번호" required></v-text-field>
                  <v-text-field v-model="email" :rules="emailRules" label="이메일" required></v-text-field>
                </v-form>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>

        <v-btn color="primary" @click="submit">회원가입</v-btn>
        <v-btn flat @click="step=1">취소</v-btn>
      </v-stepper-content>

      <v-stepper-step step="3">이메일 인증</v-stepper-step>
      <v-stepper-content step="3">
        <v-card class="mb-5" color="grey lighten-1" height="200px">
          회원가입 되었습니다. 이메일을 인증해주세요.
        </v-card>

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
    userIdRules: [v => !!v || "Email is required", v => (v && /(?=.*[a-zA-Z]+)(?=.*[a-zA-Z0-9_!^&*$]{4,50}).*/.test(v)) || "Name must be less than 10 characters"],
    password: "",
    passwordRules: [v => !!v || "Name is required", v => (v && v.length <= 10) || "Name must be less than 10 characters"],
    email: "",
    emailRules: [v => !!v || "E-mail is required", v => /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(sen|goe|ice|gwe|cbe|cne|dje|sje|jbe|jne|gen|gbe|gne|use|pen|jje)\.go\.kr\b/.test(v) || "E-mail must be valid"],
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false
  }),
  watch:{
    el(val){
      if(val === 3){
        
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
    goMain(){
      this.$router.push('/')
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
</style>
