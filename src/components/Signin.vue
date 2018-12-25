<template>
  <v-container :class="{'pa-3':$vuetify.breakpoint.xsOnly}">
    <v-layout>
      <v-flex>
        <v-form ref="form" lazy-validation>
          <v-text-field name="userId" ref="userId" height="20" v-model="userId" :error="userIdError" :rules="userIdRules" label="아이디" required maxlength="50" @focus="clearError" autofocus></v-text-field>
          <v-text-field name="password" ref="password" height="20" v-model="password" :error="passwordError" :rules="passwordRules" label="비밀번호" required type="password" @keydown.enter.stop="signin" @focus="clearError"></v-text-field>

          <v-btn color="primary" @click="signin" block :loading="loading">로그인</v-btn>
          <v-layout row justify-space-between class="mt-3">
            <v-flex>
              <v-checkbox class="small" v-model="rememberMe" label="자동 로그인" hide-details></v-checkbox>
            </v-flex>
            <v-flex text-xs-right>
              <router-link to="/resetPassword">비밀번호 찾기</router-link>
            </v-flex>
          </v-layout>
          <p class="text-xs-center" v-show="message">
            <span class="error--text">{{message}}</span>
          </p>
          <p :class="{'text-xs-center':true, 'mt-3':!message}">
            <small>
              <router-link to="/signup">아직 회원이 아니신가요?</router-link>
            </small>
          </p>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
/* global localStorage */
import jwt from "jwt-decode";
export default {
  name: "Signin",
  data: () => ({
    loading: false,
    message: null,
    userIdError: false,
    passwordError: false,
    userId: "",
    password: "",
    rememberMe: false,
    userIdRules: [v => !!v || "아이디를 입력해주세요."],
    passwordRules: [v => !!v || "비밀번호를 입력해주세요."]
  }),
  created() {
    const token = localStorage.getItem("accessToken");
    if (token) {
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
          console.log(response.data.token, jwt(response.data.token).userId);
          const redirectTo = response.data.redirectTo;
          if (response.data.imminent || response.data.needEmail) {
            this.$store.dispatch("updateAuthInformation", {imminent: response.data.imminent, needEmail: response.data.needEmail});
          }
          this.$axios
            .get("/user")
            .then(response => {
              this.$store.dispatch("profile", response.data);
              if (redirectTo) {
                if (redirectTo === "/auth" && localStorage.getItem("authRequirement") && localStorage.getItem("authRequirement") >= this.$moment().format("YYYYMMDD")) {
                  this.$router.push(decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent("redirectTo").replace(/[.+*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1")) || "/");
                } else {
                  this.$router.push(redirectTo + window.location.search); //preserve original redirect options
                }
              } else {
                const searchRedirectTo = decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent("redirectTo").replace(/[.+*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
                this.$router.push(searchRedirectTo !== "/index" && searchRedirectTo !== "/signin" ? searchRedirectTo : "/");
              }
            })
            .catch(err => {
              console.log(err);
              this.$store.dispatch("showSnackbar", {text: err && err.response ? err.response.data.message : "서버에 연결할 수 없습니다. 인터넷 연결을 확인해주세요.", color: "error"});
            });
        })
        .catch(err => {
          this.loading = false;
          if (err.response && err.response.data) {
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
      if (this.message) {
        this.message = null;
      }
    },
    password() {
      if (this.passwordError) {
        this.passwordError = false;
      }
      if (this.message) {
        this.message = null;
      }
    }
  },

  methods: {
    clearError() {
      this.$refs.form.resetValidation();
      this.message = null;
    },
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
            const redirectTo = response.data.redirectTo;
            if (response.data.imminent || response.data.needEmail) {
              this.$store.dispatch("updateAuthInformation", {imminent: response.data.imminent, needEmail: response.data.needEmail});
            }
            this.$axios
              .get("/user")
              .then(response => {
                this.$store.dispatch("profile", response.data);
                if (redirectTo) {
                  if (redirectTo === "/auth" && localStorage.getItem("authRequirement") && localStorage.getItem("authRequirement") >= this.$moment().format("YYYYMMDD")) {
                    this.$router.push(decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent("redirectTo").replace(/[.+*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1")) || "/");
                  } else {
                    this.$router.push(redirectTo + window.location.search); //preserve original redirect options
                  }
                } else {
                  const searchRedirectTo = decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent("redirectTo").replace(/[.+*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
                  this.$router.push(searchRedirectTo !== "/index" && searchRedirectTo !== "/signin" ? searchRedirectTo : "/");
                }
              })
              .catch(err => {
                this.$store.dispatch("showSnackbar", {text: err && err.response ? err.response.data.message : "서버에 접속할 수 없습니다. 인터넷 연결을 확인해주세요.", color: "error"});
              });
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

<style>
.small i.v-icon {
  font-size: 18px;
}
.small label {
  font-size: 15px;
}
.small.v-input--checkbox {
  margin-top: 0;
  padding-top: 0;
}
.small .v-input--selection-controls__input {
  width: 16px;
  height: 16px;
  margin-right: 4px;
}
</style>
