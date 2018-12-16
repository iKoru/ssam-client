<template>
  <v-app>
    <component :is="layout">
      <router-view :layout.sync="layout"/>
    </component>
    <v-dialog v-model="spinner" width="300">
      <v-card color="primary" :dark="$store.getters.isLight">
        <v-card-text>
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-snackbar :timeout="$store.getters.snackbar.color === 'success'?3000:5000" bottom left :color="$store.getters.snackbar.color" v-model="$store.getters.isShowingSnackbar">
      {{ $store.getters.snackbar.text }}
      <v-btn dark flat @click.native="$store.getters.isShowingSnackbar = false" icon>
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import eventHub from "./plugins/eventhub";

export default {
  name: "App",
  data: () => ({
    spinner: false,
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
  },
  methods: {
    showSpinner() {
      console.log("spinner on");
      this.spinner = true;
    },
    hideSpinner() {
      console.log("spinner off");
      this.spinner = false;
    },
    refresh(error) {
      console.log(error);
    }
  },
  created() {
    eventHub.$on("before-request", this.showSpinner);
    eventHub.$on("request-error", this.hideSpinner);
    eventHub.$on("after-response", this.hideSpinner);
    eventHub.$on("response-error", this.hideSpinner);
    eventHub.$on("response-error", this.refresh);
  },
  beforeDestroy() {
    eventHub.$off("before-request", this.showSpinner);
    eventHub.$off("request-error", this.hideSpinner);
    eventHub.$off("after-response", this.hideSpinner);
    eventHub.$off("response-error", this.hideSpinner);
  }
};
</script>

<style>
@import url(http://fonts.googleapis.com/earlyaccess/nanumgothic.css);

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
