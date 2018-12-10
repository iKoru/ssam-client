<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            height="20"
            v-model="userId"
            :rules="idRules"
            label="아이디"
            required
            solo
          ></v-text-field>
          <v-text-field
            height="20"
            v-model="password"
            :rules="passwordRules"
            label="비밀번호"
            required
            solo
          ></v-text-field>
          <v-checkbox
            v-model="checkbox"
            label="자동로그인"
            required
          ></v-checkbox>

          <v-btn
            primary
            :disabled="!valid"
            @click="submit"
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
  import axios from 'axios'
import { createNamespacedHelpers } from 'vuex';
  export default {
    name: 'Signin',
    data: () => ({
      valid: true,
      userId: '',
      idRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'E-mail is required',
        v =>  (v && v.length <= 10) || 'E-mail must be valid'
      ],
      select: null,
      checkbox: false
    }),
    created () {
    },
    methods: {
      setToken (token, setAutoLogin) {
        this.$store.dispatch('SET_TOKEN', {token, setAutoLogin})
        this.$router.push('/home')
      },
      submit () {
        if (this.$refs.form.validate()) {
          // Native form submission is not yet supported
          this.$axios.post('/signin', {
            userId: this.userId,
            password: this.password,
          })
            .then(response => {
              console.log(response.data)
              this.setToken(response.data.token, this.checkbox)
            })
            .catch(error => {
                console.log(error)
            });
        }
      },
      clear () {
        this.$refs.form.reset()
      }
    }
  }
</script>

<style scoped>
</style>