<template>
  <div class="publicLayout">
    <public-toolbar class="publicLayout__nav"></public-toolbar>
    <main class="publicLayout__main">
      <slot></slot>
    </main>
    <main-footer class="publicLayout__footer"></main-footer>
  </div>
</template>
<script>
import PublicToolbar from '../components/PublicToolbar';
import MainFooter from '../components/MainFooter';
export default {
  components: {
    PublicToolbar,
    MainFooter
  }
};
</script>
