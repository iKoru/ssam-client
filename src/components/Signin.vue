<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            ref='userId'
            height="20"
            v-model="userId"
            :rules="idRules"
            label="아이디"
            required
            solo
          ></v-text-field>
          <v-text-field
            ref='password'
            height="20"
            v-model="password"
            :rules="passwordRules"
            label="비밀번호"
            required
            solo
            type='password'
          ></v-text-field>
          <v-checkbox
            v-model="checkbox"
            label="자동로그인"
            required
          ></v-checkbox>
          <v-alert :value="true" type="error" v-show="message">{{message}}</v-alert>

          <v-btn
            primary
            :disabled="!valid"
            @click="signin"
            block
          >
            로그인
          </v-btn>
          <v-btn block @click.stop="$router.push('signup')">
            회원가입
          </v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import { createNamespacedHelpers } from 'vuex'
import jwt from 'jwt-decode'
export default {
  name: 'Signin',
  data: () => ({
    loading: false,
    message: null,
    valid: true,
    userId: '',
    idRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters'
    ],
    password: '',
    passwordRules: [
      v => !!v || 'E-mail is required',
      v => (v && v.length <= 10) || 'E-mail must be valid'
    ],
    select: null,
    checkbox: false
  }),
  created () {
    const token = localStorage.getItem('accessToken')
    console.log(token)
    if (token) {
      this.loading = true
      this.$axios({
        method: 'POST',
        url: '/refresh',
        headers: { 'x-auth': token }
      })
        .then(response => {
          this.loading = false
          localStorage.setItem('accessToken', response.data.token)
          this.$axios.defaults.headers.common['x-auth'] = response.data.token
          this.$store.dispatch('signin', {
            accessToken: response.data.token,
            userId: jwt(response.data.token).userId
          })
          this.$router.push(decodeURIComponent(window.location.search.replace(new RegExp('^(?:.*[&\\?]' + encodeURIComponent('redirectTo').replace(/[\.\+\*]/g, '\\$&') + '(?:\\=([^&]*))?)?.*$', 'i'), '$1')) || '/')
        })
        .catch(err => {
          this.loading = false
          if (err.response) {
            console.log(err.response)
            this.message = err.response.data.message
            if (err.response.data.target && this.$refs[err.response.data.target]) {
              this.$refs[err.response.data.target].focus()
            }
          } else {
            console.log(err)
          }
          localStorage.removeItem('accessToken')
        })
    }
  },
  methods: {
    signin () {
      if (this.$refs.form.validate()) {
        if (!this.userId || !this.password || this.userId === '' || this.password === '') {
          this.message = '아이디와 비밀번호를 입력해주세요.'
          return false
        }
        localStorage.setItem('userId', this.userId)
        this.message = null
        this.loading = true
        this.$axios
          .post('/signin', {
            userId: this.userId,
            password: this.password
          })
          .then(response => {
            localStorage.setItem('accessToken', response.data.token)
            this.$axios.defaults.headers.common['x-auth'] = response.data.token
            this.$store.dispatch('signin', {
              accessToken: response.data.token,
              userId: jwt(response.data.token).userId
            })
            this.$router.push(decodeURIComponent(window.location.search.replace(new RegExp('^(?:.*[&\\?]' + encodeURIComponent('redirectTo').replace(/[\.\+\*]/g, '\\$&') + '(?:\\=([^&]*))?)?.*$', 'i'), '$1')) || '/')
          })
          .catch(err => {
            this.loading = false
            console.log(err)
            if (err.response) {
              this.message = err.response.data.message
              if (err.response.data.target && this.$refs[err.response.data.target]) {
                this.$refs[err.response.data.target].focus()
              }
            } else {
              this.message = '서버 접속에 실패하였습니다. 서버가 구동중이지 않거나 인터넷 연결이 끊어졌을 수 있습니다.'
            }
          })
      }
    }
  }
}
</script>

<style scoped>
</style>
