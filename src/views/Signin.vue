<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center app>
      <v-flex xs12 sm8 md6 lg4>
        <v-content>
          <v-card flat>
            <v-card-title>
              <div xs12>
                <span class="headline">pedagy 로그인</span>
              </div>
            </v-card-title>
            <Signin/>
          </v-card>
        </v-content>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import PublicLayout from "../layouts/PublicLayout";
export default {
  components: {
    Signin: () => import("@/components/Signin.vue")
  },
  created() {
    this.$emit("update:layout", PublicLayout);
  },
  name: "SigninPage"
};
</script>
<style>
.publicLayout {
  background-color: white;
  height: 100%;
}
.publicLayout__main {
  height: 100%;
  margin-bottom: 0;
}
</style>
