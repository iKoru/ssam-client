<template>
  <component :is="$vuetify.breakpoint.smAndUp?'v-container':'div'" class="publicLayoutContents">
    <v-layout row height="200px" justify-center align-center>
      <v-card width="100%" flat>
        <v-img src="@/static/img/index.jpg" aspect-ratio="2.75"></v-img>
        <v-card-title primary-title>
          <v-flex xs12>
            <h3 class="headline">Pedagy 교사인증</h3>
            <div class="text-xs-center justify-center align-center pa-3">
              <template v-if="result">
                <v-flex text-xs-center my-5>{{result}}</v-flex>
                <v-layout row>
                  <v-spacer/>
                  <div>
                    <router-link to="/index">
                      <v-btn flat>메인화면으로 이동</v-btn>
                    </router-link>
                    <router-link to="/signin">
                      <v-btn color="primary">로그인</v-btn>
                    </router-link>
                  </div>
                </v-layout>
              </template>
              <v-flex v-else text-xs-center mt-5>인증정보를 처리하는 중입니다. 잠시만 기다려주세요..</v-flex>
            </div>
          </v-flex>
        </v-card-title>
      </v-card>
    </v-layout>
  </component>
</template>

<script>
import PublicLayout from '../layouts/PublicLayout';
export default {
  data () {
    return {
      result: null
    };
  },
  created () {
    this.$emit('update:layout', PublicLayout);
    const userId = this.$route.query.userId;
    const authKey = this.$route.query.authKey;
    if (!userId || userId === '' || !authKey || authKey === '') {
      this.result = '잘못된 접근입니다.';
    } else {
      this.$axios
        .post('/auth/submit', { userId: userId, authKey: authKey })
        .then(response => {
          this.result = '인증이 정상적으로 처리되었습니다.';
        })
        .catch(error => {
          this.result = `인증 처리 과정에서 오류가 발생했습니다.${error.response ? '[' + error.response.data.message + ']' : ''}`;
        });
    }
  },
  name: 'AuthSubmit',
  methods: {}
};
</script>
