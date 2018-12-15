<template>
  <div class="mainLayout">
    <main-toolbar class="mainLayout__nav"></main-toolbar>
    <main class="mainLayout__main">
      <slot></slot>
    </main>
    <main-footer class="mainLayout__footer"></main-footer>
  </div>
</template>
<script>
import MainToolbar from "../components/MainToolbar";
import MainFooter from "../components/MainFooter";
export default {
  components: {
    MainToolbar,
    MainFooter
  }
};
</script>
