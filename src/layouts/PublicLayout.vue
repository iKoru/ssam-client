<template>
  <div class="publicLayout">
    <main class="publicLayout__main">
      <router-view></router-view>
    </main>
    <footer class="publicLayout__footer">
      <main-footer></main-footer>
    </footer>
  </div>
</template>
<script>
import MainFooter from "../components/MainFooter";
export default {
  components: {
    MainFooter
  }
};
</script>
