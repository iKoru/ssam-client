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
  height:calc(100% - 53px)
}
</style>
