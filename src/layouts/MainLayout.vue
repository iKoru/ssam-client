<template>
  <div class="mainLayout">
    <nav class="mainLyaout__nav">
      <main-toolbar></main-toolbar>
    </nav>
    <main class="mainLayout__main"></main>
    <footer class="mainLayout__footer">
      <main-footer></main-footer>
    </footer>
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
