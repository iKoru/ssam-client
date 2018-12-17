<template>
  <v-app>
    <component :is="layout">
      <router-view :layout.sync="layout"/>
    </component>
    <v-dialog v-model="$store.getters.spinner" width="300">
      <v-card color="primary" :dark="$store.getters.isLight">
        <v-card-text>
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-snackbar :timeout="$store.getters.snackbar.color === 'success'?3000:5000" bottom left :color="$store.getters.snackbar.color" v-model="$store.getters.isShowingSnackbar">
      {{ $store.getters.snackbar.text }}
      <v-btn dark flat @click.native="$store.dispatch('closeSnackbar')" icon>
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  name: "Pedagy",
  data: () => ({
    layout: "div"
  }),
  computed: {
    isShowingSnackbar() {
      return this.$store.getters.isShowingSnackbar;
    }
  },
  watch: {
    isShowingSnackbar(val) {
      if (!val) {
        this.$store.dispatch("showNextSnackbar");
      }
    }
  }
};
</script>
<style lang="stylus">
@import 'assets/common.styl';
</style>
<style>
@import url(https://fonts.googleapis.com/earlyaccess/nanumgothic.css);
@import url(https://fonts.googleapis.com/css?family=Material+Icons);
.w-100 {
  width: 100%;
}
.float-right {
  float: right;
}
body {
  font-family: "Nanum Gothic" !important;
}
</style>
