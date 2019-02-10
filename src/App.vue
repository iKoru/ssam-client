<template>
  <v-app>
    <component :is="layout">
      <router-view :layout.sync="layout"/>
    </component>
    <v-progress-circular v-show="$store.getters.spinner" indeterminate color="primary" id="spinner"></v-progress-circular>
    <v-snackbar :timeout="snackbar.color === 'success'?2000:3000" bottom left :color="snackbar.color" v-model="showSnackbar">
      <span>{{ snackbar.text }}</span>
      <v-btn dark flat @click="showSnackbar = false" icon>
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  name: 'Pedagy',
  data: () => ({
    layout: 'div',
    showSnackbar: false,
    snackbar: { text: null, color: 'info' }
  }),
  computed: {
    snackbarList () {
      return this.$store.state.snackbarList;
    }
  },
  methods: {
    showNextSnackbar () {
      const nextSnackbar = this.$store.getters.nextSnackbar;
      if (nextSnackbar && nextSnackbar.text) {
        this.snackbar.text = nextSnackbar.text;
        this.snackbar.color = nextSnackbar.color || 'info';
        this.showSnackbar = true;
      }
      this.$store.dispatch('dequeueSnackbar');
    }
  },
  watch: {
    showSnackbar (val) {
      if (val && !this.snackbarList.length) return;
      this.$nextTick(() => {
        this.showNextSnackbar();
      });
    },
    snackbarList () {
      if (!this.showSnackbar) {
        this.showNextSnackbar();
      }
    }
  }
};
</script>
<style>
@import url(https://fonts.googleapis.com/css?family=Material+Icons);
#spinner {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.v-snack-content span{
  word-break: break-all;
}
</style>
