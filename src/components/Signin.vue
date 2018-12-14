/*global localStorage */
<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field ref="userId" height="20" v-model="userId" :error="userIdError" :rules="userIdRules" label="아이디" required solo maxlength="50"></v-text-field>
          <v-text-field ref="password" height="20" v-model="password" :error="passwordError" :rules="passwordRules" label="비밀번호" required solo type="password"></v-text-field>
          <v-checkbox v-model="rememberMe" label="자동로그인" required></v-checkbox>
          <span type="error" v-show="message">{{message}}</span>

          <v-btn primary :disabled="!valid" @click="signin" block :loading="loading">로그인</v-btn>
          <span class="text-xs-center">
            <router-link to="/signup">아직 회원이 아니신가요?</router-link>
            <br>
            <router-link to="/resetPassword">비밀번호를 잊으셨나요?</router-link>
          </span>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import jwt from "jwt-decode";
export default {
  name: "Signin",
  data: () => ({
    loading: false,
    message: null,
    userIdError: false,
    passwordError: false,
    valid: true,
    userId: "",
    password: "",
    rememberMe: false,
    userIdRules: [v => !!v || "아이디를 입력해주세요."],
    passwordRules: [v => !!v || "비밀번호를 입력해주세요."]
  }),
  created() {
    const token = localStorage.getItem("accessToken");
    if (token) {
      this.loading = true;
      this.$axios({
        method: "POST",
        url: "/refresh",
        headers: {"x-auth": token}
      })
        .then(response => {
          this.loading = false;
          localStorage.setItem("accessToken", response.data.token);
          this.$axios.defaults.headers.common["x-auth"] = response.data.token;
          this.$store.dispatch("signin", {
            accessToken: response.data.token,
            userId: jwt(response.data.token).userId
          });
          if (response.data.redirectTo) {
            this.$router.push(response.data.redirectTo + window.location.search); //preserve original redirect options
          } else {
            this.$router.push(decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent("redirectTo").replace(/[.+*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1")) || "/");
          }
        })
        .catch(err => {
          this.loading = false;
          if (err.response && err.response.data) {
            if (err.response.data.target && this.$refs[err.response.data.target]) {
              switch (err.response.data.target) {
                case "userId":
                  this.userIdError = true;
                  this.$refs.userId.focus();
                  break;
                case "password":
                  this.passwordError = true;
                  this.$refs.password.focus();
                  break;
                default:
                  break;
              }
            }
            this.message = err.response.data.message;
          } else {
            this.message = "서버에 접속할 수 없습니다. 인터넷 연결을 확인해주세요.";
          }
          localStorage.removeItem("accessToken");
        });
    } else if (localStorage.getItem("userId")) {
      this.userId = localStorage.getItem("userId");
    }
  },

  watch: {
    userId() {
      if (this.userIdError) {
        this.userIdError = false;
      }
    },
    password() {
      if (this.passwordError) {
        this.passwordError = false;
      }
    }
  },

  methods: {
    signin() {
      if (this.$refs.form.validate()) {
        if (!this.userId || !this.password || this.userId === "" || this.password === "") {
          this.message = "아이디와 비밀번호를 입력해주세요.";
          return false;
        }
        localStorage.setItem("userId", this.userId);
        this.message = null;
        this.userIdError = false;
        this.passwordError = false;
        this.loading = true;
        this.$axios
          .post("/signin", {
            userId: this.userId,
            password: this.password,
            rememberMe: this.rememberMe
          })
          .then(response => {
            localStorage.setItem("accessToken", response.data.token);
            this.$axios.defaults.headers.common["x-auth"] = response.data.token;
            this.$store.dispatch("signin", {
              accessToken: response.data.token,
              userId: this.userId
            });
            if (response.data.redirectTo) {
              this.$router.push(response.data.redirectTo + window.location.search); //preserve original redirect options
            } else {
              this.$router.push(decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent("redirectTo").replace(/[.+*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1")) || "/");
            }
          })
          .catch(err => {
            this.loading = false;
            if (err.response && err.response.data) {
              if (err.response.data.target && this.$refs[err.response.data.target]) {
                switch (err.response.data.target) {
                  case "userId":
                    this.userIdError = true;
                    this.$refs.userId.focus();
                    break;
                  case "password":
                    this.passwordError = true;
                    this.$refs.password.focus();
                    break;
                  default:
                    break;
                }
              }
              this.message = err.response.data.message;
            } else {
              this.message = "서버에 접속할 수 없습니다. 인터넷 연결을 확인해주세요.";
            }
          });
      }
    }
  }
};
</script>

<style scoped>
</style>
