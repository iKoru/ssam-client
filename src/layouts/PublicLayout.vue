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
import PublicToolbar from "../components/PublicToolbar";
import MainFooter from "../components/MainFooter";
export default {
  components: {
    PublicToolbar,
    MainFooter
  }
};
</script>
<style>
.publicLayout {
  background-color: white;
  height: 100%;
}
.publicLayout__main {
  height:calc(100% - 174px);
}
.publicLayoutContents {
  max-width: 900px;
  margin: 10rem auto 74px auto;
}
.publicLayoutContents.stickToTop{
  margin-top:0;
}
@media (max-width: 600px) {
  .publicLayoutContents {
    margin-top: 0;
  }
}
</style>