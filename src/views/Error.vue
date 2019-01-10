<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center app>
      <v-flex xs12>
        <v-content>
          <v-layout row>
            <div class="mr-3 hidden-sm-and-down ml-auto">
              <img :src="require('@/static/img/error/'+errorCode+'.svg')" alt="에러 이미지">
            </div>
            <div :class="{'text-md-center':true, 'ml-auto':$vuetify.breakpoint.smAndDown, 'mr-auto':true}">
              <h1 class="errorCode">{{errorCode}}</h1>
              <h2 class="my-3 headline" v-if="errorCode === 400">올바르지 않은 요청입니다.</h2>
              <h2 class="my-3 headline" v-else-if="errorCode === 403">회원 인증 후 이용할 수 있습니다.</h2>
              <h2 class="my-3 headline" v-else-if="errorCode === 404">페이지를 찾을 수 없습니다.</h2>
              <h2 class="my-3 headline" v-else>요청을 처리하던 도중 에러가 발생하였습니다.</h2>
              <div>
                <v-btn @click="$router.go(-1)">이전 페이지로 가기</v-btn>
                <router-link to="/auth" v-if="errorCode === 403">
                  <v-btn>인증 페이지로 가기</v-btn>
                </router-link>
                <router-link to="/">
                  <v-btn color="primary">메인 페이지로 가기</v-btn>
                </router-link>
              </div>
            </div>
          </v-layout>
        </v-content>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import PublicLayout from "../layouts/PublicLayout";
export default {
  props: ["error"],
  created() {
    this.$emit("update:layout", PublicLayout);
  },
  computed: {
    errorCode() {
      return this.error ? this.error * 1 : 500;
    }
  }
};
</script>
<style>
.errorCode {
  font-size: 150px;
  line-height: 150px;
  font-weight: 700;
  color: #252932;
  text-shadow: rgba(61, 61, 61, 0.3) 1px 1px, rgba(61, 61, 61, 0.2) 2px 2px, rgba(61, 61, 61, 0.3) 3px 3px;
}
.publicLayout {
  background-color: white;
  height: 100%;
}
.publicLayout__main {
  height: 100%;
  margin-bottom: 0;
}
</style>