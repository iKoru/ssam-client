<template>
    <v-layout>
      <v-flex row>
        첨부파일/서베이 어케 올리면 될지?
        <Editor/>
      </v-flex>
    </v-layout>
</template>

<script>
export default {
  name: 'EditDocument',
  components: {
    Editor: () => import('@/components/board/editor/Editor')
  },
  created () {
    console.log('edit document')
  }
}
</script>
