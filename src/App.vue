<template>
  <v-app>
    <component :is="layout">
      <router-view :layout.sync="layout"/>
    </component>
    <v-dialog v-model="spinner" width="300">
      <v-card color="indigo" :dark="$store.getters.isLight">
        <v-card-text>
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
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
