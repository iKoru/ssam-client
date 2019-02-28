<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center app>
      <v-flex xs12 sm8 md6 lg4>
        <v-content>
          <v-card flat>
            <Signin/>
          </v-card>
        </v-content>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import PublicLayout from '../layouts/PublicLayout';
export default {
  components: {
    Signin: () => import('@/components/Signin.vue')
  },
  created () {
    this.$emit('update:layout', PublicLayout);
  },
  name: 'SigninPage'
};
</script>
