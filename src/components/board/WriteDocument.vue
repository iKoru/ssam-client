<template>
    <v-layout>
      <v-flex row fill-width>
        <Editor/>
      </v-flex>
    </v-layout>
</template>

<script>
export default {
  name: 'WriteDocument',
  components: {
    Editor: () => import('@/components/board/editor/Editor')
  },
  created () {
    console.log('write document')
  }
}
</script>
