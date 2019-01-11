<template>
  <v-app>
    <component :is="layout">
      <router-view :layout.sync="layout"/>
    </component>
    <v-dialog :value="$store.getters.spinner" hide-overlay width="300">
      <v-card color="primary" :dark="$store.getters.isLight">
        <v-card-text>
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-snackbar :timeout="snackbar.color === 'success'?3000:5000" bottom left :color="snackbar.color" v-model="showSnackbar">
      {{ snackbar.text }}
      <v-btn dark flat @click="showSnackbar = false" icon>
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  name: "Pedagy",
  data: () => ({
    layout: "div",
    showSnackbar: false,
    snackbar: {text: null, color: "info"}
  }),
  computed: {
    snackbarList() {
      return this.$store.state.snackbarList;
    }
  },
  methods: {
    showNextSnackbar() {
      const nextSnackbar = this.$store.getters.nextSnackbar;
      if (nextSnackbar && nextSnackbar.text) {
        this.snackbar.text = nextSnackbar.text;
        this.snackbar.color = nextSnackbar.color || "info";
        this.showSnackbar = true;
      }
      this.$store.dispatch("dequeueSnackbar");
    }
  },
  watch: {
    showSnackbar(val) {
      if (val && !this.snackbarList.length) return;
      this.$nextTick(() => {
        this.showNextSnackbar();
      });
    },
    snackbarList() {
      if (!this.showSnackbar) {
        this.showNextSnackbar();
      }
    }
  }
};
</script>
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
