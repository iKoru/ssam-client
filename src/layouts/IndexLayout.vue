<template>
  <div class="indexLayout">
    <main class="indexLayout__main">
      <slot></slot>
    </main>
    <footer class="indexLayout__footer">
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
