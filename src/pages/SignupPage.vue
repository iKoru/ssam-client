<template>
    <v-container>
        <v-layout>
            <v-flex>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                    v-model="userId"
                    :rules="userIdRules"
                    :counter="10"
                    label="아이디"
                    required
                    ></v-text-field>
                    <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    label="비밀번호"
                    required
                    ></v-text-field>
                    <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="이메일"
                    required
                    ></v-text-field>
                    <!--
                    <v-text-field
                    v-model="topicNickName"
                    :rules="topicNickName"
                    label="토픽 닉네임"
                    required
                    ></v-text-field>
                    <v-select
                    v-model="select"
                    :items="items"
                    :rules="[v => !!v || 'Item is required']"
                    label="지역"
                    required
                    ></v-select>
                    <v-select
                    v-model="select"
                    :items="items"
                    :rules="[v => !!v || 'Item is required']"
                    label="학교"
                    required
                    ></v-select>
                    <v-select
                    v-model="select"
                    :items="items"
                    :rules="[v => !!v || 'Item is required']"
                    label="과목"
                    required
                    ></v-select> -->
                    <!-- <v-checkbox
                    v-model="checkbox"
                    :rules="[v => !!v || 'You must agree to continue!']"
                    label="Do you agree?"
                    required
                    ></v-checkbox> -->

                    <v-btn
                    :disabled="!valid"
                    @click="submit"
                    >
                    submit
                    </v-btn>
                    <v-btn @click="clear">clear</v-btn>
                </v-form>
            </v-flex>
        </v-layout>
    </v-container>

</template>

<script>
export default {
  data: () => ({
    valid: true,
    userId: '',
    userIdRules: [
      v => !!v || 'Email is required',
      v => (v && /(?=.*[a-zA-Z]+)(?=.*[a-zA-Z0-9_!\^&\*\$]{4,50}).*/.test(v)) || 'Name must be less than 10 characters'
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters'
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(sen|goe|ice|gwe|cbe|cne|dje|sje|jbe|jne|gen|gbe|gne|use|pen|jje)\.go\.kr\b/.test(v) || 'E-mail must be valid'
    ],
    select: null,
    items: [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4'
    ],
    checkbox: false
  }),
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        this.$axios.post('/user', {
          userId: this.userId,
          password: this.password,
          email: this.email
        })
          .then(response => {
            if (alert(response.data.message)) {
              this.$router.push('/')
            }
          })
          .catch(error => {
            console.log(error.response)
          })
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>
<style scoped>
div.v-input__slot {
    margin-bottom: 0!important;
    min-height: unset!important;
    padding: 5px 0!important;
}
</style>
