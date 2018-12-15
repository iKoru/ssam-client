<template>
  <div class="publicLayout">
    <main class="publicLayout__main">
      <slot></slot>
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
