<template>
  <div class="indexLayout">
    <main class="indexLayout__main fill-height">
      <slot></slot>
    </main>
  </div>
</template>
<script>
export default {};
</script>
<style>
.indexLayout{
  height:calc(100% - 53px);
  margin-bottom:53px;
  min-height:calc(21vw + 450px);
}
@media(max-width:1264px){
  .indexLayout{
    height:calc(100% - 74px);
    margin-bottom:74px;
  }
}
</style>
